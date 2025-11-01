-- Fix subjects that might have incorrect track_ids for Data Analytics and AI/ML tracks
-- Run this AFTER checking with check_subjects_for_tracks.sql

-- Step 1: Find the correct track IDs
-- Run this first to see the track IDs:
SELECT id, track_name FROM public.tracks 
WHERE LOWER(track_name) LIKE '%data analytics%' 
   OR LOWER(track_name) LIKE '%ai%ml%'
   OR LOWER(track_name) LIKE '%artificial intelligence%'
   OR LOWER(track_name) LIKE '%machine learning%'
ORDER BY track_name;

-- Step 2: Update subjects with correct track_id
-- Replace 'OLD_TRACK_ID' and 'NEW_TRACK_ID' with actual IDs from Step 1
-- Example:
-- UPDATE public.subjects 
-- SET track_id = (
--   SELECT id FROM public.tracks 
--   WHERE LOWER(track_name) = 'data analytics' 
--   LIMIT 1
-- )
-- WHERE track_id = 'OLD_TRACK_ID'
--   AND EXISTS (
--     SELECT 1 FROM public.tracks 
--     WHERE LOWER(track_name) = 'data analytics'
--   );

-- Step 3: Alternative - Fix by track name matching (if subjects have a track name reference)
-- This assumes you have a way to match subjects to tracks by name
-- UPDATE public.subjects s
-- SET track_id = t.id
-- FROM public.tracks t
-- WHERE LOWER(t.track_name) LIKE '%data analytics%'
--   AND s.track_id != t.id
--   AND EXISTS (
--     SELECT 1 FROM public.tracks t2 
--     WHERE t2.id = s.track_id 
--     AND LOWER(t2.track_name) LIKE '%data analytics%'
--   );

-- Step 4: Check for orphaned subjects (subjects with track_id that doesn't exist in tracks)
SELECT 
  s.id,
  s.subject_name,
  s.track_id,
  'Orphaned - track_id does not exist' as issue
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
WHERE t.id IS NULL;

-- Step 5: Delete orphaned subjects (if they are truly invalid)
-- UNCOMMENT ONLY IF YOU WANT TO DELETE:
-- DELETE FROM public.subjects
-- WHERE track_id NOT IN (SELECT id FROM public.tracks);

