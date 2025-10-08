-- Add more market insights with Indian salaries (in INR)
INSERT INTO market_insights (role_title, demand_score, median_salary, job_openings, growth_rate, skills_required) VALUES
('Full Stack Developer (India)', 92, 800000, 15000, 18.5, ARRAY['React', 'Node.js', 'MongoDB', 'AWS']),
('Data Scientist (India)', 88, 1200000, 8500, 22.3, ARRAY['Python', 'Machine Learning', 'SQL', 'TensorFlow']),
('DevOps Engineer (India)', 85, 1000000, 6500, 20.1, ARRAY['Docker', 'Kubernetes', 'AWS', 'Jenkins']),
('Mobile Developer (India)', 82, 900000, 5500, 16.8, ARRAY['React Native', 'Flutter', 'iOS', 'Android']),
('Backend Developer (India)', 87, 850000, 12000, 17.5, ARRAY['Java', 'Spring Boot', 'Microservices', 'PostgreSQL']),
('Frontend Developer (India)', 84, 700000, 10000, 15.2, ARRAY['React', 'TypeScript', 'CSS', 'JavaScript']),
('Cloud Architect (India)', 89, 1800000, 3500, 24.5, ARRAY['AWS', 'Azure', 'GCP', 'Terraform']),
('Machine Learning Engineer (India)', 91, 1500000, 7000, 26.3, ARRAY['Python', 'PyTorch', 'ML Ops', 'Deep Learning']),
('Cybersecurity Analyst (India)', 86, 1100000, 4500, 19.7, ARRAY['Network Security', 'Penetration Testing', 'SIEM', 'Compliance']);

-- Add Indian location insights
INSERT INTO location_insights (city, country, tech_ecosystem_score, avg_salary, job_opportunities, cost_of_living_index, top_companies) VALUES
('Bangalore', 'India', 92, 1200000, 45000, 65, ARRAY['TCS', 'Infosys', 'Wipro', 'Flipkart', 'Amazon India', 'Microsoft India']),
('Hyderabad', 'India', 88, 1000000, 28000, 58, ARRAY['Google India', 'Microsoft', 'TCS', 'Tech Mahindra', 'Amazon']),
('Pune', 'India', 85, 950000, 25000, 60, ARRAY['Infosys', 'Cognizant', 'Persistent Systems', 'Capgemini', 'IBM']),
('Chennai', 'India', 84, 900000, 22000, 55, ARRAY['Zoho', 'TCS', 'Cognizant', 'HCL', 'PayPal']),
('Gurgaon', 'India', 87, 1100000, 20000, 70, ARRAY['Google', 'American Express', 'IBM', 'Adobe', 'Samsung']),
('Mumbai', 'India', 83, 1300000, 18000, 85, ARRAY['Tata Consultancy Services', 'HDFC Bank Tech', 'Reliance Jio', 'Goldman Sachs', 'JP Morgan']),
('Noida', 'India', 81, 850000, 15000, 62, ARRAY['HCL', 'Adobe', 'Oracle', 'Samsung R&D', 'Accenture']);

-- Add Indian companies to company_culture
INSERT INTO company_culture (company_name, avg_rating, employee_reviews, benefits, work_life_balance, culture_score) VALUES
('Tata Consultancy Services', 4.2, 15000, ARRAY['Health Insurance', 'PF', 'Flexible Hours', 'Training Programs', 'Performance Bonus'], 8, 4.1),
('Infosys', 4.1, 12000, ARRAY['Medical Insurance', 'Cafeteria', 'Learning Platform', 'Stock Options', 'Wellness Programs'], 7, 4.0),
('Wipro', 4.0, 10000, ARRAY['Health Coverage', 'Work From Home', 'Education Assistance', 'Retirement Benefits'], 7, 3.9),
('Flipkart', 4.5, 5500, ARRAY['Competitive Salary', 'ESOPs', 'Health Insurance', 'Flexible Work', 'Learning Budget'], 9, 4.4),
('Amazon India', 4.3, 8000, ARRAY['Stock Units', 'Health Benefits', 'Relocation Support', 'Career Growth', 'Parental Leave'], 8, 4.2),
('Microsoft India', 4.6, 4500, ARRAY['Excellent Benefits', 'Stock Options', 'Remote Work', 'Learning Resources', 'Inclusive Culture'], 9, 4.5),
('Google India', 4.7, 3500, ARRAY['Top-tier Benefits', 'Free Meals', 'Gym Access', 'Learning Opportunities', 'Innovation Time'], 9, 4.6),
('Zoho Corporation', 4.4, 6000, ARRAY['No VCs Model', 'Job Security', 'Learning Culture', 'Health Insurance', 'Work-Life Balance'], 9, 4.3),
('Tech Mahindra', 3.9, 9000, ARRAY['Medical Benefits', 'Training', 'PF', 'Flexible Hours'], 7, 3.8),
('HCL Technologies', 3.8, 11000, ARRAY['Health Insurance', 'Education Support', 'Employee Benefits', 'Career Growth'], 7, 3.7);

-- Add Indian job listings
INSERT INTO job_listings (job_title, company_name, location, job_type, salary_range, description, requirements, apply_url) VALUES
('Senior Full Stack Developer', 'Flipkart', 'Bangalore, India', 'Full-time', '₹15-25 LPA', 'Build scalable e-commerce solutions for millions of users', ARRAY['5+ years experience', 'React, Node.js', 'Microservices', 'System Design'], 'https://flipkart.com/careers'),
('Data Scientist', 'Amazon India', 'Hyderabad, India', 'Full-time', '₹20-35 LPA', 'Work on ML models for recommendation systems', ARRAY['3+ years ML experience', 'Python, TensorFlow', 'Statistics', 'Big Data'], 'https://amazon.jobs'),
('DevOps Engineer', 'Microsoft India', 'Bangalore, India', 'Full-time', '₹18-30 LPA', 'Manage cloud infrastructure and CI/CD pipelines', ARRAY['Azure/AWS expertise', 'Kubernetes', 'Terraform', '4+ years experience'], 'https://careers.microsoft.com'),
('Backend Developer', 'Zoho Corporation', 'Chennai, India', 'Full-time', '₹10-18 LPA', 'Develop robust backend systems for SaaS products', ARRAY['Java/Python', 'Databases', 'API Design', '3+ years experience'], 'https://zoho.com/careers'),
('Frontend Developer', 'Infosys', 'Pune, India', 'Full-time', '₹8-15 LPA', 'Create responsive web applications for enterprise clients', ARRAY['React/Angular', 'JavaScript', 'CSS', '2+ years experience'], 'https://infosys.com/careers'),
('Machine Learning Engineer', 'Google India', 'Bangalore, India', 'Full-time', '₹30-50 LPA', 'Build and deploy ML models at scale', ARRAY['PhD/Masters preferred', 'Deep Learning', 'PyTorch/TensorFlow', 'Research experience'], 'https://careers.google.com'),
('Cloud Architect', 'TCS', 'Mumbai, India', 'Full-time', '₹25-40 LPA', 'Design cloud solutions for enterprise clients', ARRAY['8+ years experience', 'AWS/Azure certified', 'Solution Architecture', 'Migration expertise'], 'https://tcs.com/careers'),
('Mobile Developer', 'Paytm', 'Noida, India', 'Full-time', '₹12-20 LPA', 'Build mobile apps for fintech platform', ARRAY['React Native/Flutter', 'iOS/Android', '3+ years experience', 'Payment systems knowledge'], 'https://paytm.com/careers'),
('Full Stack Developer', 'Swiggy', 'Bangalore, India', 'Full-time', '₹15-28 LPA', 'Develop features for food delivery platform', ARRAY['Node.js, React', 'MongoDB', 'Real-time systems', '4+ years experience'], 'https://swiggy.com/careers'),
('Cybersecurity Engineer', 'Wipro', 'Hyderabad, India', 'Full-time', '₹12-22 LPA', 'Implement security measures for enterprise systems', ARRAY['Security certifications', 'Network security', 'Incident response', '3+ years experience'], 'https://wipro.com/careers');

-- Add Indian networking events
INSERT INTO networking_events (event_name, event_type, location, event_date, organizer, description, is_virtual, registration_url) VALUES
('Bangalore Tech Summit 2025', 'Conference', 'Bangalore, India', '2025-03-15 09:00:00+00', 'Karnataka Government', 'Asia largest tech summit with 3000+ participants', false, 'https://bengalurutechsummit.com'),
('GopherCon India', 'Conference', 'Pune, India', '2025-02-20 10:00:00+00', 'Go Community', 'Annual Go programming language conference', false, 'https://gopherconindia.com'),
('DevOps India Summit', 'Conference', 'Mumbai, India', '2025-04-10 09:00:00+00', 'DevOps Community', 'Learn about latest DevOps practices and tools', false, 'https://devopsindia.com'),
('PyData Delhi', 'Meetup', 'New Delhi, India', '2025-02-05 18:00:00+00', 'Python Community', 'Monthly meetup for Python and Data Science enthusiasts', false, 'https://pydata.org/delhi'),
('React India', 'Conference', 'Goa, India', '2025-05-15 09:00:00+00', 'React Community', 'India largest React conference', false, 'https://reactindia.io'),
('Nullcon Goa', 'Conference', 'Goa, India', '2025-03-08 09:00:00+00', 'Nullcon', 'International security conference focused on next-gen attacks', false, 'https://nullcon.net'),
('HasGeek Conferences', 'Workshop', 'Bangalore, India', '2025-02-25 14:00:00+00', 'HasGeek', 'Tech workshops and networking for developers', false, 'https://hasgeek.com'),
('AWS Community Day', 'Conference', 'Hyderabad, India', '2025-03-30 10:00:00+00', 'AWS User Group', 'Learn about AWS services and best practices', false, 'https://awscommunityday.in'),
('Women Who Code Delhi', 'Meetup', 'New Delhi, India', '2025-02-12 17:00:00+00', 'Women Who Code', 'Networking event for women in tech', false, 'https://womenwhocode.com/delhi'),
('TechSparks', 'Conference', 'Bangalore, India', '2025-06-20 09:00:00+00', 'YourStory', 'India largest startup-tech summit', false, 'https://techsparks.yourstory.com');

-- Add more mentors with Indian context
INSERT INTO mentors (name, designation, department, expertise, profile_url, photo_url) VALUES
('Priya Sharma', 'Senior Software Engineer', 'Engineering', ARRAY['Full Stack Development', 'System Design', 'Microservices'], 'https://linkedin.com/in/priyasharma', NULL),
('Rajesh Kumar', 'Lead Data Scientist', 'AI/ML', ARRAY['Machine Learning', 'Deep Learning', 'NLP'], 'https://linkedin.com/in/rajeshkumar', NULL),
('Ananya Reddy', 'DevOps Architect', 'Infrastructure', ARRAY['Cloud Architecture', 'Kubernetes', 'AWS'], 'https://linkedin.com/in/ananyareddy', NULL),
('Vikram Singh', 'Principal Engineer', 'Backend', ARRAY['Java', 'Spring Boot', 'Distributed Systems'], 'https://linkedin.com/in/vikramsingh', NULL),
('Sneha Gupta', 'Frontend Lead', 'Engineering', ARRAY['React', 'TypeScript', 'UI/UX'], 'https://linkedin.com/in/snehagupta', NULL),
('Amit Patel', 'Security Engineer', 'Cybersecurity', ARRAY['Network Security', 'Ethical Hacking', 'Compliance'], 'https://linkedin.com/in/amitpatel', NULL);

-- Add more certifications relevant to Indian market
INSERT INTO certifications (certification_name, provider, description, duration, cost, certification_url, track_id) VALUES
('AWS Certified Solutions Architect', 'Amazon Web Services', 'Industry-recognized cloud certification', '3 months', 15000, 'https://aws.amazon.com/certification', (SELECT id FROM tracks WHERE track_name = 'Cloud Computing' LIMIT 1)),
('Google Cloud Professional', 'Google Cloud', 'Professional cloud architect certification', '3 months', 20000, 'https://cloud.google.com/certification', (SELECT id FROM tracks WHERE track_name = 'Cloud Computing' LIMIT 1)),
('Microsoft Azure Fundamentals', 'Microsoft', 'Entry-level Azure certification', '2 months', 5000, 'https://microsoft.com/learn', (SELECT id FROM tracks WHERE track_name = 'Cloud Computing' LIMIT 1)),
('Certified Ethical Hacker', 'EC-Council', 'Premier security certification', '4 months', 45000, 'https://eccouncil.org/ceh', (SELECT id FROM tracks WHERE track_name = 'Cybersecurity' LIMIT 1)),
('TensorFlow Developer Certificate', 'Google', 'Machine learning with TensorFlow', '2 months', 10000, 'https://tensorflow.org/certificate', (SELECT id FROM tracks WHERE track_name = 'Machine Learning & AI' LIMIT 1));