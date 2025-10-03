-- Career features initial schema (placeholders)
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type text not null check (type in ('personality','skills','interests')),
  result jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  description text,
  earned_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  provider text not null,
  name text not null,
  status text not null default 'planned',
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  description text,
  url text,
  created_at timestamptz not null default now()
);

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  track_id text,
  content jsonb,
  created_at timestamptz not null default now()
);

comment on table public.assessments is 'Stores outcomes of personality, skills, and interests assessments.';
comment on table public.badges is 'Achievement badges earned by users.';
comment on table public.certifications is 'Certification roadmap progress per user.';
comment on table public.portfolio_projects is 'User portfolio projects for the portfolio builder.';
comment on table public.resumes is 'Track-specific resume content per user.';


