-- Create peer_groups table
CREATE TABLE public.peer_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name text NOT NULL,
  description text NOT NULL,
  track_id uuid REFERENCES public.tracks(id),
  member_count integer NOT NULL DEFAULT 0,
  skill_level text NOT NULL,
  meeting_schedule text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.peer_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view peer groups"
ON public.peer_groups FOR SELECT
USING (true);

-- Create alumni table
CREATE TABLE public.alumni (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  graduation_year integer NOT NULL,
  degree text NOT NULL,
  department text NOT NULL,
  current_company text,
  current_position text,
  location text,
  linkedin_url text,
  profile_image text,
  expertise text[] DEFAULT '{}',
  available_for_mentorship boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view alumni"
ON public.alumni FOR SELECT
USING (true);

-- Add VIT faculty as mentors
INSERT INTO public.mentors (name, designation, department, expertise, profile_url, photo_url) VALUES
('Dr. Sangeeta Joshi', 'Principal & Professor', 'Computer Engineering', ARRAY['Leadership', 'Academic Administration', 'Computer Engineering'], 'https://in.linkedin.com/in/dr-sangeeta-joshi-3115ba93', ''),
('Dr. Sushopti Gawade', 'Professor', 'Computer Engineering', ARRAY['Computer Engineering', 'Data Science', 'Machine Learning', 'Research'], 'https://in.linkedin.com/in/dr-sushopti-gawade-944111147', ''),
('Dr. Micky Barua', 'Assistant Professor', 'English & Communication Skills', ARRAY['Communication Skills', 'English Language', 'Soft Skills', 'Technical Writing'], 'https://in.linkedin.com/in/dr-micky-barua-ph-d-english-66811ab9', ''),
('Dr. Pushpa Mahapatro', 'Assistant Professor', 'Information Technology', ARRAY['Information Technology', 'Software Engineering', 'Database Management'], '', ''),
('Prof. Rajesh Kumar', 'Associate Professor', 'Electronics Engineering', ARRAY['Electronics', 'VLSI Design', 'Embedded Systems'], '', ''),
('Dr. Priya Sharma', 'Assistant Professor', 'Artificial Intelligence', ARRAY['AI', 'Machine Learning', 'Deep Learning', 'Neural Networks'], '', ''),
('Prof. Amit Deshmukh', 'Professor', 'Mechanical Engineering', ARRAY['Mechanical Design', 'CAD/CAM', 'Manufacturing'], '', ''),
('Dr. Neha Patil', 'Assistant Professor', 'Data Science', ARRAY['Data Analytics', 'Big Data', 'Python', 'Statistics'], '', '');

-- Add peer study groups
INSERT INTO public.peer_groups (group_name, description, member_count, skill_level, meeting_schedule) VALUES
('AI/ML Study Circle', 'Weekly discussions on latest AI and Machine Learning trends, research papers, and hands-on projects', 45, 'Intermediate', 'Every Saturday 10 AM'),
('Web Development Bootcamp', 'Learn full-stack web development with React, Node.js, and databases', 78, 'Beginner', 'Monday & Thursday 6 PM'),
('Competitive Programming Group', 'Practice DSA problems, participate in coding contests together', 62, 'Advanced', 'Daily online sessions'),
('Data Science Workshop', 'Data analysis, visualization, and ML model building sessions', 38, 'Intermediate', 'Wednesday 5 PM'),
('Cloud Computing Community', 'AWS, Azure, GCP certification prep and cloud project discussions', 52, 'Intermediate', 'Tuesday 7 PM'),
('Cybersecurity Forum', 'Ethical hacking, penetration testing, and security best practices', 41, 'Advanced', 'Friday 6 PM'),
('Mobile App Dev Group', 'Android and iOS app development with Flutter and React Native', 56, 'Beginner', 'Weekend workshops'),
('Blockchain & Web3 Hub', 'Learn blockchain technology, smart contracts, and DApps', 33, 'Intermediate', 'Thursday 6:30 PM'),
('IoT Innovators', 'Arduino, Raspberry Pi projects and IoT application development', 29, 'Beginner', 'Saturday 2 PM'),
('DevOps Engineers Circle', 'CI/CD, Docker, Kubernetes, and automation practices', 47, 'Advanced', 'Wednesday 8 PM');

-- Add Vidyalankar Institute of Technology alumni
INSERT INTO public.alumni (name, graduation_year, degree, department, current_company, current_position, location, linkedin_url, expertise, available_for_mentorship) VALUES
('Gaurav Jadhav', 2023, 'B.Tech', 'Information Technology', 'FirebirdVR', 'XR Simulations Development Intern', 'Mumbai, India', 'https://in.linkedin.com/in/gaurav-jadhav-80083a249', ARRAY['XR Development', 'Unity', 'Virtual Reality'], true),
('Harish Ojha', 2021, 'B.Tech', 'Computer Engineering', 'Tech Mahindra', 'Technical Instructor - Data Science & AI-ML', 'Mumbai, India', 'https://in.linkedin.com/in/harish-ojha-2b9591176', ARRAY['Data Science', 'AI/ML', 'Python', 'Teaching'], true),
('Rahul Mehta', 2020, 'B.Tech', 'Computer Engineering', 'Infosys', 'Senior Software Engineer', 'Pune, India', '', ARRAY['Java', 'Spring Boot', 'Microservices'], true),
('Priya Desai', 2019, 'B.Tech', 'Information Technology', 'TCS', 'Data Analyst', 'Mumbai, India', '', ARRAY['SQL', 'Power BI', 'Python', 'Data Analytics'], true),
('Amit Verma', 2022, 'B.Tech', 'Electronics Engineering', 'Larsen & Toubro', 'Embedded Systems Engineer', 'Mumbai, India', '', ARRAY['Embedded C', 'IoT', 'Arduino'], true),
('Sneha Kulkarni', 2021, 'B.Tech', 'Computer Science', 'Wipro', 'Full Stack Developer', 'Bangalore, India', '', ARRAY['React', 'Node.js', 'MongoDB'], true),
('Rohan Patil', 2018, 'B.Tech', 'Information Technology', 'Amazon', 'Software Development Engineer II', 'Hyderabad, India', '', ARRAY['AWS', 'Java', 'System Design'], true),
('Ananya Shah', 2020, 'B.Tech', 'Computer Engineering', 'Google', 'Product Manager', 'Bangalore, India', '', ARRAY['Product Management', 'Agile', 'User Research'], true),
('Karan Joshi', 2019, 'B.Tech', 'IT', 'Microsoft', 'Cloud Solutions Architect', 'Pune, India', '', ARRAY['Azure', 'Cloud Architecture', 'DevOps'], true),
('Divya Rane', 2022, 'B.Tech', 'Computer Science', 'Cognizant', 'Business Analyst', 'Mumbai, India', '', ARRAY['Business Analysis', 'SQL', 'Tableau'], true);