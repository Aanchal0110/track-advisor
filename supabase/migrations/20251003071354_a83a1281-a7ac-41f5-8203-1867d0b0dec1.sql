-- Delete existing data to avoid duplicates (subject data table was empty anyway)
DELETE FROM "subject data";

-- Note: The "subject data" table appears to only have id and created_at columns
-- Since this table structure doesn't seem to match any data needs, 
-- I'll focus on ensuring tracks, subjects, and quiz_questions tables are populated

-- First, let's ensure we have tracks
INSERT INTO tracks (id, track_name, description, future_scope, icon, color_scheme) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Data Analytics', 'Master the art of extracting insights from data using advanced analytical tools and techniques', 'Data Scientists, Business Analysts, Data Engineers with high demand across industries', 'BarChart3', 'blue'),
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Machine Learning & AI', 'Dive into artificial intelligence and build intelligent systems that learn and adapt', 'AI Engineers, ML Scientists, Research Scientists in cutting-edge tech companies', 'Brain', 'purple'),
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Internet of Things', 'Connect the physical and digital worlds through smart devices and sensor networks', 'IoT Architects, Embedded Systems Engineers, Smart City Developers', 'Cpu', 'green'),
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'VLSI Design', 'Design and develop integrated circuits for next-generation electronic systems', 'Chip Designers, Verification Engineers, Hardware Architects in semiconductor industry', 'Microchip', 'orange')
ON CONFLICT (id) DO UPDATE SET
  track_name = EXCLUDED.track_name,
  description = EXCLUDED.description,
  future_scope = EXCLUDED.future_scope,
  icon = EXCLUDED.icon,
  color_scheme = EXCLUDED.color_scheme;

-- Add comprehensive quiz questions for Data Analytics
INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'What is the primary purpose of data normalization?', '["To increase data redundancy", "To reduce data redundancy and improve data integrity", "To make queries slower", "To increase storage space"]', 1, 'beginner', 'Data normalization organizes data to reduce redundancy and improve data integrity by eliminating duplicate data.'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Which visualization is best for showing trends over time?', '["Pie chart", "Bar chart", "Line chart", "Scatter plot"]', 2, 'beginner', 'Line charts are ideal for displaying trends and changes over time periods.'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'In SQL, what does the GROUP BY clause do?', '["Sorts the data", "Groups rows with same values", "Filters rows", "Joins tables"]', 1, 'intermediate', 'GROUP BY groups rows that have the same values in specified columns into summary rows.'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'What is the purpose of A/B testing in analytics?', '["To test database performance", "To compare two versions to determine which performs better", "To backup data", "To encrypt data"]', 1, 'intermediate', 'A/B testing compares two versions of something to determine which performs better based on metrics.'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Which technique is used to handle missing data?', '["Encryption", "Imputation", "Compilation", "Sorting"]', 1, 'hard', 'Imputation is a technique to fill in missing values using statistical methods like mean, median, or predictive models.');

-- Add quiz questions for Machine Learning & AI
INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'What is supervised learning?', '["Learning without labeled data", "Learning from labeled training data", "Learning by trial and error", "Learning from rules"]', 1, 'beginner', 'Supervised learning uses labeled training data to learn the relationship between input and output.'),
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Which algorithm is used for classification problems?', '["Linear Regression", "Logistic Regression", "K-means", "PCA"]', 1, 'beginner', 'Logistic Regression is commonly used for binary classification problems.'),
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'What is the purpose of cross-validation?', '["To increase training speed", "To assess model performance and prevent overfitting", "To reduce dataset size", "To encrypt data"]', 1, 'intermediate', 'Cross-validation evaluates model performance on different subsets of data to ensure it generalizes well.'),
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'What is a neural network activation function?', '["A data preprocessing step", "A function that introduces non-linearity", "A database query", "A file format"]', 1, 'intermediate', 'Activation functions introduce non-linearity into neural networks, enabling them to learn complex patterns.'),
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'What is the vanishing gradient problem?', '["When gradients become too large", "When gradients become too small during backpropagation", "When data is missing", "When models are too simple"]', 1, 'hard', 'Vanishing gradient occurs when gradients become extremely small, making it difficult for deep networks to learn.');

-- Add quiz questions for IoT
INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'What does IoT stand for?', '["Internet of Things", "Information of Technology", "Interface of Tools", "Integration of Tech"]', 0, 'beginner', 'IoT stands for Internet of Things, referring to the network of physical devices connected to the internet.'),
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Which protocol is commonly used in IoT?', '["HTTP", "MQTT", "FTP", "SMTP"]', 1, 'beginner', 'MQTT is a lightweight messaging protocol designed specifically for IoT applications.'),
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'What is an IoT gateway?', '["A type of sensor", "A device that connects IoT devices to the cloud", "A programming language", "A database"]', 1, 'intermediate', 'An IoT gateway acts as a bridge between IoT devices and cloud services, handling data aggregation and protocol translation.'),
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'What is edge computing in IoT?', '["Computing at data centers", "Processing data near the source", "Cloud storage", "Mobile computing"]', 1, 'intermediate', 'Edge computing processes data closer to where it is generated, reducing latency and bandwidth usage.'),
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'What security challenge is unique to IoT?', '["Password management", "Physical device security and firmware updates", "Email encryption", "File permissions"]', 1, 'hard', 'IoT devices face unique security challenges including physical access, firmware vulnerabilities, and difficulty in updating distributed devices.');

-- Add quiz questions for VLSI Design
INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'What does VLSI stand for?', '["Very Large Scale Integration", "Virtual Logic System Integration", "Variable Load System Interface", "Vector Logic Scale Input"]', 0, 'beginner', 'VLSI stands for Very Large Scale Integration, referring to the process of creating integrated circuits.'),
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'Which language is commonly used in VLSI design?', '["Python", "VHDL", "JavaScript", "Ruby"]', 1, 'beginner', 'VHDL (VHSIC Hardware Description Language) is widely used for describing digital circuits.'),
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'What is synthesis in VLSI design?', '["Testing chips", "Converting HDL to gate-level representation", "Manufacturing process", "Packaging chips"]', 1, 'intermediate', 'Synthesis converts high-level hardware description into a gate-level netlist.'),
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'What is clock skew?', '["Clock frequency variation", "Difference in arrival times of clock signal", "Clock design tool", "Clock generation circuit"]', 1, 'intermediate', 'Clock skew is the difference in arrival times of the clock signal at different parts of the circuit.'),
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'What is the purpose of DFT in VLSI?', '["To speed up design", "To make chips testable after manufacturing", "To reduce power", "To increase frequency"]', 1, 'hard', 'Design for Testability (DFT) incorporates features that make chips easier to test after manufacturing.');
