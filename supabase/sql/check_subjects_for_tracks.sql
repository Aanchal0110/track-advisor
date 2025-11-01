-- Check subjects for Data Analytics and AI/ML tracks
-- Run this in Supabase SQL Editor to diagnose the issue

-- 1. Find tracks matching "Data Analytics" or "AI ML" (case-insensitive)
SELECT 
  id,
  track_name,
  description,
  created_at
FROM public.tracks
WHERE LOWER(track_name) LIKE '%data analytics%' 
   OR LOWER(track_name) LIKE '%ai%ml%'
   OR LOWER(track_name) LIKE '%artificial intelligence%'
   OR LOWER(track_name) LIKE '%machine learning%'
ORDER BY track_name;

-- 2. Check all tracks and their IDs
SELECT id, track_name FROM public.tracks ORDER BY track_name;

-- 3. Check subjects for each track (replace the track_id with actual IDs from query 1)
-- Example: If Data Analytics track ID is 'abc123', run:
-- SELECT * FROM public.subjects WHERE track_id = 'abc123';

-- 4. Check all subjects with their track names (using JOIN)
SELECT 
  s.id as subject_id,
  s.subject_name,
  s.subject_desc,
  s.track_id,
  t.track_name,
  s.created_at
FROM public.subjects s
LEFT JOIN public.tracks t ON s.track_id = t.id
WHERE LOWER(t.track_name) LIKE '%data analytics%' 
   OR LOWER(t.track_name) LIKE '%ai%ml%'
   OR LOWER(t.track_name) LIKE '%artificial intelligence%'
   OR LOWER(t.track_name) LIKE '%machine learning%'
ORDER BY t.track_name, s.subject_name;

-- 5. Count subjects per track
SELECT 
  t.track_name,
  COUNT(s.id) as subject_count,
  STRING_AGG(s.subject_name, ', ') as subjects
FROM public.tracks t
LEFT JOIN public.subjects s ON t.id = s.track_id
GROUP BY t.track_name, t.id
ORDER BY t.track_name;

