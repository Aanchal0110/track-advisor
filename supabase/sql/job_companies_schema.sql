-- Job Companies schema for Supabase (Job Market)
-- Run in Supabase SQL editor

create table if not exists public.job_companies (
	id uuid primary key default gen_random_uuid(),
	rank int not null,
	company_name text not null,
	careers_url text not null,
	category text not null,
	key_areas text[] not null,
	relevant_backgrounds text[] not null,
	image_url text null,
	created_at timestamp with time zone default now()
);

create index if not exists idx_job_companies_category_rank on public.job_companies (category, rank);

alter table public.job_companies enable row level security;
create policy if not exists "Allow read job companies" on public.job_companies for select using (true);


