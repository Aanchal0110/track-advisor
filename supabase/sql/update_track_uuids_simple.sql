-- SIMPLE STEP-BY-STEP: Update track UUIDs
-- Data Analytics new ID: e755600d-62dd-4d3a-948b-21e6961d6ec4
-- IoT new ID: 43d4355f-bef3-4e14-a466-2e97a5df633e
-- Run each step separately in Supabase SQL Editor

-- ============================================
-- STEP 1: Find current track IDs
-- ============================================
SELECT id, track_name FROM public.tracks 
WHERE LOWER(track_name) LIKE '%data analytics%' 
   OR LOWER(track_name) LIKE '%iot%'
ORDER BY track_name;

-- Copy the IDs from above - you'll need them for the next steps
-- Example output might show:
-- OLD_DA_ID | Data Analytics
-- OLD_IOT_ID | IoT


-- ============================================
-- STEP 2: Insert new tracks with new UUIDs (if they don't exist)
-- ============================================
-- For Data Analytics:
INSERT INTO public.tracks (id, track_name, description, future_scope, icon, color_scheme, created_at)
SELECT 
  'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid,  -- New Data Analytics UUID
  track_name,
  description,
  future_scope,
  icon,
  color_scheme,
  created_at
FROM public.tracks
WHERE LOWER(track_name) LIKE '%data analytics%'
   OR LOWER(track_name) LIKE '%data%analytics%'
  AND id != 'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid
LIMIT 1
ON CONFLICT (id) DO NOTHING;

-- For IoT:
INSERT INTO public.tracks (id, track_name, description, future_scope, icon, color_scheme, created_at)
SELECT 
  '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid,  -- New IoT UUID
  track_name,
  description,
  future_scope,
  icon,
  color_scheme,
  created_at
FROM public.tracks
WHERE LOWER(track_name) LIKE '%iot%'
   OR LOWER(track_name) LIKE '%internet of things%'
  AND id != '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid
LIMIT 1
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- STEP 3: Update ALL subjects to use new track IDs
-- ============================================
-- Update Data Analytics subjects (this updates all subjects currently linked to old Data Analytics track):
UPDATE public.subjects
SET track_id = 'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid
WHERE track_id IN (
  SELECT id FROM public.tracks 
  WHERE (LOWER(track_name) LIKE '%data analytics%' OR LOWER(track_name) LIKE '%data%analytics%')
    AND id != 'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid
);

-- Update IoT subjects (this updates all subjects currently linked to old IoT track):
UPDATE public.subjects
SET track_id = '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid
WHERE track_id IN (
  SELECT id FROM public.tracks 
  WHERE (LOWER(track_name) LIKE '%iot%' OR LOWER(track_name) LIKE '%internet of things%')
    AND id != '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid
);


-- ============================================
-- STEP 4: Verify subjects are now linked correctly
-- ============================================
SELECT 
  t.id,
  t.track_name,
  COUNT(s.id) as subject_count,
  STRING_AGG(s.subject_name, ', ' ORDER BY s.subject_name) as subjects
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE t.id IN (
  'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid, 
  '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid
)
GROUP BY t.id, t.track_name
ORDER BY t.track_name;


-- ============================================
-- STEP 5: Delete old tracks (ONLY after verifying subjects are moved)
-- ============================================
-- First check if any subjects are still linked to old tracks:
SELECT 
  t.id as old_track_id,
  t.track_name,
  COUNT(s.id) as remaining_subjects
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE (LOWER(t.track_name) LIKE '%data analytics%' 
    OR LOWER(t.track_name) LIKE '%data%analytics%' 
    OR LOWER(t.track_name) LIKE '%iot%')
  AND t.id NOT IN (
    'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid, 
    '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid
  )
GROUP BY t.id, t.track_name
HAVING COUNT(s.id) = 0;  -- Only shows old tracks with NO subjects

-- If the query above shows old tracks with 0 subjects, then delete them:
DELETE FROM public.tracks
WHERE (LOWER(track_name) LIKE '%data analytics%' 
    OR LOWER(track_name) LIKE '%data%analytics%' 
    OR LOWER(track_name) LIKE '%iot%')
  AND id NOT IN (
    'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid, 
    '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.subjects WHERE subjects.track_id = tracks.id
  );


-- ============================================
-- FINAL VERIFICATION
-- ============================================
-- Check both tracks and their subjects:
SELECT 
  t.id,
  t.track_name,
  COUNT(s.id) as total_subjects
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE t.id IN (
  'e755600d-62dd-4d3a-948b-21e6961d6ec4'::uuid, 
  '43d4355f-bef3-4e14-a466-2e97a5df633e'::uuid
)
GROUP BY t.id, t.track_name;

