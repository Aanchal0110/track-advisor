-- Find and fix subjects that are orphaned (have track_ids that don't exist in tracks table)
-- Run this in Supabase SQL Editor

-- ============================================
-- Step 1: Find orphaned subjects (subjects with track_ids that don't exist)
-- ============================================
SELECT 
  s.id as subject_id,
  s.subject_name,
  s.track_id as orphaned_track_id,
  'ORPHANED - Track ID does not exist' as issue
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
WHERE t.id IS NULL
ORDER BY s.subject_name;

-- ============================================
-- Step 2: Find subjects by their names to determine which track they belong to
-- ============================================
-- Common IoT subject names:
SELECT 
  s.id,
  s.subject_name,
  s.track_id,
  'Likely IoT subject' as suggested_track
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
WHERE (t.id IS NULL OR LOWER(t.track_name) NOT LIKE '%iot%')
  AND (
    LOWER(s.subject_name) LIKE '%iot%'
    OR LOWER(s.subject_name) LIKE '%internet of things%'
    OR LOWER(s.subject_name) LIKE '%embedded%'
    OR LOWER(s.subject_name) LIKE '%sensor%'
    OR LOWER(s.subject_name) LIKE '%arduino%'
    OR LOWER(s.subject_name) LIKE '%raspberry%'
  );

-- Common Data Analytics subject names:
SELECT 
  s.id,
  s.subject_name,
  s.track_id,
  'Likely Data Analytics subject' as suggested_track
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
WHERE (t.id IS NULL OR (LOWER(t.track_name) NOT LIKE '%data analytics%' AND LOWER(t.track_name) NOT LIKE '%data%analytics%'))
  AND (
    LOWER(s.subject_name) LIKE '%data%'
    OR LOWER(s.subject_name) LIKE '%analytics%'
    OR LOWER(s.subject_name) LIKE '%statistics%'
    OR LOWER(s.subject_name) LIKE '%visualization%'
    OR LOWER(s.subject_name) LIKE '%sql%'
    OR LOWER(s.subject_name) LIKE '%tableau%'
    OR LOWER(s.subject_name) LIKE '%excel%'
    OR LOWER(s.subject_name) LIKE '%python%data%'
  );

-- ============================================
-- Step 3: Update orphaned IoT subjects
-- ============================================
UPDATE public.subjects
SET track_id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'  -- IoT track ID
WHERE track_id NOT IN (SELECT id FROM public.tracks)  -- Orphaned
  AND EXISTS (
    SELECT 1 FROM public.tracks 
    WHERE id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
  )
  AND (
    LOWER(subject_name) LIKE '%iot%'
    OR LOWER(subject_name) LIKE '%internet of things%'
    OR LOWER(subject_name) LIKE '%embedded%'
    OR LOWER(subject_name) LIKE '%sensor%'
    OR LOWER(subject_name) LIKE '%arduino%'
    OR LOWER(subject_name) LIKE '%raspberry%'
  );

-- ============================================
-- Step 4: Update orphaned Data Analytics subjects
-- ============================================
UPDATE public.subjects
SET track_id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'  -- Data Analytics track ID
WHERE track_id NOT IN (SELECT id FROM public.tracks)  -- Orphaned
  AND EXISTS (
    SELECT 1 FROM public.tracks 
    WHERE id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
  )
  AND (
    LOWER(subject_name) LIKE '%data%analytics%'
    OR LOWER(subject_name) LIKE '%statistics%'
    OR LOWER(subject_name) LIKE '%visualization%'
    OR LOWER(subject_name) LIKE '%sql%'
    OR LOWER(subject_name) LIKE '%tableau%'
    OR LOWER(subject_name) LIKE '%excel%'
    OR LOWER(subject_name) LIKE '%python%data%'
    OR LOWER(subject_name) LIKE '%data%science%'
  );

-- ============================================
-- Step 5: Manual update if you know the old track IDs
-- ============================================
-- If you have the old track IDs that were used, you can update directly:
-- 
-- Example for IoT (replace OLD_IOT_ID with the actual old track ID):
-- UPDATE public.subjects 
-- SET track_id = 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
-- WHERE track_id = 'OLD_IOT_ID';
--
-- Example for Data Analytics (replace OLD_DA_ID with the actual old track ID):
-- UPDATE public.subjects 
-- SET track_id = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
-- WHERE track_id = 'OLD_DA_ID';

-- ============================================
-- Step 6: Final verification
-- ============================================
-- After all updates, verify subjects are correctly linked:
SELECT 
  t.id,
  t.track_name,
  COUNT(s.id) as subject_count,
  STRING_AGG(s.subject_name, ', ' ORDER BY s.subject_name) as subjects
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
WHERE t.id IN ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d')
GROUP BY t.id, t.track_name
ORDER BY t.track_name;

