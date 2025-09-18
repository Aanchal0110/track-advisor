-- Update subjects table to support difficulty-based resources
ALTER TABLE subjects 
DROP COLUMN IF EXISTS resources;

ALTER TABLE subjects 
ADD COLUMN resources JSONB DEFAULT '{
  "beginner": {"videos": [], "books": [], "references": []},
  "intermediate": {"videos": [], "books": [], "references": []},
  "hard": {"videos": [], "books": [], "references": []}
}'::jsonb;

-- Create questions table for dynamic quiz system
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  track_id UUID NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'hard')),
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on quiz_questions
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Create policy for quiz questions (public read access)
CREATE POLICY "Anyone can view quiz questions" 
ON quiz_questions 
FOR SELECT 
USING (true);

-- Update quiz_results table to store difficulty distribution
ALTER TABLE quiz_results 
ADD COLUMN IF NOT EXISTS difficulty_distribution JSONB DEFAULT '{"beginner": 0, "intermediate": 0, "hard": 0}'::jsonb;

-- Update existing subjects with sample difficulty-based resources
UPDATE subjects SET resources = jsonb_build_object(
  'beginner', jsonb_build_object(
    'videos', jsonb_build_array(
      'Introduction to ' || subject_name || ' - Part 1',
      'Introduction to ' || subject_name || ' - Part 2',
      'Basics of ' || subject_name || ' - Tutorial 1',
      'Basics of ' || subject_name || ' - Tutorial 2',
      'Getting Started with ' || subject_name,
      'Fundamentals of ' || subject_name || ' Explained',
      subject_name || ' for Beginners - Complete Guide',
      'Step by Step ' || subject_name || ' Tutorial',
      subject_name || ' Crash Course - Part 1',
      subject_name || ' Crash Course - Part 2',
      'Understanding ' || subject_name || ' Concepts',
      subject_name || ' Made Simple',
      'Essential ' || subject_name || ' Skills',
      subject_name || ' Fundamentals Workshop',
      'Complete Beginner Guide to ' || subject_name
    ),
    'books', jsonb_build_array(
      subject_name || ' for Dummies',
      'Learning ' || subject_name || ' - A Beginner Guide',
      'Introduction to ' || subject_name || ' - Textbook',
      subject_name || ' Fundamentals Handbook',
      'Getting Started with ' || subject_name || ' - Book',
      subject_name || ' Basics - Study Guide',
      'Essential ' || subject_name || ' - Reference Book',
      subject_name || ' Made Easy - Beginner Edition',
      'First Steps in ' || subject_name,
      subject_name || ' Foundation Course Book',
      'Understanding ' || subject_name || ' - Textbook',
      subject_name || ' Primer - Study Material',
      'Basic ' || subject_name || ' Concepts Book',
      subject_name || ' for Starters',
      'Complete ' || subject_name || ' Beginner Manual'
    ),
    'references', jsonb_build_array(
      subject_name || ' Quick Reference Card',
      subject_name || ' Cheat Sheet for Beginners',
      'Basic ' || subject_name || ' Commands Reference',
      subject_name || ' Syntax Guide',
      'Essential ' || subject_name || ' Functions List',
      subject_name || ' Terminology Dictionary',
      subject_name || ' Best Practices Guide',
      'Common ' || subject_name || ' Patterns Reference',
      subject_name || ' Setup and Installation Guide',
      subject_name || ' Troubleshooting Manual',
      subject_name || ' FAQ for Beginners',
      subject_name || ' Resource Collection',
      subject_name || ' Learning Path Guide',
      subject_name || ' Study Notes - Beginner',
      subject_name || ' Quick Start Reference'
    )
  ),
  'intermediate', jsonb_build_object(
    'videos', jsonb_build_array(
      'Advanced ' || subject_name || ' Techniques - Part 1',
      'Advanced ' || subject_name || ' Techniques - Part 2',
      'Intermediate ' || subject_name || ' Concepts',
      subject_name || ' Best Practices Workshop',
      'Mastering ' || subject_name || ' - Intermediate Level',
      subject_name || ' Case Studies and Examples',
      'Practical ' || subject_name || ' Applications',
      subject_name || ' Performance Optimization',
      'Advanced ' || subject_name || ' Projects Tutorial',
      subject_name || ' Industry Applications',
      subject_name || ' Design Patterns Explained',
      'Real-world ' || subject_name || ' Implementation',
      subject_name || ' Advanced Features Guide',
      subject_name || ' Optimization Techniques',
      'Professional ' || subject_name || ' Development'
    ),
    'books', jsonb_build_array(
      'Advanced ' || subject_name || ' - Professional Guide',
      subject_name || ' in Practice - Intermediate',
      'Mastering ' || subject_name || ' - Complete Reference',
      subject_name || ' Design Patterns Book',
      'Professional ' || subject_name || ' Development',
      subject_name || ' Advanced Concepts Textbook',
      'Intermediate ' || subject_name || ' Handbook',
      subject_name || ' Best Practices Manual',
      'Applied ' || subject_name || ' - Case Studies',
      subject_name || ' Performance Guide',
      'Advanced ' || subject_name || ' Techniques Book',
      subject_name || ' Architecture Patterns',
      subject_name || ' Optimization Handbook',
      'Professional ' || subject_name || ' Toolkit',
      subject_name || ' Industry Standards Guide'
    ),
    'references', jsonb_build_array(
      'Advanced ' || subject_name || ' API Reference',
      subject_name || ' Performance Tuning Guide',
      subject_name || ' Design Patterns Catalog',
      subject_name || ' Advanced Configuration Manual',
      subject_name || ' Optimization Checklist',
      subject_name || ' Security Best Practices',
      subject_name || ' Scalability Guidelines',
      subject_name || ' Architecture Reference',
      subject_name || ' Advanced Features Documentation',
      subject_name || ' Professional Standards',
      subject_name || ' Integration Guide',
      subject_name || ' Advanced Troubleshooting',
      subject_name || ' Performance Metrics Guide',
      subject_name || ' Code Review Checklist',
      subject_name || ' Professional Resources'
    )
  ),
  'hard', jsonb_build_object(
    'videos', jsonb_build_array(
      'Expert-level ' || subject_name || ' Mastery',
      subject_name || ' Research and Innovation',
      'Cutting-edge ' || subject_name || ' Techniques',
      subject_name || ' System Architecture Deep Dive',
      'Advanced ' || subject_name || ' Algorithms',
      subject_name || ' Performance Engineering',
      subject_name || ' at Scale - Enterprise Solutions',
      subject_name || ' Research Methodologies',
      'Next-generation ' || subject_name || ' Technologies',
      subject_name || ' Expert Masterclass',
      'Advanced ' || subject_name || ' System Design',
      subject_name || ' Innovation Workshop',
      'Expert ' || subject_name || ' Problem Solving',
      subject_name || ' Research Frontiers',
      'Master-level ' || subject_name || ' Implementation'
    ),
    'books', jsonb_build_array(
      'Expert ' || subject_name || ' - Master Level Guide',
      subject_name || ' Research and Development',
      'Advanced ' || subject_name || ' Architecture',
      subject_name || ' Innovation Handbook',
      'Master-level ' || subject_name || ' Concepts',
      subject_name || ' Expert Implementation Guide',
      'Advanced ' || subject_name || ' Algorithms Book',
      subject_name || ' System Design Manual',
      'Expert ' || subject_name || ' Problem Solving',
      subject_name || ' Research Methodologies',
      'Advanced ' || subject_name || ' Engineering',
      subject_name || ' Innovation Strategies',
      'Expert-level ' || subject_name || ' Techniques',
      subject_name || ' Master Class Textbook',
      'Advanced ' || subject_name || ' Research Guide'
    ),
    'references', jsonb_build_array(
      subject_name || ' Expert Reference Manual',
      'Advanced ' || subject_name || ' Research Papers',
      subject_name || ' Innovation Case Studies',
      'Expert ' || subject_name || ' Implementation Guide',
      subject_name || ' Advanced Algorithms Reference',
      subject_name || ' System Architecture Patterns',
      'Expert-level ' || subject_name || ' Documentation',
      subject_name || ' Research Methodologies Guide',
      'Advanced ' || subject_name || ' Performance Analysis',
      subject_name || ' Innovation Framework',
      'Expert ' || subject_name || ' Best Practices',
      subject_name || ' Advanced Security Guidelines',
      subject_name || ' Research Standards',
      'Expert ' || subject_name || ' Troubleshooting Guide',
      subject_name || ' Master-level Resources'
    )
  )
);

-- Insert sample quiz questions with proper difficulty distribution for Data Analytics
INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES 
('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'What is the primary purpose of data analytics?', 
 '["To store large amounts of data", "To extract insights from data", "To create databases", "To design user interfaces"]',
 1, 'beginner', 'Data analytics focuses on examining data to draw conclusions and insights.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'Which of the following is a measure of central tendency?', 
 '["Standard deviation", "Mean", "Range", "Variance"]',
 1, 'beginner', 'Mean is a measure of central tendency along with median and mode.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'What does SQL stand for?', 
 '["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"]',
 0, 'beginner', 'SQL stands for Structured Query Language, used for database operations.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'What is a database?', 
 '["A collection of related data", "A programming language", "A type of computer", "A web browser"]',
 0, 'beginner', 'A database is an organized collection of structured information or data.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'What is the difference between supervised and unsupervised learning?', 
 '["Supervised uses labeled data, unsupervised does not", "Supervised is faster", "Unsupervised is more accurate", "There is no difference"]',
 0, 'intermediate', 'Supervised learning uses labeled training data, while unsupervised learning finds patterns in unlabeled data.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'Which algorithm is best for classification problems?', 
 '["K-means", "Linear regression", "Random Forest", "PCA"]',
 2, 'intermediate', 'Random Forest is an ensemble method excellent for classification tasks.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'What is cross-validation used for?', 
 '["Data cleaning", "Model evaluation", "Feature selection", "Data visualization"]',
 1, 'intermediate', 'Cross-validation is used to assess how well a model generalizes to unseen data.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'What is the curse of dimensionality?', 
 '["Too many variables make analysis difficult", "Data is too large", "Algorithms run slowly", "Computers crash"]',
 0, 'hard', 'The curse of dimensionality refers to problems that arise when analyzing high-dimensional data.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'Explain the bias-variance tradeoff in machine learning', 
 '["Balance between model complexity and generalization", "Speed vs accuracy", "Training vs testing", "Big data vs small data"]',
 0, 'hard', 'Bias-variance tradeoff is about finding the right balance between underfitting and overfitting.'),

('9d373833-e0e7-47b3-b74f-1a31e8c6fbb4', 'What is regularization in machine learning?', 
 '["A technique to prevent overfitting", "A way to speed up training", "A data preprocessing method", "A visualization technique"]',
 0, 'hard', 'Regularization adds penalties to prevent overfitting by constraining model complexity.');

-- Insert sample quiz questions for Machine Learning & AI
INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES 
('5403dbd3-05a3-4639-b2c7-a695378e6271', 'What is artificial intelligence?', 
 '["Computer hardware", "Machines that can think and learn", "Internet technology", "Database management"]',
 1, 'beginner', 'AI involves creating machines that can perform tasks typically requiring human intelligence.'),

('5403dbd3-05a3-4639-b2c7-a695378e6271', 'What is a neural network?', 
 '["A computer network", "A brain scanning device", "A computational model inspired by biological neural networks", "A type of database"]',
 2, 'beginner', 'Neural networks are computational models inspired by the way biological neural networks work.'),

('5403dbd3-05a3-4639-b2c7-a695378e6271', 'What is deep learning?', 
 '["Learning underwater", "A subset of ML with neural networks having multiple layers", "Fast learning", "Surface learning"]',
 1, 'intermediate', 'Deep learning uses neural networks with multiple hidden layers to learn complex patterns.'),

('5403dbd3-05a3-4639-b2c7-a695378e6271', 'What is the vanishing gradient problem?', 
 '["Gradients become too small during backpropagation", "Gradients disappear completely", "Training becomes too fast", "Memory issues"]',
 0, 'hard', 'Vanishing gradient problem occurs when gradients become exponentially small as they propagate back through layers.');