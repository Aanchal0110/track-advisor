-- Add comprehensive quiz questions for multiple tracks
-- First, let's get track IDs for reference
DO $$
DECLARE
    data_analytics_track_id UUID;
    ml_ai_track_id UUID;
    web_dev_track_id UUID;
    cybersecurity_track_id UUID;
BEGIN
    -- Get track IDs
    SELECT id INTO data_analytics_track_id FROM tracks WHERE track_name ILIKE '%data analytics%' LIMIT 1;
    SELECT id INTO ml_ai_track_id FROM tracks WHERE track_name ILIKE '%machine learning%' OR track_name ILIKE '%ai%' LIMIT 1;
    SELECT id INTO web_dev_track_id FROM tracks WHERE track_name ILIKE '%web development%' OR track_name ILIKE '%web dev%' LIMIT 1;
    SELECT id INTO cybersecurity_track_id FROM tracks WHERE track_name ILIKE '%cybersecurity%' OR track_name ILIKE '%cyber%' LIMIT 1;

    -- Add comprehensive quiz questions for Data Analytics
    IF data_analytics_track_id IS NOT NULL THEN
        -- Beginner questions (need at least 8 more for good distribution)
        INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
        (data_analytics_track_id, 'What is the primary purpose of data cleaning?', '["To make data look pretty", "To remove or correct inaccurate data", "To increase data volume", "To create visualizations"]', 1, 'beginner', 'Data cleaning involves identifying and correcting errors, removing duplicates, and handling missing values to ensure data quality.'),
        (data_analytics_track_id, 'Which of these is a common data visualization tool?', '["Microsoft Word", "Tableau", "Adobe Photoshop", "VLC Player"]', 1, 'beginner', 'Tableau is a leading data visualization platform used for creating interactive dashboards and reports.'),
        (data_analytics_track_id, 'What does CSV stand for?', '["Computer System Values", "Comma Separated Values", "Central Storage Vault", "Code Syntax Validation"]', 1, 'beginner', 'CSV (Comma Separated Values) is a common file format for storing tabular data.'),
        (data_analytics_track_id, 'What is a database?', '["A collection of programs", "A structured collection of data", "A type of computer", "A network protocol"]', 1, 'beginner', 'A database is an organized collection of structured information stored electronically in a computer system.'),
        (data_analytics_track_id, 'Which chart type is best for showing trends over time?', '["Pie chart", "Bar chart", "Line chart", "Scatter plot"]', 2, 'beginner', 'Line charts are ideal for displaying data trends and changes over continuous periods.'),
        (data_analytics_track_id, 'What is the mean of these numbers: 2, 4, 6, 8?', '["4", "5", "6", "7"]', 1, 'beginner', 'The mean (average) is calculated by adding all values (2+4+6+8=20) and dividing by the count (4), resulting in 5.'),
        (data_analytics_track_id, 'What does SQL stand for?', '["System Query Language", "Structured Query Language", "Simple Question Logic", "Standard Quality Level"]', 1, 'beginner', 'SQL (Structured Query Language) is the standard language for managing and querying relational databases.'),
        (data_analytics_track_id, 'What is the purpose of data analysis?', '["To collect more data", "To extract insights and make decisions", "To create databases", "To design websites"]', 1, 'beginner', 'Data analysis involves examining data to discover patterns, trends, and insights that support decision-making.');

        -- Intermediate questions (need at least 5 more)
        INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
        (data_analytics_track_id, 'What is the difference between correlation and causation?', '["They are the same thing", "Correlation implies causation", "Correlation shows relationship, causation shows cause-effect", "Causation is stronger than correlation"]', 2, 'intermediate', 'Correlation indicates a statistical relationship between variables, while causation means one variable directly causes changes in another.'),
        (data_analytics_track_id, 'Which statistical measure is most resistant to outliers?', '["Mean", "Median", "Mode", "Range"]', 1, 'intermediate', 'The median is less affected by extreme values (outliers) compared to the mean, making it a robust measure of central tendency.'),
        (data_analytics_track_id, 'What is a p-value in statistical testing?', '["The probability of the hypothesis being true", "The probability of observing results given null hypothesis is true", "The percentage of variance explained", "The correlation coefficient"]', 1, 'intermediate', 'A p-value represents the probability of obtaining test results at least as extreme as observed, assuming the null hypothesis is true.'),
        (data_analytics_track_id, 'What is the purpose of data normalization?', '["To increase data size", "To standardize data scales and distributions", "To remove all data", "To create backups"]', 1, 'intermediate', 'Data normalization scales numeric data to a common range, preventing variables with larger scales from dominating analysis.'),
        (data_analytics_track_id, 'Which sampling method ensures every member has equal chance of selection?', '["Convenience sampling", "Purposive sampling", "Simple random sampling", "Snowball sampling"]', 2, 'intermediate', 'Simple random sampling gives each member of the population an equal probability of being selected, reducing sampling bias.');

        -- Hard questions (need at least 5 more)
        INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
        (data_analytics_track_id, 'What is the Central Limit Theorem?', '["All data follows normal distribution", "Sample means approach normal distribution as sample size increases", "Central values are most important", "Limits must be centrally defined"]', 1, 'hard', 'The Central Limit Theorem states that sample means will be approximately normally distributed regardless of the population distribution, given sufficient sample size.'),
        (data_analytics_track_id, 'Which technique is used for dimensionality reduction?', '["Linear regression", "Principal Component Analysis", "Decision trees", "K-means clustering"]', 1, 'hard', 'PCA (Principal Component Analysis) reduces the number of variables while preserving most of the variation in the data.'),
        (data_analytics_track_id, 'What is heteroscedasticity in regression analysis?', '["Equal variance of residuals", "Unequal variance of residuals", "Linear relationship", "Normal distribution of errors"]', 1, 'hard', 'Heteroscedasticity occurs when the variance of residuals is not constant across all levels of independent variables, violating regression assumptions.'),
        (data_analytics_track_id, 'What is the purpose of cross-validation?', '["To validate data entry", "To assess model performance on unseen data", "To cross-reference datasets", "To validate hypotheses"]', 1, 'hard', 'Cross-validation evaluates how well a statistical model generalizes to independent datasets by partitioning data into training and testing sets.'),
        (data_analytics_track_id, 'What is multicollinearity?', '["Multiple datasets", "High correlation between independent variables", "Multiple dependent variables", "Complex calculations"]', 1, 'hard', 'Multicollinearity occurs when independent variables in a regression model are highly correlated, making it difficult to determine individual variable effects.');
    END IF;

    -- Add comprehensive quiz questions for ML & AI
    IF ml_ai_track_id IS NOT NULL THEN
        -- Beginner questions
        INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
        (ml_ai_track_id, 'What is artificial intelligence?', '["A type of computer hardware", "Computer systems that can perform human-like tasks", "A programming language", "A database system"]', 1, 'beginner', 'AI refers to computer systems designed to perform tasks that typically require human intelligence, such as learning and problem-solving.'),
        (ml_ai_track_id, 'What is machine learning?', '["A way to teach computers manually", "A subset of AI that learns from data", "A type of computer memory", "A programming paradigm"]', 1, 'beginner', 'Machine learning is a subset of AI that enables computers to learn and improve from data without being explicitly programmed.'),
        (ml_ai_track_id, 'Which of these is a popular programming language for AI?', '["HTML", "Python", "CSS", "SQL"]', 1, 'beginner', 'Python is widely used in AI and machine learning due to its extensive libraries and ease of use.'),
        (ml_ai_track_id, 'What is training data?', '["Data used to test final model", "Data used to teach the model", "Data used for visualization", "Data used for storage"]', 1, 'beginner', 'Training data is the dataset used to teach machine learning algorithms to make predictions or classifications.'),
        (ml_ai_track_id, 'What is supervised learning?', '["Learning without any guidance", "Learning with labeled examples", "Learning from unlabeled data", "Learning through reinforcement"]', 1, 'beginner', 'Supervised learning uses labeled training data to learn the mapping between inputs and desired outputs.');

        -- Intermediate questions
        INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
        (ml_ai_track_id, 'What is overfitting in machine learning?', '["Model performs poorly on all data", "Model memorizes training data but fails on new data", "Model is too simple", "Model trains too quickly"]', 1, 'intermediate', 'Overfitting occurs when a model learns the training data too well, including noise, leading to poor performance on new, unseen data.'),
        (ml_ai_track_id, 'What is the purpose of a validation set?', '["To clean the data", "To tune model hyperparameters", "To visualize results", "To store final predictions"]', 1, 'intermediate', 'A validation set is used to evaluate and tune model performance during training, helping to select optimal hyperparameters.'),
        (ml_ai_track_id, 'Which algorithm is commonly used for classification?', '["Linear regression", "Decision trees", "K-means clustering", "PCA"]', 1, 'intermediate', 'Decision trees are popular classification algorithms that make predictions by splitting data based on feature values.'),
        (ml_ai_track_id, 'What is feature engineering?', '["Creating new hardware features", "Selecting and transforming input variables", "Engineering software features", "Designing user interfaces"]', 1, 'intermediate', 'Feature engineering involves selecting, modifying, or creating input variables to improve model performance.');

        -- Hard questions
        INSERT INTO quiz_questions (track_id, question_text, options, correct_answer, difficulty, explanation) VALUES
        (ml_ai_track_id, 'What is the vanishing gradient problem?', '["Gradients become too large", "Gradients become too small in deep networks", "Gradients disappear completely", "Gradients oscillate wildly"]', 1, 'hard', 'The vanishing gradient problem occurs in deep neural networks where gradients become exponentially smaller in earlier layers, making training difficult.'),
        (ml_ai_track_id, 'What is the difference between bagging and boosting?', '["They are the same technique", "Bagging trains models in parallel, boosting in sequence", "Bagging is for regression, boosting for classification", "Bagging uses decision trees, boosting uses neural networks"]', 1, 'hard', 'Bagging trains multiple models independently in parallel, while boosting trains models sequentially, with each model learning from previous mistakes.'),
        (ml_ai_track_id, 'What is the purpose of regularization?', '["To make models more complex", "To prevent overfitting by adding penalty terms", "To speed up training", "To visualize data better"]', 1, 'hard', 'Regularization adds penalty terms to the loss function to prevent overfitting by constraining model complexity.');
    END IF;

    -- Update subjects with comprehensive learning resources
    UPDATE subjects SET resources = jsonb_build_object(
        'beginner', jsonb_build_object(
            'videos', ARRAY[
                'Introduction to ' || subject_name || ' Fundamentals',
                'Getting Started with ' || subject_name || ' Basics',
                subject_name || ' for Complete Beginners',
                'Essential ' || subject_name || ' Concepts Explained',
                'First Steps in ' || subject_name || ' Learning',
                'Understanding ' || subject_name || ' Principles',
                subject_name || ' Basics Made Simple',
                'Beginner''s Guide to ' || subject_name,
                'Core ' || subject_name || ' Fundamentals',
                'Introduction to ' || subject_name || ' Theory',
                subject_name || ' Overview for Beginners',
                'Basic ' || subject_name || ' Techniques',
                'Foundational ' || subject_name || ' Concepts',
                subject_name || ' Fundamentals Tutorial',
                'Starting Your ' || subject_name || ' Journey'
            ],
            'books', ARRAY[
                subject_name || ' for Dummies',
                'Head First ' || subject_name,
                'Learning ' || subject_name || ' the Easy Way',
                subject_name || ' Fundamentals Handbook',
                'Introduction to ' || subject_name || ': A Beginner''s Guide',
                'The Complete Beginner''s Guide to ' || subject_name,
                subject_name || ' Made Simple',
                'Getting Started with ' || subject_name,
                'Essential ' || subject_name || ' for Beginners',
                'The ' || subject_name || ' Primer',
                subject_name || ' Basics Explained',
                'First Steps in ' || subject_name,
                'Understanding ' || subject_name || ' Fundamentals',
                'The Beginner''s ' || subject_name || ' Bible',
                subject_name || ' 101: A Complete Introduction'
            ],
            'references', ARRAY[
                'Official ' || subject_name || ' Documentation',
                subject_name || ' Quick Reference Guide',
                'Basic ' || subject_name || ' Cheat Sheet',
                subject_name || ' Terminology Glossary',
                'Fundamental ' || subject_name || ' Concepts Reference',
                subject_name || ' Best Practices for Beginners',
                'Essential ' || subject_name || ' Resources List',
                subject_name || ' Learning Path Guide',
                'Beginner ' || subject_name || ' FAQ',
                subject_name || ' Getting Started Checklist',
                'Common ' || subject_name || ' Mistakes to Avoid',
                subject_name || ' Tools and Software Guide',
                'Basic ' || subject_name || ' Examples Collection',
                subject_name || ' Community Forums and Support',
                'Introductory ' || subject_name || ' Case Studies'
            ]
        ),
        'intermediate', jsonb_build_object(
            'videos', ARRAY[
                'Advanced ' || subject_name || ' Techniques',
                'Intermediate ' || subject_name || ' Concepts',
                subject_name || ' Best Practices and Patterns',
                'Real-world ' || subject_name || ' Applications',
                'Mastering ' || subject_name || ' Fundamentals',
                'Practical ' || subject_name || ' Implementation',
                subject_name || ' Case Studies and Examples',
                'Intermediate ' || subject_name || ' Projects',
                'Advanced ' || subject_name || ' Theory',
                subject_name || ' Performance Optimization',
                'Professional ' || subject_name || ' Techniques',
                'Scaling ' || subject_name || ' Solutions',
                'Industry-standard ' || subject_name || ' Practices',
                'Complex ' || subject_name || ' Problem Solving',
                'Intermediate ' || subject_name || ' Mastery'
            ],
            'books', ARRAY[
                'Professional ' || subject_name || ' Development',
                'Advanced ' || subject_name || ' Programming',
                'Mastering ' || subject_name || ' Design Patterns',
                subject_name || ' in Practice',
                'The Art of ' || subject_name,
                'Effective ' || subject_name || ' Techniques',
                'Professional ' || subject_name || ' Best Practices',
                'Advanced ' || subject_name || ' Architecture',
                subject_name || ' Design Principles',
                'Practical ' || subject_name || ' Solutions',
                'Professional ' || subject_name || ' Handbook',
                'Advanced ' || subject_name || ' Concepts',
                subject_name || ' Performance and Scalability',
                'Real-world ' || subject_name || ' Applications',
                'Intermediate ' || subject_name || ' Mastery Guide'
            ],
            'references', ARRAY[
                'Advanced ' || subject_name || ' API Reference',
                subject_name || ' Design Patterns Catalog',
                'Professional ' || subject_name || ' Standards',
                subject_name || ' Performance Benchmarks',
                'Industry ' || subject_name || ' Best Practices',
                'Advanced ' || subject_name || ' Configuration Guide',
                subject_name || ' Security Guidelines',
                'Professional ' || subject_name || ' Tools Reference',
                subject_name || ' Testing and Quality Assurance',
                'Advanced ' || subject_name || ' Troubleshooting',
                subject_name || ' Integration Patterns',
                'Professional ' || subject_name || ' Workflows',
                subject_name || ' Code Review Guidelines',
                'Advanced ' || subject_name || ' Optimization Techniques',
                subject_name || ' Industry Case Studies'
            ]
        ),
        'hard', jsonb_build_object(
            'videos', ARRAY[
                'Expert-level ' || subject_name || ' Techniques',
                'Advanced ' || subject_name || ' Architecture',
                'Cutting-edge ' || subject_name || ' Research',
                'Expert ' || subject_name || ' Masterclass',
                'Advanced ' || subject_name || ' System Design',
                'Expert ' || subject_name || ' Problem Solving',
                'High-performance ' || subject_name || ' Solutions',
                'Advanced ' || subject_name || ' Optimization',
                'Expert-level ' || subject_name || ' Projects',
                'Bleeding-edge ' || subject_name || ' Innovations',
                'Advanced ' || subject_name || ' Algorithms',
                'Expert ' || subject_name || ' Design Patterns',
                'Advanced ' || subject_name || ' Security',
                'Expert-level ' || subject_name || ' Debugging',
                'Master-class ' || subject_name || ' Implementation'
            ],
            'books', ARRAY[
                'Expert ' || subject_name || ' Techniques',
                'Advanced ' || subject_name || ' Mastery',
                'The Complete ' || subject_name || ' Expert Guide',
                'Professional ' || subject_name || ' Architecture',
                'Advanced ' || subject_name || ' System Design',
                'Expert-level ' || subject_name || ' Programming',
                'Mastering Advanced ' || subject_name,
                'The ' || subject_name || ' Expert''s Handbook',
                'Advanced ' || subject_name || ' Algorithms',
                'Expert ' || subject_name || ' Problem Solving',
                'Professional ' || subject_name || ' Mastery',
                'Advanced ' || subject_name || ' Implementation',
                'The Art of Advanced ' || subject_name,
                'Expert-level ' || subject_name || ' Design',
                'Mastering ' || subject_name || ' at Scale'
            ],
            'references', ARRAY[
                'Expert ' || subject_name || ' Technical Specifications',
                'Advanced ' || subject_name || ' Research Papers',
                'Expert-level ' || subject_name || ' White Papers',
                'Advanced ' || subject_name || ' RFC Documents',
                'Expert ' || subject_name || ' Architecture Guidelines',
                'Advanced ' || subject_name || ' Performance Studies',
                'Expert-level ' || subject_name || ' Security Analysis',
                'Advanced ' || subject_name || ' Benchmarking Studies',
                'Expert ' || subject_name || ' Implementation Guides',
                'Advanced ' || subject_name || ' Research Findings',
                'Expert-level ' || subject_name || ' Case Studies',
                'Advanced ' || subject_name || ' Technical Standards',
                'Expert ' || subject_name || ' Innovation Papers',
                'Advanced ' || subject_name || ' Scalability Studies',
                'Expert-level ' || subject_name || ' Future Trends'
            ]
        )
    ) WHERE TRUE;

END $$;