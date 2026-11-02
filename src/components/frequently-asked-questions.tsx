import { ArrowUpRight } from "lucide-react";

const questions = [
  {
    question: "What outdoor advertising services do you provide?",
    answer:
      "SLN Auviora Media offers high-resolution P5 LED advertising, roadside media, unipoles, hoardings, gantries and large-format outdoor advertising.",
  },
  {
    question: "Where is the LED screen located?",
    answer:
      "The operational LED display is at Bilekahalli Signal, Malabar Gold Point, Bannerghatta Main Road, Bengaluru. Sarjapura Road and Kanakapura Road are upcoming locations, not currently listed as operational.",
  },
  {
    question: "What are the LED display specifications?",
    answer:
      "The Bilekahalli display is a P5 Outdoor SMD LED screen with a resolution of 1152 × 1152 pixels and a display size of 5760 × 5760 mm.",
  },
  {
    question: "How many hours does the LED display operate?",
    answer:
      "The listed daily playtime is 13–15 hours, subject to the confirmed operating schedule. Please contact our team to confirm the schedule for your campaign.",
  },
  {
    question: "What is the duration of each advertisement?",
    answer: "The available LED advertisement formats are 10 seconds and 15 seconds.",
  },
  {
    question: "How frequently is an advertisement displayed?",
    answer:
      "The current listing indicates playback approximately once every minute during scheduled display hours. Confirm the final rotation details with our team when planning your campaign.",
  },
  {
    question: "How can I book an outdoor advertising campaign?",
    answer:
      "Use the enquiry form or contact us by phone or WhatsApp. Share your campaign goals, preferred format, location and duration, and our team can discuss availability.",
  },
  {
    question: "What is the campaign pricing?",
    answer:
      "Pricing depends on the selected media and campaign requirements. Contact our team for an up-to-date quote; rates are not published here.",
  },
  {
    question: "What advertisement artwork formats are accepted?",
    answer:
      "Artwork specifications can vary by placement. Please contact our team before preparing final creative so we can confirm the suitable format and technical requirements.",
  },
  {
    question: "Can I advertise across multiple locations?",
    answer:
      "Please tell us which locations you are considering. Our team can confirm which options are currently available; upcoming locations are identified separately from operational media.",
  },
];

export function FrequentlyAskedQuestions() {
  return (
    <section id="faq" className="faq-section section-pad" aria-labelledby="faq-heading">
      <div className="faq-heading">
        <span className="eyebrow">GOOD TO KNOW</span>
        <h2 className="display" id="faq-heading">
          THE DETAILS,
          <br />
          <em>MADE CLEAR.</em>
        </h2>
        <p>Helpful answers about our outdoor media, locations and campaign options.</p>
      </div>
      <div className="faq-list">
        {questions.map(({ question, answer }, index) => (
          <details className="faq-item" key={question}>
            <summary>
              <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{question}</span>
              <span className="faq-indicator" aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
        <a className="faq-contact-link" href="#contact">
          STILL HAVE A QUESTION? TALK TO OUR TEAM <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
