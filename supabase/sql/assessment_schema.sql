-- Assessment questions schema for Supabase
-- Run in Supabase SQL editor

create table if not exists public.assessment_questions (
	id uuid primary key default gen_random_uuid(),
	category text not null check (category in ('personality','skills')),
	sub_category text not null, -- Big Five trait or Skill topic
	prompt text not null,
	options jsonb not null, -- [{ id: 'a1', label: 'Strongly agree' }, ...]
	correct_option_id text not null,
	created_at timestamp with time zone default now()
);

create index if not exists idx_assessment_cat_sub on public.assessment_questions (category, sub_category);

-- optional attempts log (from client, anon allowed)
create table if not exists public.assessment_attempts (
	id uuid primary key default gen_random_uuid(),
	user_id uuid null,
	category text not null,
	sub_category text not null,
	question_id uuid null,
	chosen_option_id text not null,
	is_correct boolean not null,
	created_at timestamp with time zone default now()
);

-- RLS policies (adjust as needed)
alter table public.assessment_questions enable row level security;
alter table public.assessment_attempts enable row level security;

-- Allow read for everyone on questions
create policy if not exists "Allow read questions" on public.assessment_questions
	for select using (true);

-- Allow insert attempts for authenticated and anon users
create policy if not exists "Allow insert attempts" on public.assessment_attempts
	for insert with check (true);
