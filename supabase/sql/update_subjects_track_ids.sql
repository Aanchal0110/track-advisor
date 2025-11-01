-- Direct update script to fix subjects with wrong track_ids
-- IoT track ID: c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f
-- Data Analytics track ID: a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d
-- Run this in Supabase SQL Editor

-- ============================================
-- Step 1: FIRST, find what needs to be updated
-- ============================================
-- Check all subjects and see which track they're currently linked to:
SELECT 
  s.id,
  s.subject_name,
  s.track_id as current_track_id,
  t.track_name as current_track_name,
  CASE 
    WHEN t.track_name IS NULL THEN '⚠️ ORPHANED - Track does not exist'
    WHEN LOWER(t.track_name) LIKE '%iot%' THEN '✅ Correctly linked to IoT'
    WHEN LOWER(t.track_name) LIKE '%data analytics%' OR LOWER(t.track_name) LIKE '%data%analytics%' THEN '✅ Correctly linked to Data Analytics'
    ELSE '❌ Wrong track - needs update'
  END as status
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
ORDER BY status, s.subject_name;

-- ============================================
-- Step 2: Update ALL subjects that have wrong track_ids
-- ============================================
-- OPTION A: If subjects are orphaned (track_id doesn't exist in tracks table)
-- Update IoT subjects:
UPDATE public.subjects
SET track_id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
WHERE track_id NOT IN (SELECT id FROM public.tracks)
  AND EXISTS (SELECT 1 FROM public.tracks WHERE id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f');

-- Update Data Analytics subjects:
UPDATE public.subjects
SET track_id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
WHERE track_id NOT IN (SELECT id FROM public.tracks)
  AND EXISTS (SELECT 1 FROM public.tracks WHERE id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d');

-- OPTION B: If you know the OLD track IDs, update directly
-- Replace 'OLD_IOT_TRACK_ID' with the actual old IoT track ID from your database:
-- UPDATE public.subjects 
-- SET track_id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
-- WHERE track_id = 'OLD_IOT_TRACK_ID';

-- Replace 'OLD_DATA_ANALYTICS_TRACK_ID' with the actual old Data Analytics track ID:
-- UPDATE public.subjects 
-- SET track_id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
-- WHERE track_id = 'OLD_DATA_ANALYTICS_TRACK_ID';

-- ============================================
-- Step 3: Verify the update worked
-- ============================================
SELECT 
  t.track_name,
  COUNT(s.id) as subject_count,
  STRING_AGG(s.subject_name, ', ' ORDER BY s.subject_name) as subject_list
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE t.id IN ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d')
GROUP BY t.id, t.track_name
ORDER BY t.track_name;

