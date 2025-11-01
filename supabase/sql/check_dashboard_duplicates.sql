-- CHECK for duplicates in Dashboard tables (run this FIRST to see what will be deleted)
-- Run this in Supabase SQL Editor BEFORE running remove_dashboard_duplicates.sql

-- ============================================
-- 1. Check for duplicate TRACKS by track_name
-- ============================================
SELECT 
  track_name,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as duplicate_ids,
  STRING_AGG(created_at::text, ', ') as created_dates
FROM public.tracks
GROUP BY track_name
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- ============================================
-- 2. Check for duplicate SUBJECTS by subject_name + track_id
-- ============================================
SELECT 
  subject_name,
  track_id,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as duplicate_ids,
  STRING_AGG(created_at::text, ', ') as created_dates
FROM public.subjects
GROUP BY subject_name, track_id
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- ============================================
-- 3. Check for duplicate TRACKS by slug (if slug exists and is unique)
-- ============================================
-- Uncomment if your tracks table has a slug column:
-- SELECT 
--   slug,
--   COUNT(*) as duplicate_count,
--   STRING_AGG(id::text, ', ') as duplicate_ids
-- FROM public.tracks
-- WHERE slug IS NOT NULL
-- GROUP BY slug
-- HAVING COUNT(*) > 1
-- ORDER BY duplicate_count DESC;

