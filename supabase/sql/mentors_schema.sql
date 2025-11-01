-- Mentors table to power Learning > Guidance tab
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT,
  department TEXT,
  photo_url TEXT,
  profile_url TEXT,
  bio TEXT,
  expertise TEXT[] DEFAULT '{}',
  availability TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.mentors IS 'Faculty/professional mentors with images, designations, and departments.';
COMMENT ON COLUMN public.mentors.name IS 'Mentor full name';
COMMENT ON COLUMN public.mentors.designation IS 'Title or designation (e.g., Professor, HOD)';
COMMENT ON COLUMN public.mentors.department IS 'Department/discipline';
COMMENT ON COLUMN public.mentors.photo_url IS 'Public URL to mentor image';
COMMENT ON COLUMN public.mentors.profile_url IS 'Link to mentor profile page';
COMMENT ON COLUMN public.mentors.bio IS 'Mentor biography/description';
COMMENT ON COLUMN public.mentors.expertise IS 'Array of areas of expertise';
COMMENT ON COLUMN public.mentors.availability IS 'Availability information (e.g., "Available for mentorship")';

-- Enable RLS (Row Level Security)
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public read access for mentors"
  ON public.mentors
  FOR SELECT
  USING (true);

