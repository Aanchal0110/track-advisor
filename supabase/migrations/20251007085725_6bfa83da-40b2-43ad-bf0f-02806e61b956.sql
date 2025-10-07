-- Insert Market Insights data
INSERT INTO public.market_insights (role_title, median_salary, demand_score, job_openings, growth_rate, skills_required) VALUES
('Full Stack Developer', 95000, 92, 45000, 15.5, ARRAY['React', 'Node.js', 'TypeScript', 'SQL', 'AWS']),
('Data Scientist', 115000, 88, 28000, 22.3, ARRAY['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics']),
('DevOps Engineer', 105000, 85, 22000, 18.7, ARRAY['Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Terraform']),
('Mobile Developer', 90000, 82, 19000, 14.2, ARRAY['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase']),
('Cloud Architect', 135000, 90, 15000, 25.8, ARRAY['AWS', 'Azure', 'GCP', 'Microservices', 'Security']),
('UI/UX Designer', 85000, 78, 18000, 12.5, ARRAY['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'HTML/CSS']),
('Cybersecurity Analyst', 100000, 95, 32000, 28.4, ARRAY['Network Security', 'Penetration Testing', 'SIEM', 'Compliance', 'Risk Assessment']),
('Machine Learning Engineer', 125000, 93, 24000, 30.2, ARRAY['Python', 'Deep Learning', 'PyTorch', 'MLOps', 'NLP']),
('Product Manager', 110000, 80, 20000, 16.3, ARRAY['Agile', 'Product Strategy', 'Analytics', 'User Stories', 'Roadmapping']),
('Blockchain Developer', 120000, 75, 8000, 35.6, ARRAY['Solidity', 'Ethereum', 'Smart Contracts', 'Web3', 'Cryptography']);

-- Insert Growth Predictions
INSERT INTO public.growth_predictions (track_name, predicted_growth, current_demand, confidence_level, time_horizon, key_drivers) VALUES
('Artificial Intelligence', 42.5, 85000, 'High', '5 years', ARRAY['GPT adoption', 'Automation trends', 'Healthcare AI', 'Autonomous systems']),
('Cybersecurity', 31.8, 120000, 'High', '5 years', ARRAY['Increasing cyber threats', 'Remote work security', 'Cloud security', 'Compliance requirements']),
('Cloud Computing', 28.3, 95000, 'High', '3 years', ARRAY['Digital transformation', 'Multi-cloud strategies', 'Serverless adoption', 'Edge computing']),
('Data Science', 25.6, 72000, 'High', '5 years', ARRAY['Big data explosion', 'Predictive analytics', 'Business intelligence', 'IoT data']),
('Mobile Development', 18.9, 68000, 'Medium', '3 years', ARRAY['5G networks', 'AR/VR apps', 'Super apps', 'Cross-platform tools']),
('Blockchain', 38.2, 12000, 'Medium', '7 years', ARRAY['DeFi growth', 'NFT marketplace', 'Supply chain transparency', 'Digital identity']),
('DevOps', 22.7, 55000, 'High', '3 years', ARRAY['CI/CD adoption', 'Infrastructure as Code', 'Container orchestration', 'GitOps']),
('IoT Development', 27.4, 42000, 'Medium', '5 years', ARRAY['Smart cities', 'Industrial IoT', 'Wearables', 'Connected vehicles']),
('Game Development', 15.3, 38000, 'Medium', '5 years', ARRAY['Mobile gaming', 'Cloud gaming', 'VR/AR gaming', 'Esports']),
('Quantum Computing', 55.8, 3500, 'Low', '10 years', ARRAY['Hardware advances', 'Algorithm research', 'Cryptography', 'Drug discovery']);

-- Insert Location Insights
INSERT INTO public.location_insights (city, country, avg_salary, job_opportunities, cost_of_living_index, tech_ecosystem_score, top_companies) VALUES
('San Francisco', 'USA', 145000, 85000, 185, 98, ARRAY['Google', 'Meta', 'Salesforce', 'Uber', 'Twitter']),
('Seattle', 'USA', 130000, 62000, 165, 95, ARRAY['Amazon', 'Microsoft', 'Boeing', 'Expedia', 'T-Mobile']),
('New York', 'USA', 125000, 78000, 180, 92, ARRAY['JPMorgan', 'Goldman Sachs', 'IBM', 'Bloomberg', 'Verizon']),
('Austin', 'USA', 110000, 45000, 135, 88, ARRAY['Tesla', 'Oracle', 'Dell', 'Indeed', 'AMD']),
('Bangalore', 'India', 35000, 125000, 65, 85, ARRAY['Infosys', 'Wipro', 'TCS', 'Amazon', 'Microsoft']),
('London', 'UK', 95000, 68000, 170, 90, ARRAY['DeepMind', 'Revolut', 'BT', 'ARM', 'Sky']),
('Berlin', 'Germany', 75000, 42000, 145, 82, ARRAY['SAP', 'Siemens', 'N26', 'Delivery Hero', 'Zalando']),
('Singapore', 'Singapore', 85000, 38000, 155, 87, ARRAY['Grab', 'Sea Group', 'Razer', 'Singtel', 'DBS']),
('Toronto', 'Canada', 90000, 52000, 140, 84, ARRAY['Shopify', 'TD Bank', 'RBC', 'Rogers', 'BlackBerry']),
('Tel Aviv', 'Israel', 95000, 28000, 160, 91, ARRAY['Wix', 'Mobileye', 'Check Point', 'Monday.com', 'IronSource']);

-- Insert Company Culture data
INSERT INTO public.company_culture (company_name, avg_rating, employee_reviews, culture_score, work_life_balance, benefits) VALUES
('Google', 4.4, 12500, 92.5, 4, ARRAY['Health insurance', 'Stock options', 'Free meals', 'Gym membership', 'Learning budget']),
('Microsoft', 4.3, 9800, 90.2, 4, ARRAY['Health insurance', 'Stock options', 'Remote work', 'Parental leave', '401k matching']),
('Amazon', 3.9, 15200, 78.5, 3, ARRAY['Health insurance', 'Stock options', 'Career development', 'Relocation assistance']),
('Meta', 4.2, 8600, 88.7, 3, ARRAY['Health insurance', 'Stock options', 'Free meals', 'Wellness programs', 'Commuter benefits']),
('Apple', 4.1, 7400, 86.3, 4, ARRAY['Health insurance', 'Stock options', 'Product discounts', 'Wellness programs', 'Tuition reimbursement']),
('Netflix', 4.0, 3200, 85.8, 4, ARRAY['Unlimited vacation', 'Stock options', 'Parental leave', 'Health insurance', 'Learning budget']),
('Tesla', 3.6, 5800, 72.4, 2, ARRAY['Health insurance', 'Stock options', 'Product discounts', 'Career growth']),
('Salesforce', 4.2, 6900, 89.3, 4, ARRAY['Health insurance', 'Stock options', 'Volunteer time off', '401k matching', 'Wellness reimbursement']),
('Adobe', 4.3, 5100, 90.8, 4, ARRAY['Health insurance', 'Stock options', 'Sabbatical', 'Learning budget', 'Remote work']),
('Spotify', 4.4, 3800, 91.6, 5, ARRAY['Health insurance', 'Stock options', 'Flexible hours', 'Parental leave', 'Wellness budget']);

-- Insert Mentors
INSERT INTO public.mentors (name, designation, department, expertise, profile_url, photo_url) VALUES
('Dr. Priya Sharma', 'Professor', 'Computer Science', ARRAY['Artificial Intelligence', 'Machine Learning', 'Deep Learning'], NULL, NULL),
('Prof. Rajesh Kumar', 'Associate Professor', 'Software Engineering', ARRAY['Cloud Computing', 'Distributed Systems', 'Microservices'], NULL, NULL),
('Dr. Anita Desai', 'Assistant Professor', 'Data Science', ARRAY['Big Data', 'Analytics', 'Data Mining', 'Python'], NULL, NULL),
('Prof. Vikram Singh', 'Professor', 'Cybersecurity', ARRAY['Network Security', 'Ethical Hacking', 'Cryptography'], NULL, NULL),
('Dr. Meera Patel', 'Associate Professor', 'Mobile Development', ARRAY['Android', 'iOS', 'React Native', 'Flutter'], NULL, NULL),
('Prof. Arjun Reddy', 'Assistant Professor', 'DevOps', ARRAY['CI/CD', 'Docker', 'Kubernetes', 'AWS'], NULL, NULL),
('Dr. Kavita Menon', 'Professor', 'UI/UX Design', ARRAY['User Research', 'Prototyping', 'Figma', 'Design Thinking'], NULL, NULL),
('Prof. Sameer Joshi', 'Associate Professor', 'Blockchain', ARRAY['Smart Contracts', 'Ethereum', 'Web3', 'DeFi'], NULL, NULL),
('Dr. Neha Gupta', 'Assistant Professor', 'IoT', ARRAY['Embedded Systems', 'Sensors', 'Arduino', 'Edge Computing'], NULL, NULL),
('Prof. Aditya Verma', 'Professor', 'Game Development', ARRAY['Unity', 'Unreal Engine', 'C#', 'Game Design'], NULL, NULL);

-- Insert Certifications
INSERT INTO public.certifications (certification_name, provider, description, duration, cost, certification_url) VALUES
('AWS Certified Solutions Architect', 'Amazon Web Services', 'Validate technical skills in designing distributed applications on AWS', '3-6 months', 150, 'https://aws.amazon.com/certification/'),
('Google Cloud Professional', 'Google Cloud', 'Demonstrate expertise in designing and managing Google Cloud solutions', '3-4 months', 200, 'https://cloud.google.com/certification'),
('Certified Kubernetes Administrator', 'CNCF', 'Validate skills in Kubernetes administration', '2-3 months', 395, 'https://www.cncf.io/certification/cka/'),
('Microsoft Azure Fundamentals', 'Microsoft', 'Entry-level certification for Azure cloud services', '1-2 months', 99, 'https://learn.microsoft.com/certifications/'),
('Certified Ethical Hacker', 'EC-Council', 'Learn to think like a hacker to better protect systems', '4-6 months', 950, 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/'),
('TensorFlow Developer Certificate', 'Google', 'Demonstrate proficiency in using TensorFlow for ML', '2-4 months', 100, 'https://www.tensorflow.org/certificate'),
('Professional Data Engineer', 'Google Cloud', 'Design and build data processing systems', '4-6 months', 200, 'https://cloud.google.com/certification/data-engineer'),
('CompTIA Security+', 'CompTIA', 'Entry-level cybersecurity certification', '3-4 months', 392, 'https://www.comptia.org/certifications/security'),
('Certified Scrum Master', 'Scrum Alliance', 'Master Scrum framework for Agile development', '2-3 days', 1400, 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster'),
('Meta Front-End Developer', 'Meta', 'Professional certificate in front-end development', '6-8 months', 0, 'https://www.coursera.org/professional-certificates/meta-front-end-developer');

-- Insert Resume Templates
INSERT INTO public.resume_templates (template_name, category, description, is_premium) VALUES
('Modern Tech', 'Technology', 'Clean, professional template perfect for software developers and engineers', false),
('Creative Designer', 'Design', 'Visual-focused template ideal for UI/UX designers and graphic artists', false),
('Data Professional', 'Data Science', 'Analytics-focused template highlighting technical skills and projects', false),
('Executive', 'Management', 'Professional template for senior roles and leadership positions', true),
('Minimalist', 'General', 'Simple, ATS-friendly template that works for any field', false),
('Startup', 'Entrepreneurship', 'Dynamic template for startup founders and product managers', true),
('Academic', 'Research', 'Detailed template perfect for research positions and PhD candidates', false),
('Consulting', 'Business', 'Professional template emphasizing problem-solving and impact', true),
('DevOps', 'Technology', 'Technical template showcasing infrastructure and automation skills', false),
('Marketing', 'Marketing', 'Creative template highlighting campaigns and growth metrics', false);

-- Insert Interview Questions (without explanation column)
INSERT INTO public.interview_questions (question_text, category, difficulty_level, sample_answer, tips) VALUES
('Tell me about yourself', 'Behavioral', 'Beginner', 'Start with your current role, highlight 2-3 key achievements, and explain why you are interested in this position.', ARRAY['Keep it under 2 minutes', 'Focus on professional background', 'End with why you are interested in this role']),
('What is the difference between == and === in JavaScript?', 'Technical', 'Beginner', '== checks for value equality with type coercion, while === checks for both value and type equality without coercion.', ARRAY['Provide code examples', 'Mention type coercion', 'Discuss best practices']),
('Explain the concept of closures in JavaScript', 'Technical', 'Intermediate', 'A closure is a function that has access to variables in its outer (enclosing) function scope, even after the outer function has returned.', ARRAY['Use a practical example', 'Explain scope chain', 'Mention use cases like data privacy']),
('How would you handle a disagreement with a team member?', 'Behavioral', 'Intermediate', 'I would first listen to understand their perspective, then share my viewpoint with supporting data, and work collaboratively to find a solution that benefits the project.', ARRAY['Use the STAR method', 'Show empathy and professionalism', 'Focus on positive outcomes']),
('Design a URL shortening service like bit.ly', 'System Design', 'Hard', 'Discuss requirements, database schema with hash-based key generation, caching strategy, load balancing, and scalability considerations.', ARRAY['Start with requirements gathering', 'Draw a high-level architecture', 'Discuss trade-offs', 'Consider scale and performance']),
('What are your salary expectations?', 'Behavioral', 'Intermediate', 'Based on my research and experience, I am looking for a range of $X to $Y, but I am open to discussion based on the complete compensation package.', ARRAY['Research market rates', 'Give a range not a specific number', 'Express flexibility', 'Consider total compensation']),
('Implement a function to reverse a linked list', 'Technical', 'Intermediate', 'Use three pointers (previous, current, next) to iteratively reverse the links between nodes.', ARRAY['Explain your approach first', 'Consider edge cases', 'Discuss time and space complexity', 'Test with examples']),
('Why do you want to work here?', 'Behavioral', 'Beginner', 'Connect your skills and interests to the company mission, products, and culture. Mention specific projects or values that excite you.', ARRAY['Research the company thoroughly', 'Be specific and authentic', 'Connect to your career goals', 'Avoid generic answers']),
('Explain REST API principles', 'Technical', 'Intermediate', 'REST is an architectural style using HTTP methods (GET, POST, PUT, DELETE) for stateless client-server communication with standard conventions.', ARRAY['Mention statelessness', 'Explain HTTP methods', 'Discuss resource-based URLs', 'Compare with other approaches']),
('Describe a time you failed and what you learned', 'Behavioral', 'Hard', 'Use STAR method: describe the situation, your role, the failure, how you handled it, and importantly, what you learned and how you have applied those lessons.', ARRAY['Be honest but professional', 'Focus on learning and growth', 'Show accountability', 'End with positive outcome or application']);

-- Insert Networking Events
INSERT INTO public.networking_events (event_name, event_type, event_date, location, description, organizer, is_virtual) VALUES
('Tech Career Fair 2025', 'Career Fair', '2025-03-15 10:00:00', 'Convention Center, Vellore', 'Annual career fair connecting students with top tech companies', 'VIT Placement Cell', false),
('Cloud Computing Workshop', 'Workshop', '2025-02-20 14:00:00', 'Online', 'Hands-on workshop covering AWS, Azure, and GCP fundamentals', 'Tech Club VIT', true),
('AI/ML Meetup', 'Meetup', '2025-02-10 17:00:00', 'Tech Park Auditorium', 'Monthly meetup for AI enthusiasts featuring talks and networking', 'Data Science Community', false),
('Hackathon: Build for Tomorrow', 'Hackathon', '2025-03-01 09:00:00', 'VIT Campus', '48-hour hackathon with prizes worth 5 lakhs', 'IEEE VIT', false),
('Women in Tech Panel', 'Panel Discussion', '2025-02-25 16:00:00', 'Online', 'Panel discussion with women leaders in technology', 'WIT VIT', true),
('Startup Founder Roundtable', 'Networking', '2025-02-18 18:00:00', 'Startup Hub', 'Networking event for aspiring entrepreneurs and founders', 'E-Cell VIT', false),
('Cybersecurity Summit', 'Conference', '2025-03-20 09:00:00', 'Hotel Grand', 'Two-day conference on latest cybersecurity trends and threats', 'InfoSec Association', false),
('DevOps Best Practices', 'Webinar', '2025-02-12 19:00:00', 'Online', 'Expert webinar on CI/CD, containerization, and automation', 'DevOps India', true),
('Mobile App Development Bootcamp', 'Bootcamp', '2025-02-28 10:00:00', 'Innovation Lab', 'Week-long intensive bootcamp on React Native development', 'Mobile Dev Club', false),
('Alumni Networking Night', 'Networking', '2025-03-05 19:00:00', 'Campus Lawn', 'Connect with successful alumni working in top tech companies', 'Alumni Association', false);

-- Insert Job Listings
INSERT INTO public.job_listings (job_title, company_name, location, job_type, salary_range, description, requirements, apply_url) VALUES
('Software Engineer', 'Google', 'Bangalore, India', 'Full-time', '₹18-25 LPA', 'Build scalable systems that impact billions of users', ARRAY['CS degree or equivalent', '2+ years experience', 'Proficiency in Java/Python/C++', 'Strong problem-solving skills'], 'https://careers.google.com'),
('Frontend Developer', 'Microsoft', 'Hyderabad, India', 'Full-time', '₹15-22 LPA', 'Create beautiful user experiences for Microsoft products', ARRAY['React/Angular expertise', 'TypeScript proficiency', 'UI/UX sensibility', 'Portfolio required'], 'https://careers.microsoft.com'),
('Data Scientist', 'Amazon', 'Bangalore, India', 'Full-time', '₹20-30 LPA', 'Drive business decisions with data insights and ML models', ARRAY['MS in Data Science/Statistics', 'Python, SQL expertise', 'Experience with ML frameworks', 'Strong analytical skills'], 'https://amazon.jobs'),
('DevOps Engineer', 'Flipkart', 'Bangalore, India', 'Full-time', '₹12-18 LPA', 'Build and maintain infrastructure for India largest e-commerce platform', ARRAY['Kubernetes, Docker experience', 'AWS/GCP knowledge', 'Scripting skills', 'CI/CD expertise'], 'https://flipkart.com/careers'),
('Mobile Developer', 'Swiggy', 'Bangalore, India', 'Full-time', '₹14-20 LPA', 'Develop features for millions of food delivery app users', ARRAY['React Native or Flutter', 'Android/iOS development', 'REST API integration', '3+ years experience'], 'https://careers.swiggy.com'),
('Machine Learning Engineer', 'NVIDIA', 'Pune, India', 'Full-time', '₹22-32 LPA', 'Work on cutting-edge AI and deep learning projects', ARRAY['PhD or MS in CS/ML', 'PyTorch/TensorFlow expertise', 'CUDA programming', 'Research background'], 'https://nvidia.com/careers'),
('Product Manager', 'Razorpay', 'Bangalore, India', 'Full-time', '₹25-35 LPA', 'Define product strategy for fintech solutions', ARRAY['MBA or equivalent', '4+ years PM experience', 'Technical background', 'Fintech knowledge'], 'https://razorpay.com/jobs'),
('Full Stack Developer', 'Zomato', 'Gurgaon, India', 'Full-time', '₹15-22 LPA', 'Build end-to-end features for restaurant discovery platform', ARRAY['React + Node.js', 'MongoDB experience', 'Microservices architecture', 'Startup experience preferred'], 'https://zomato.com/careers'),
('Cybersecurity Analyst', 'Infosys', 'Multiple Cities', 'Full-time', '₹10-16 LPA', 'Protect enterprise systems from security threats', ARRAY['Security certifications', 'SIEM tools knowledge', 'Incident response', 'B.Tech in CS'], 'https://infosys.com/careers'),
('UI/UX Designer', 'PhonePe', 'Bangalore, India', 'Full-time', '₹12-18 LPA', 'Design intuitive experiences for India leading payments app', ARRAY['Figma expertise', 'Portfolio required', 'User research skills', '3+ years experience'], 'https://phonepe.com/careers');

-- Insert Badges
INSERT INTO public.badges (badge_name, icon, description, criteria, points) VALUES
('First Steps', '🎯', 'Complete your first learning module', 'Finish any track module', 10),
('Speed Learner', '⚡', 'Complete 5 modules in one week', 'Complete 5 modules within 7 days', 50),
('Quiz Master', '🧠', 'Score 90% or above in 3 quizzes', 'Achieve 90%+ in 3 different quizzes', 30),
('Consistency King', '👑', 'Study for 30 consecutive days', 'Complete activity for 30 days straight', 100),
('Project Pro', '💻', 'Complete your first portfolio project', 'Add and complete a portfolio project', 40),
('Knowledge Sharer', '🤝', 'Help 10 peers in community forums', 'Provide helpful answers to 10 questions', 60),
('Certification Hunter', '📜', 'Earn your first certification', 'Complete any certification course', 80),
('Track Champion', '🏆', 'Complete an entire learning track', 'Finish all modules in a track', 150),
('Early Bird', '🌅', 'Study before 7 AM for 10 days', 'Complete activity before 7 AM, 10 times', 40),
('Night Owl', '🦉', 'Study after 10 PM for 10 days', 'Complete activity after 10 PM, 10 times', 40);