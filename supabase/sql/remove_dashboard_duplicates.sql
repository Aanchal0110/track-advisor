-- Remove duplicates from Dashboard tables (tracks and subjects)
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. Remove duplicate TRACKS
-- ============================================
-- This keeps the oldest record (by created_at or id) and removes duplicates based on track_name
DELETE FROM public.tracks
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY track_name ORDER BY created_at ASC, id ASC) as row_num
    FROM public.tracks
  ) t
  WHERE row_num > 1
);

-- Alternative: If you want to keep duplicates based on slug instead of track_name, use this:
-- DELETE FROM public.tracks
-- WHERE id IN (
--   SELECT id
--   FROM (
--     SELECT id,
--            ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at ASC, id ASC) as row_num
--     FROM public.tracks
--   ) t
--   WHERE row_num > 1
-- );

-- ============================================
-- 2. Remove duplicate SUBJECTS
-- ============================================
-- This keeps the oldest record and removes duplicates based on subject_name + track_id combination
DELETE FROM public.subjects
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY subject_name, track_id ORDER BY created_at ASC, id ASC) as row_num
    FROM public.subjects
  ) s
  WHERE row_num > 1
);

-- ============================================
-- 3. Verification queries (run these first to see duplicates before deleting)
-- ============================================
-- Check for duplicate tracks by name:
-- SELECT track_name, COUNT(*) as count
-- FROM public.tracks
-- GROUP BY track_name
-- HAVING COUNT(*) > 1;

-- Check for duplicate subjects by name and track:
-- SELECT subject_name, track_id, COUNT(*) as count
-- FROM public.subjects
-- GROUP BY subject_name, track_id
-- HAVING COUNT(*) > 1;

