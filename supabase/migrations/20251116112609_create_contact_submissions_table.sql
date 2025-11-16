/*
  # Create Contact Submissions Table

  ## Description
  This migration creates a table to store contact form submissions from the Prodevelo website.
  All fields are optional to allow flexible form submissions.

  ## New Tables
    - `contact_submissions`
      - `id` (uuid, primary key): Unique identifier for each submission
      - `name` (text, nullable): Contact person's name
      - `email` (text, nullable): Contact person's email address
      - `phone` (text, nullable): Contact person's phone number
      - `company` (text, nullable): Company name
      - `service` (text, nullable): Service requested (Site Vitrine, Site Business, etc.)
      - `budget` (text, nullable): Estimated budget range
      - `message` (text, nullable): Additional message or project details
      - `created_at` (timestamptz): Timestamp when submission was created

  ## Security
    - Enable RLS on `contact_submissions` table
    - Add policy to allow anonymous users to insert submissions
    - Add policy to allow authenticated admin users to view all submissions

  ## Notes
    - All contact fields are nullable to support flexible form completion
    - Table stores submissions for follow-up by the Prodevelo team
    - Created timestamp helps track when inquiries were submitted
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  company text,
  service text,
  budget text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
