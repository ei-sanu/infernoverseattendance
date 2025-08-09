/*
# Create attendance tracking system

1. New Tables
  - `attendance_records`
    - `id` (uuid, primary key)
    - `registration_number` (text, not null)
    - `participant_name` (text, not null)
    - `marked_by_volunteer` (text, not null)
    - `event_name` (text, default 'Inferno Verse 2025')
    - `marked_at` (timestamp, default now())
    - `created_at` (timestamp, default now())

2. Security
  - Enable RLS on `attendance_records` table
  - Add policy for authenticated users to read and insert records
*/

CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number text NOT NULL,
  participant_name text NOT NULL,
  marked_by_volunteer text NOT NULL,
  event_name text DEFAULT 'Inferno Verse 2025',
  marked_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read attendance records"
  ON attendance_records
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert attendance records"
  ON attendance_records
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_attendance_registration ON attendance_records(registration_number);
CREATE INDEX IF NOT EXISTS idx_attendance_volunteer ON attendance_records(marked_by_volunteer);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(marked_at);