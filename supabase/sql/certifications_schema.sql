-- Certifications catalog schema for Supabase
-- This table stores available certifications that students can pursue
-- Run in Supabase SQL editor
-- NOTE: Using certification_catalog to avoid conflict with existing certifications table

create table if not exists public.certification_catalog (
	id uuid primary key default gen_random_uuid(),
	certification_name text not null,
	provider text not null,
	description text not null,
	duration text not null,
	cost numeric not null,
	certification_url text not null,
	track_id uuid null,
	created_at timestamp with time zone default now()
);

create index if not exists idx_certification_catalog_provider on public.certification_catalog (provider);
create index if not exists idx_certification_catalog_track on public.certification_catalog (track_id);

alter table public.certification_catalog enable row level security;
create policy if not exists "Allow read certification_catalog" on public.certification_catalog for select using (true);

