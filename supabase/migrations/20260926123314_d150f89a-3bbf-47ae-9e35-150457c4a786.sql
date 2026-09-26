CREATE TABLE public.campaign_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  company TEXT NOT NULL CHECK (char_length(company) BETWEEN 2 AND 160),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  requirement TEXT NOT NULL CHECK (char_length(requirement) BETWEEN 2 AND 240),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 5 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.campaign_enquiries TO anon, authenticated;
GRANT ALL ON public.campaign_enquiries TO service_role;

ALTER TABLE public.campaign_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a campaign enquiry"
ON public.campaign_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);