-- Update subjects with valid educational resource URLs
UPDATE subjects SET resources = jsonb_build_object(
  'beginner', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=HXV3zeQKqGY',
      'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      'https://www.youtube.com/watch?v=KBDSP6560SM'
    ],
    'books', ARRAY[
      'https://www.w3schools.com/sql/',
      'https://sqlbolt.com/',
      'https://www.codecademy.com/learn/learn-sql'
    ],
    'references', ARRAY[
      'https://dev.mysql.com/doc/',
      'https://www.postgresql.org/docs/',
      'https://sqlite.org/docs.html'
    ]
  ),
  'intermediate', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=M-55BmjOuXY',
      'https://www.youtube.com/watch?v=2bCP3wSa52U',
      'https://www.youtube.com/watch?v=QwievZ1Tx_8'
    ],
    'books', ARRAY[
      'https://use-the-index-luke.com/',
      'https://www.red-gate.com/simple-talk/sql/',
      'https://sqlperformanceexplained.com/'
    ],
    'references', ARRAY[
      'https://docs.microsoft.com/en-us/sql/',
      'https://mariadb.com/kb/en/documentation/',
      'https://www.oracle.com/database/technologies/appdev/sql.html'
    ]
  ),
  'hard', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=N5TGHh85hsA',
      'https://www.youtube.com/watch?v=qfyynHBFOsM',
      'https://www.youtube.com/watch?v=oebtXK16WuU'
    ],
    'books', ARRAY[
      'https://www.manning.com/books/sql-in-action',
      'https://pragprog.com/titles/bksqla/sql-antipatterns/',
      'https://www.oreilly.com/library/view/high-performance-mysql/9780596101718/'
    ],
    'references', ARRAY[
      'https://modern-sql.com/',
      'https://sql-performance-explained.com/de/select/',
      'https://sqlstyle.guide/'
    ]
  )
) WHERE subject_name = 'SQL';

UPDATE subjects SET resources = jsonb_build_object(
  'beginner', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=aircAruvnKk',
      'https://www.youtube.com/watch?v=CqOfi41LfDw',
      'https://www.youtube.com/watch?v=i_LwzRVP7bg'
    ],
    'books', ARRAY[
      'https://machinelearningmastery.com/start-here/',
      'https://www.coursera.org/learn/machine-learning',
      'https://www.kaggle.com/learn'
    ],
    'references', ARRAY[
      'https://scikit-learn.org/stable/user_guide.html',
      'https://pandas.pydata.org/docs/',
      'https://numpy.org/doc/'
    ]
  ),
  'intermediate', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=tPYj3fFJGjk',
      'https://www.youtube.com/watch?v=fMqL5vckiU0',
      'https://www.youtube.com/watch?v=8HyCNIVRbSU'
    ],
    'books', ARRAY[
      'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
      'https://web.stanford.edu/~hastie/Papers/ESLII.pdf',
      'https://www.statlearning.com/'
    ],
    'references', ARRAY[
      'https://tensorflow.org/guide',
      'https://pytorch.org/tutorials/',
      'https://keras.io/guides/'
    ]
  ),
  'hard', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=S75EdAcXHKk',
      'https://www.youtube.com/watch?v=h0e2HAPTGF4',
      'https://www.youtube.com/watch?v=oPp9HcZrBB8'
    ],
    'books', ARRAY[
      'https://www.deeplearningbook.org/',
      'https://arxiv.org/abs/1909.01066',
      'https://papers.nips.cc/'
    ],
    'references', ARRAY[
      'https://distill.pub/',
      'https://openai.com/research/',
      'https://research.google/research-areas/machine-intelligence/'
    ]
  )
) WHERE subject_name IN ('Machine Learning', 'Deep Learning', 'Natural Language Processing');

UPDATE subjects SET resources = jsonb_build_object(
  'beginner', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
      'https://www.youtube.com/watch?v=1mHjMNZZvFo',
      'https://www.youtube.com/watch?v=Y9lzNd7Susw'
    ],
    'books', ARRAY[
      'https://pandas.pydata.org/docs/getting_started/intro_tutorials/',
      'https://www.datacamp.com/tutorial/pandas-tutorial-dataframe-python',
      'https://www.kaggle.com/learn/pandas'
    ],
    'references', ARRAY[
      'https://matplotlib.org/stable/tutorials/index.html',
      'https://seaborn.pydata.org/tutorial.html',
      'https://plotly.com/python/getting-started/'
    ]
  ),
  'intermediate', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=a9UrKTVEeZA',
      'https://www.youtube.com/watch?v=r-uHLPtOGd0',
      'https://www.youtube.com/watch?v=yQsOFWqpjkE'
    ],
    'books', ARRAY[
      'https://www.oreilly.com/library/view/python-for-data/9781491957653/',
      'https://wesmckinney.com/book/',
      'https://jakevdp.github.io/PythonDataScienceHandbook/'
    ],
    'references', ARRAY[
      'https://spark.apache.org/docs/latest/',
      'https://hadoop.apache.org/docs/',
      'https://kafka.apache.org/documentation/'
    ]
  ),
  'hard', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=MfIoAG3E9eY',
      'https://www.youtube.com/watch?v=v6IJEDtxKVc',
      'https://www.youtube.com/watch?v=BfowBFi78R8'
    ],
    'books', ARRAY[
      'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      'https://www.databricks.com/resources/ebook/big-data-analytics',
      'https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf'
    ],
    'references', ARRAY[
      'https://aws.amazon.com/big-data/what-is-big-data/',
      'https://cloud.google.com/bigquery/docs',
      'https://docs.microsoft.com/en-us/azure/synapse-analytics/'
    ]
  )
) WHERE subject_name IN ('Data Warehouse and Data Mining', 'Big Data Analytics');

UPDATE subjects SET resources = jsonb_build_object(
  'beginner', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=bHvf7Tagt18',
      'https://www.youtube.com/watch?v=9Y3yaoi9rUQ',
      'https://www.youtube.com/watch?v=ul_G2_OiIpQ'
    ],
    'books', ARRAY[
      'https://learn.digilentinc.com/Documents/280',
      'https://www.allaboutcircuits.com/textbook/digital/',
      'https://www.electronics-tutorials.ws/logic/logic_1.html'
    ],
    'references', ARRAY[
      'https://www.ti.com/lit/an/scaa003b/scaa003b.pdf',
      'https://www.xilinx.com/support/documentation.html',
      'https://www.intel.com/content/www/us/en/programmable/documentation.html'
    ]
  ),
  'intermediate', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=LnhvhFVoqBc',
      'https://www.youtube.com/watch?v=eP_baVOYjn4',
      'https://www.youtube.com/watch?v=p0229Ea8oYw'
    ],
    'books', ARRAY[
      'https://www.oreilly.com/library/view/digital-design-and/9780133763034/',
      'https://www.pearson.com/us/higher-education/program/Wakerly-Digital-Design-Principles-and-Practices-5th-Edition/PGM271502.html',
      'https://www.mheducation.com/highered/product/digital-logic-computer-design-mano-ciletti/M9780131989269.html'
    ],
    'references', ARRAY[
      'https://www.cadence.com/en_US/home/tools/digital-design-and-signoff.html',
      'https://www.synopsys.com/implementation-and-signoff.html',
      'https://www.mentor.com/products/ic_nanometer_design'
    ]
  ),
  'hard', jsonb_build_object(
    'videos', ARRAY[
      'https://www.youtube.com/watch?v=TAIIe6OgMdI',
      'https://www.youtube.com/watch?v=0MwSz8SBuYU',
      'https://www.youtube.com/watch?v=VflVZQzPuzY'
    ],
    'books', ARRAY[
      'https://www.springer.com/gp/book/9783030127565',
      'https://ieeexplore.ieee.org/book/8515059',
      'https://www.cambridge.org/core/books/cmos-vlsi-design/250C0369D98EC87D3C04B7CAAFCF6044'
    ],
    'references', ARRAY[
      'https://www.ieee.org/content/dam/ieee-org/ieee/web/org/pubs/transactions.html',
      'https://www.nature.com/natelectron/',
      'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4'
    ]
  )
) WHERE subject_name IN ('Digital System Design', 'Advanced VLSI');

-- Create feedback system table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  track_id UUID,
  quiz_result_id UUID,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  satisfaction_level TEXT NOT NULL CHECK (satisfaction_level IN ('very_unsatisfied', 'unsatisfied', 'neutral', 'satisfied', 'very_satisfied')),
  feedback_text TEXT,
  would_recommend BOOLEAN DEFAULT false,
  improvement_suggestions TEXT,
  track_usefulness INTEGER CHECK (track_usefulness >= 1 AND track_usefulness <= 5),
  quiz_helpfulness INTEGER CHECK (quiz_helpfulness >= 1 AND quiz_helpfulness <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on feedback table
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for feedback
CREATE POLICY "Users can create their own feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own feedback" 
ON public.feedback 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own feedback" 
ON public.feedback 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_feedback_updated_at
BEFORE UPDATE ON public.feedback
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();