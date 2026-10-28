import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders },
    );
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    let parsedBody: unknown;
    try {
      parsedBody = await req.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON request body" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (
      parsedBody === null ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      return Response.json(
        { error: "Request body must be a JSON object" },
        { status: 400, headers: corsHeaders },
      );
    }

    const body = parsedBody as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const company = String(body.company ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (
      name.length < 2 ||
      name.length > 100 ||
      phone.length < 6 ||
      phone.length > 30 ||
      company.length > 160 ||
      email.length > 254 ||
      subject.length > 240 ||
      message.length > 2000 ||
      (company.length > 0 && company.length < 2) ||
      (subject.length > 0 && subject.length < 2) ||
      (message.length > 0 && message.length < 5)
    ) {
      return Response.json(
        { error: "Please provide valid enquiry details" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address" },
        { status: 400, headers: corsHeaders },
      );
    }

    const redactSensitiveDetails = (detail: string) => {
      let redacted = detail
        .replace(
          /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
          "[redacted email]",
        )
        .replace(/\+?\d[\d\s().-]{5,}\d/g, "[redacted phone]");

      for (
        const value of [
          RESEND_API_KEY,
          name,
          company,
          phone,
          email,
          subject,
          message,
        ]
      ) {
        if (value && value.length >= 2) {
          redacted = redacted.replaceAll(value, "[redacted]");
        }
      }

      return redacted.slice(0, 500);
    };

    const htmlEscapes: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    const safe = (value: string) =>
      value.replace(/[&<>"']/g, (character) => htmlEscapes[character]);
    const submittedAt = new Date().toISOString();

    const adminHtml = `
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${safe(name)}</p>
      <p><strong>Company:</strong> ${safe(company || "Not provided")}</p>
      <p><strong>Phone:</strong> ${safe(phone)}</p>
      <p><strong>Email:</strong> ${safe(email || "Not provided")}</p>
      <p><strong>Requirement:</strong> ${safe(subject || "Not provided")}</p>
      <p><strong>Message:</strong><br>${safe(message || "Not provided").replace(/\n/g, "<br>")}</p>
      <p><strong>Submitted at (UTC):</strong> ${submittedAt}</p>
    `;

    const sendEmail = async (
      payload: Record<string, unknown>,
      stage: "admin notification" | "customer confirmation",
    ): Promise<{ id: string }> => {
      let response: Response;
      try {
        response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        const detail = error instanceof Error ? error.message : "Unknown error";
        console.error("Resend API transport failure", {
          stage,
          detail: redactSensitiveDetails(detail),
        });
        throw new Error(`Resend ${stage} request failed before a response`);
      }

      if (!response.ok) {
        let providerError: unknown;
        try {
          providerError = await response.json();
        } catch {
          providerError = undefined;
        }

        const providerObject =
          providerError !== null && typeof providerError === "object"
            ? providerError as Record<string, unknown>
            : undefined;
        const providerName = typeof providerObject?.name === "string"
          ? redactSensitiveDetails(providerObject.name)
          : undefined;
        const providerCode = typeof providerObject?.code === "string"
          ? redactSensitiveDetails(providerObject.code)
          : typeof providerObject?.statusCode === "number"
          ? String(providerObject.statusCode)
          : undefined;
        const providerMessage = typeof providerObject?.message === "string"
          ? redactSensitiveDetails(providerObject.message)
          : undefined;

        console.error("Resend API request rejected", {
          stage,
          httpStatus: response.status,
          providerName,
          providerCode,
          providerMessage,
        });
        throw new Error(
          `Resend ${stage} request failed with HTTP ${response.status}`,
        );
      }

      const result: unknown = await response.json();
      if (
        result === null ||
        typeof result !== "object" ||
        !("id" in result) ||
        typeof result.id !== "string"
      ) {
        throw new Error("Resend API response did not include an email ID");
      }

      return { id: result.id };
    };

    const from = "SLN Auviora Website <enquiries@slnauvioramedia.com>";

    const adminResult = await sendEmail({
      from,
      to: ["contact@slnauvioramedia.com"],
      subject: `New website enquiry from ${name}`,
      html: adminHtml,
      reply_to: email || undefined,
    }, "admin notification");

    let customerEmailAccepted = false;

    if (email) {
      try {
        await sendEmail({
          from,
          to: [email],
          subject: "We received your enquiry — SLN Auviora Media",
          html: `
            <p>Hello ${safe(name)},</p>
            <p>Thank you for contacting SLN Auviora Media Private Limited.</p>
            <p>We have received your enquiry and our team will get back to you.</p>
            <p>Regards,<br>SLN Auviora Media Private Limited</p>
          `,
        }, "customer confirmation");
        customerEmailAccepted = true;
      } catch (error) {
        console.error(
          "Customer confirmation email failed",
          {
            stage: "customer confirmation",
            detail: redactSensitiveDetails(
              error instanceof Error ? error.message : "Unknown error",
            ),
          },
        );
      }
    }

    return Response.json(
      {
        success: true,
        adminEmailAccepted: true,
        customerEmailAccepted,
        emailId: adminResult.id,
      },
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error(
      "Email sending failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return Response.json(
      { error: "Unable to send enquiry notification" },
      { status: 500, headers: corsHeaders },
    );
  }
});
