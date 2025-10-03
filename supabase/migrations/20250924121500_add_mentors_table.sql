-- Mentors table to power Community & Mentorship > Mentors
create table if not exists public.mentors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  department text,
  photo_url text,
  profile_url text,
  bio text,
  expertise text[] default '{}',
  availability text,
  created_at timestamptz not null default now()
);

comment on table public.mentors is 'Faculty/professional mentors with images, designations, and departments.';
comment on column public.mentors.name is 'Mentor full name';
comment on column public.mentors.designation is 'Title or dignities (e.g., Professor, HOD)';
comment on column public.mentors.department is 'Department/discipline';
comment on column public.mentors.photo_url is 'Public URL to mentor image';
comment on column public.mentors.profile_url is 'Link to mentor profile page';
comment on column public.mentors.expertise is 'Array of areas of expertise';


