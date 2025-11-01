-- Seed data for mentors table
-- Matches the actual table structure: id, name, designation, department, photo_url, profile_url, expertise, created_at

-- Example mentors with different departments and expertise areas
INSERT INTO public.mentors (name, designation, department, photo_url, profile_url, expertise) VALUES
-- Computer Science & IT Mentors
('Dr. Sarah Johnson', 'Professor', 'Computer Science', 'https://i.pravatar.cc/150?img=47', 'https://example.com/profiles/sarah-johnson', ARRAY['AI/ML', 'Machine Learning', 'Data Science', 'Research']),

('Prof. Michael Chen', 'Associate Professor', 'Information Technology', 'https://i.pravatar.cc/150?img=12', 'https://example.com/profiles/michael-chen', ARRAY['Data Engineering', 'Cloud Computing', 'Big Data', 'AWS']),

('Dr. Priya Sharma', 'Assistant Professor', 'Computer Science', 'https://i.pravatar.cc/150?img=32', 'https://example.com/profiles/priya-sharma', ARRAY['IoT', 'Embedded Systems', 'Smart Cities', 'Hardware Design']),

-- Electronics & VLSI Mentors
('Prof. Rajesh Kumar', 'Professor & HOD', 'Electronics & Communication', 'https://i.pravatar.cc/150?img=52', 'https://example.com/profiles/rajesh-kumar', ARRAY['VLSI Design', 'Advanced VLSI', 'Semiconductor Technology', 'ASIC Design']),

('Dr. Anjali Patel', 'Associate Professor', 'Electronics Engineering', 'https://i.pravatar.cc/150?img=28', 'https://example.com/profiles/anjali-patel', ARRAY['Analog VLSI', 'Mixed-Signal Design', 'Low Power Design', 'Circuit Design']),

-- Biomedical & Healthcare Mentors
('Dr. Emily Rodriguez', 'Professor', 'Biomedical Engineering', 'https://i.pravatar.cc/150?img=45', 'https://example.com/profiles/emily-rodriguez', ARRAY['Medical Imaging', 'Healthcare AI', 'Biomedical Devices', 'Data Analytics']),

('Prof. David Kim', 'Associate Professor', 'Biomedical Engineering', 'https://i.pravatar.cc/150?img=15', 'https://example.com/profiles/david-kim', ARRAY['Healthcare IoT', 'Medical Devices', 'Wearable Technology', 'Biomedical Sensors']),

-- Data Science & Analytics Mentors
('Dr. Lisa Wang', 'Assistant Professor', 'Data Science', 'https://i.pravatar.cc/150?img=33', 'https://example.com/profiles/lisa-wang', ARRAY['Data Visualization', 'Data Analytics', 'Business Intelligence', 'Tableau']),

('Prof. James Wilson', 'Professor', 'Information Systems', 'https://i.pravatar.cc/150?img=19', 'https://example.com/profiles/james-wilson', ARRAY['Data Engineering', 'Enterprise Solutions', 'Financial Data', 'Consulting']),

-- Career Development & Leadership Mentors
('Dr. Maria Garcia', 'Career Counselor', 'Career Development Center', 'https://i.pravatar.cc/150?img=38', 'https://example.com/profiles/maria-garcia', ARRAY['Career Guidance', 'Interview Prep', 'Resume Building', 'Networking']),

('Prof. Robert Brown', 'Industry Relations Coordinator', 'Placement Cell', 'https://i.pravatar.cc/150?img=7', 'https://example.com/profiles/robert-brown', ARRAY['Industry Relations', 'Placement', 'Networking', 'Job Search']);
