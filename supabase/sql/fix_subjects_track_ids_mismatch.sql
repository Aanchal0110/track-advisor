-- Fix subjects with incorrect track_ids for IoT and Data Analytics tracks
-- Run this in Supabase SQL Editor

-- ============================================
-- Step 1: Verify the correct track IDs first
-- ============================================
-- Run this query to see all tracks and their IDs:
SELECT id, track_name FROM public.tracks 
WHERE LOWER(track_name) LIKE '%iot%' 
   OR LOWER(track_name) LIKE '%data analytics%'
   OR LOWER(track_name) LIKE '%data%analytics%'
ORDER BY track_name;

-- ============================================
-- Step 2: Check which subjects have wrong track_ids
-- ============================================
-- Find subjects that are supposed to be for IoT or Data Analytics but have different track_ids
SELECT 
  s.id as subject_id,
  s.subject_name,
  s.track_id as current_track_id,
  t.track_name as current_track_name,
  CASE 
    WHEN LOWER(t.track_name) LIKE '%iot%' THEN 'Should be IoT'
    WHEN LOWER(t.track_name) LIKE '%data analytics%' OR LOWER(t.track_name) LIKE '%data%analytics%' THEN 'Should be Data Analytics'
    ELSE 'Unknown'
  END as expected_track
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
WHERE t.track_name IS NULL  -- Orphaned subjects
   OR (LOWER(t.track_name) NOT LIKE '%iot%' 
       AND LOWER(t.track_name) NOT LIKE '%data analytics%'
       AND LOWER(t.track_name) NOT LIKE '%data%analytics%')
ORDER BY expected_track, s.subject_name;

-- ============================================
-- Step 3: Update IoT subjects with correct track_id
-- ============================================
-- Replace 'OLD_IOT_TRACK_ID' with the actual old track_id that needs to be updated
-- The new IoT track_id should be: c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f

-- First, find subjects that should belong to IoT but have wrong track_id:
-- UPDATE public.subjects
-- SET track_id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'  -- New IoT track ID
-- WHERE track_id = 'OLD_IOT_TRACK_ID'  -- Replace with actual old IoT track ID
--   AND EXISTS (
--     SELECT 1 FROM public.tracks 
--     WHERE id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
--   );

-- OR update by finding the correct IoT track ID automatically:
UPDATE public.subjects s
SET track_id = (
  SELECT id FROM public.tracks 
  WHERE id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
  LIMIT 1
)
WHERE EXISTS (
  SELECT 1 FROM public.tracks 
  WHERE id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
)
AND s.track_id NOT IN (
  SELECT id FROM public.tracks 
  WHERE id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
)
AND EXISTS (
  -- Only update if there are subjects that seem to be IoT-related
  -- You can add more conditions here based on subject names
  SELECT 1 FROM public.subjects s2
  WHERE s2.id = s.id
);

-- ============================================
-- Step 4: Update Data Analytics subjects with correct track_id
-- ============================================
-- Replace 'OLD_DATA_ANALYTICS_TRACK_ID' with the actual old track_id
-- The new Data Analytics track_id should be: a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d

UPDATE public.subjects s
SET track_id = (
  SELECT id FROM public.tracks 
  WHERE id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
  LIMIT 1
)
WHERE EXISTS (
  SELECT 1 FROM public.tracks 
  WHERE id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
)
AND s.track_id NOT IN (
  SELECT id FROM public.tracks 
  WHERE id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
)
AND EXISTS (
  -- Only update if there are subjects that seem to be Data Analytics-related
  SELECT 1 FROM public.subjects s2
  WHERE s2.id = s.id
);

-- ============================================
-- Step 5: Manual update by finding old track IDs
-- ============================================
-- If you know the old track IDs, you can update directly:
-- For IoT:
-- UPDATE public.subjects 
-- SET track_id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
-- WHERE track_id = 'OLD_IOT_TRACK_ID_HERE';

-- For Data Analytics:
-- UPDATE public.subjects 
-- SET track_id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
-- WHERE track_id = 'OLD_DATA_ANALYTICS_TRACK_ID_HERE';

-- ============================================
-- Step 6: Verify the update
-- ============================================
-- After running the updates, verify the subjects are linked correctly:
SELECT 
  t.track_name,
  COUNT(s.id) as subject_count,
  STRING_AGG(s.subject_name, ', ' ORDER BY s.subject_name) as subjects
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE t.id IN ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d')
GROUP BY t.id, t.track_name;

