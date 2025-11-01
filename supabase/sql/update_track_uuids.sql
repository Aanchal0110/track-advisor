-- Update track UUIDs for Data Analytics and IoT
-- New IDs:
-- Data Analytics: e755600d-62dd-4d3a-948b-21e6961d6ec4
-- IoT: 43d4355f-bef3-4e14-a466-2e97a5df633e
-- Run this in Supabase SQL Editor

-- ============================================
-- Step 1: Find the current track IDs and verify
-- ============================================
-- Check current Data Analytics and IoT tracks:
SELECT 
  id,
  track_name,
  description,
  future_scope,
  icon,
  color_scheme,
  created_at
FROM public.tracks
WHERE LOWER(track_name) LIKE '%data analytics%'
   OR LOWER(track_name) LIKE '%data%analytics%'
   OR LOWER(track_name) LIKE '%iot%'
   OR LOWER(track_name) LIKE '%internet of things%'
ORDER BY track_name;

-- Check how many subjects are linked to these tracks:
SELECT 
  t.id,
  t.track_name,
  COUNT(s.id) as subject_count
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE LOWER(t.track_name) LIKE '%data analytics%'
   OR LOWER(t.track_name) LIKE '%data%analytics%'
   OR LOWER(t.track_name) LIKE '%iot%'
   OR LOWER(t.track_name) LIKE '%internet of things%'
GROUP BY t.id, t.track_name
ORDER BY t.track_name;

-- ============================================
-- Step 2: Save old IDs (you'll need these)
-- ============================================
-- Run this and note the OLD IDs:
SELECT 
  id as old_track_id,
  track_name,
  CASE 
    WHEN LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%' 
    THEN 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'  -- Old Data Analytics ID you mentioned
    WHEN LOWER(track_name) LIKE '%iot%' 
    THEN 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'  -- Old IoT ID you mentioned
    ELSE 'UNKNOWN'
  END as should_be_new_id
FROM public.tracks
WHERE LOWER(track_name) LIKE '%data analytics%'
   OR LOWER(track_name) LIKE '%data%analytics%'
   OR LOWER(track_name) LIKE '%iot%'
   OR LOWER(track_name) LIKE '%internet of things%';

-- ============================================
-- Step 3: Update tracks with new UUIDs
-- ============================================

-- OPTION A: If the old tracks don't exist with new IDs yet, insert new ones
-- First, check if new IDs already exist:
SELECT id, track_name FROM public.tracks 
WHERE id IN ('e755600d-62dd-4d3a-948b-21e6961d6ec4', '43d4355f-bef3-4e14-a466-2e97a5df633e');

-- If they don't exist, copy data from old tracks to new ones:
-- For Data Analytics (replace OLD_DATA_ANALYTICS_ID with actual old ID from Step 2):
INSERT INTO public.tracks (id, track_name, description, future_scope, icon, color_scheme, created_at)
SELECT 
  'e755600d-62dd-4d3a-948b-21e6961d6ec4' as id,  -- New Data Analytics UUID
  track_name,
  description,
  future_scope,
  icon,
  color_scheme,
  created_at
FROM public.tracks
WHERE LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%'
  AND id NOT IN ('e755600d-62dd-4d3a-948b-21e6961d6ec4')  -- Don't insert if already exists
LIMIT 1;

-- For IoT (replace OLD_IOT_ID with actual old ID from Step 2):
INSERT INTO public.tracks (id, track_name, description, future_scope, icon, color_scheme, created_at)
SELECT 
  '43d4355f-bef3-4e14-a466-2e97a5df633e' as id,  -- New IoT UUID
  track_name,
  description,
  future_scope,
  icon,
  color_scheme,
  created_at
FROM public.tracks
WHERE LOWER(track_name) LIKE '%iot%' OR LOWER(track_name) LIKE '%internet of things%'
  AND id NOT IN ('43d4355f-bef3-4e14-a466-2e97a5df633e')  -- Don't insert if already exists
LIMIT 1;

-- OPTION B: Update existing tracks (if new IDs already exist, update their data)
-- For Data Analytics:
UPDATE public.tracks
SET 
  track_name = (SELECT track_name FROM public.tracks WHERE LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%' LIMIT 1),
  description = (SELECT description FROM public.tracks WHERE LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%' LIMIT 1),
  future_scope = (SELECT future_scope FROM public.tracks WHERE LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%' LIMIT 1),
  icon = (SELECT icon FROM public.tracks WHERE LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%' LIMIT 1),
  color_scheme = (SELECT color_scheme FROM public.tracks WHERE LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%' LIMIT 1)
WHERE id = 'e755600d-62dd-4d3a-948b-21e6961d6ec4'
  AND EXISTS (SELECT 1 FROM public.tracks WHERE LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%');

-- For IoT:
UPDATE public.tracks
SET 
  track_name = (SELECT track_name FROM public.tracks WHERE LOWER(track_name) LIKE '%iot%' LIMIT 1),
  description = (SELECT description FROM public.tracks WHERE LOWER(track_name) LIKE '%iot%' LIMIT 1),
  future_scope = (SELECT future_scope FROM public.tracks WHERE LOWER(track_name) LIKE '%iot%' LIMIT 1),
  icon = (SELECT icon FROM public.tracks WHERE LOWER(track_name) LIKE '%iot%' LIMIT 1),
  color_scheme = (SELECT color_scheme FROM public.tracks WHERE LOWER(track_name) LIKE '%iot%' LIMIT 1)
WHERE id = '43d4355f-bef3-4e14-a466-2e97a5df633e'
  AND EXISTS (SELECT 1 FROM public.tracks WHERE LOWER(track_name) LIKE '%iot%');

-- ============================================
-- Step 4: Update all subjects to use new track IDs
-- ============================================

-- Update subjects for Data Analytics
-- Replace 'OLD_DATA_ANALYTICS_TRACK_ID' with the actual old ID from Step 2
UPDATE public.subjects
SET track_id = 'e755600d-62dd-4d3a-948b-21e6961d6ec4'  -- New Data Analytics UUID
WHERE track_id IN (
  SELECT id FROM public.tracks 
  WHERE (LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%')
    AND id != 'e755600d-62dd-4d3a-948b-21e6961d6ec4'  -- Not the new ID
);

-- Update subjects for IoT
-- Replace 'OLD_IOT_TRACK_ID' with the actual old ID from Step 2
UPDATE public.subjects
SET track_id = '43d4355f-bef3-4e14-a466-2e97a5df633e'  -- New IoT UUID
WHERE track_id IN (
  SELECT id FROM public.tracks 
  WHERE LOWER(track_name) LIKE '%iot%' OR LOWER(track_name) LIKE '%internet of things%'
    AND id != '43d4355f-bef3-4e14-a466-2e97a5df633e'  -- Not the new ID
);

-- ============================================
-- Step 5: Delete old tracks (after verifying subjects are updated)
-- ============================================
-- First, verify that no subjects are linked to old tracks:
SELECT 
  t.id,
  t.track_name,
  COUNT(s.id) as remaining_subject_count
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE (LOWER(t.track_name) LIKE '%data analytics%' OR LOWER(t.track_name) LIKE '%data%analytics%' OR LOWER(t.track_name) LIKE '%iot%')
  AND t.id NOT IN ('e755600d-62dd-4d3a-948b-21e6961d6ec4', '43d4355f-bef3-4e14-a466-2e97a5df633e')
GROUP BY t.id, t.track_name
HAVING COUNT(s.id) = 0;  -- Only old tracks with no subjects

-- Delete old tracks (only if they have no subjects linked):
DELETE FROM public.tracks
WHERE (LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%' OR LOWER(track_name) LIKE '%iot%')
  AND id NOT IN ('e755600d-62dd-4d3a-948b-21e6961d6ec4', '43d4355f-bef3-4e14-a466-2e97a5df633e')
  AND NOT EXISTS (
    SELECT 1 FROM public.subjects WHERE subjects.track_id = tracks.id
  );

-- ============================================
-- Step 6: Final verification
-- ============================================
-- Verify the new track IDs and their subjects:
SELECT 
  t.id,
  t.track_name,
  COUNT(s.id) as subject_count,
  STRING_AGG(s.subject_name, ', ' ORDER BY s.subject_name) as subjects
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE t.id IN ('e755600d-62dd-4d3a-948b-21e6961d6ec4', '43d4355f-bef3-4e14-a466-2e97a5df633e')
GROUP BY t.id, t.track_name
ORDER BY t.track_name;

-- Verify no orphaned subjects:
SELECT COUNT(*) as orphaned_subjects_count
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
WHERE t.id IS NULL;

