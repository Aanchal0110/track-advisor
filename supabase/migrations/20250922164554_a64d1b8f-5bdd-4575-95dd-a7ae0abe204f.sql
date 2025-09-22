-- Populate subject data table with comprehensive learning data
INSERT INTO "subject data" (id) VALUES 
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
(11), (12), (13), (14), (15), (16), (17), (18), (19), (20),
(21), (22), (23), (24), (25), (26), (27), (28), (29), (30);

-- Add comprehensive course data for all tracks
-- Data Analytics Track Subjects
INSERT INTO subjects (track_id, subject_name, subject_desc, semester, resources) VALUES 
-- Get track ID for data analytics first, then add subjects
((SELECT id FROM tracks WHERE track_name = 'Data Analytics' LIMIT 1), 'Statistics & Probability', 'Fundamental statistical concepts and probability theory for data analysis', 1, '{
  "beginner": {
    "books": ["https://www.khanacademy.org/math/statistics-probability", "https://www.coursera.org/learn/basic-statistics", "https://www.edx.org/course/introduction-to-statistics"],
    "videos": ["https://www.youtube.com/watch?v=uhxtUt_-GyM", "https://www.youtube.com/watch?v=MdHtK7CWpCQ", "https://www.youtube.com/watch?v=sxQaBpKfDRk"],
    "references": ["https://www.statista.com/statistics-guides/", "https://stattrek.com/", "https://www.statisticshowto.com/"]
  },
  "intermediate": {
    "books": ["https://www.amazon.com/Statistics-Business-Economics-Paul-Newbold/dp/0134506593", "https://www.pearson.com/us/higher-education/program/Triola-Elementary-Statistics-13th-Edition/PGM334239.html"],
    "videos": ["https://www.youtube.com/watch?v=XcvgmesEpQs", "https://www.youtube.com/watch?v=OyddY7DlV58"],
    "references": ["https://www.stata.com/manuals/", "https://www.r-project.org/other-docs.html"]
  },
  "hard": {
    "books": ["https://www.amazon.com/Mathematical-Statistics-Data-Analysis-Duxbury/dp/0534399428", "https://www.amazon.com/Introduction-Statistical-Learning-Applications-Statistics/dp/1461471370"],
    "videos": ["https://www.youtube.com/watch?v=5NMxiOGL39M", "https://www.youtube.com/watch?v=ey2PE5xi9-A"],
    "references": ["https://web.stanford.edu/~hastie/ElemStatLearn/", "https://faculty.marshall.usc.edu/gareth-james/ISL/"]
  }
}'),

((SELECT id FROM tracks WHERE track_name = 'Data Analytics' LIMIT 1), 'Python Programming', 'Python programming language for data science and analytics', 1, '{
  "beginner": {
    "books": ["https://www.python.org/about/gettingstarted/", "https://www.codecademy.com/learn/learn-python-3", "https://www.freecodecamp.org/learn/scientific-computing-with-python/"],
    "videos": ["https://www.youtube.com/watch?v=rfscVS0vtbw", "https://www.youtube.com/watch?v=kqtD5dpn9C8", "https://www.youtube.com/watch?v=_uQrJ0TkZlc"],
    "references": ["https://docs.python.org/3/tutorial/", "https://realpython.com/", "https://automatetheboringstuff.com/"]
  },
  "intermediate": {
    "books": ["https://pandas.pydata.org/docs/getting_started/index.html", "https://numpy.org/learn/", "https://matplotlib.org/stable/tutorials/index.html"],
    "videos": ["https://www.youtube.com/watch?v=vmEHCJofslg", "https://www.youtube.com/watch?v=ZyhVh-qRZPA"],
    "references": ["https://scikit-learn.org/stable/user_guide.html", "https://seaborn.pydata.org/tutorial.html"]
  },
  "hard": {
    "books": ["https://www.oreilly.com/library/view/python-for-data/9781491957653/", "https://www.amazon.com/Python-Data-Science-Handbook-Essential/dp/1491912057"],
    "videos": ["https://www.youtube.com/watch?v=1F_OgqRuSdI", "https://www.youtube.com/watch?v=5b5eWf5VJl4"],
    "references": ["https://jakevdp.github.io/PythonDataScienceHandbook/", "https://github.com/donnemartin/data-science-ipython-notebooks"]
  }
}');

-- Add more subjects for AI/ML track
INSERT INTO subjects (track_id, subject_name, subject_desc, semester, resources) VALUES 
((SELECT id FROM tracks WHERE track_name = 'Machine Learning & AI' LIMIT 1), 'Machine Learning Fundamentals', 'Core machine learning algorithms and techniques', 2, '{
  "beginner": {
    "books": ["https://www.coursera.org/learn/machine-learning", "https://www.edx.org/course/introduction-to-machine-learning", "https://www.udacity.com/course/intro-to-machine-learning--ud120"],
    "videos": ["https://www.youtube.com/watch?v=aircAruvnKk", "https://www.youtube.com/watch?v=CqOfi41LfDw", "https://www.youtube.com/watch?v=i_LwzRVP7bg"],
    "references": ["https://scikit-learn.org/stable/user_guide.html", "https://ml-cheatsheet.readthedocs.io/", "https://machinelearningmastery.com/"]
  },
  "intermediate": {
    "books": ["https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646", "https://www.amazon.com/Pattern-Recognition-Machine-Learning-Information/dp/0387310738"],
    "videos": ["https://www.youtube.com/watch?v=PPLop4L2eGk", "https://www.youtube.com/watch?v=1FZ0A1QCMWc"],
    "references": ["https://www.tensorflow.org/tutorials", "https://pytorch.org/tutorials/"]
  },
  "hard": {
    "books": ["https://www.amazon.com/Elements-Statistical-Learning-Prediction-Statistics/dp/0387848576", "https://www.amazon.com/Deep-Learning-Ian-Goodfellow/dp/0262035618"],
    "videos": ["https://www.youtube.com/watch?v=jGwO_UgTS7I", "https://www.youtube.com/watch?v=PlhFWT7vAEw"],
    "references": ["https://web.stanford.edu/~hastie/ElemStatLearn/", "https://www.deeplearningbook.org/"]
  }
}'),

((SELECT id FROM tracks WHERE track_name = 'Machine Learning & AI' LIMIT 1), 'Deep Learning', 'Neural networks and deep learning architectures', 3, '{
  "beginner": {
    "books": ["https://www.deeplearning.ai/courses/deep-learning-specialization/", "https://www.udacity.com/course/deep-learning-nanodegree--nd101", "https://www.coursera.org/specializations/deep-learning"],
    "videos": ["https://www.youtube.com/watch?v=CS4cs9xVecg", "https://www.youtube.com/watch?v=tPYj3fFJGjk", "https://www.youtube.com/watch?v=H-ybCx8gt-8"],
    "references": ["https://keras.io/guides/", "https://www.tensorflow.org/guide", "https://pytorch.org/docs/stable/index.html"]
  },
  "intermediate": {
    "books": ["https://www.manning.com/books/deep-learning-with-python", "https://www.amazon.com/Deep-Learning-Adaptive-Computation-Machine/dp/0262035618"],
    "videos": ["https://www.youtube.com/watch?v=vT1JzLTH4G4", "https://www.youtube.com/watch?v=KaR4lIdI1MQ"],
    "references": ["https://d2l.ai/", "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html"]
  },
  "hard": {
    "books": ["https://www.amazon.com/Deep-Learning-Ian-Goodfellow/dp/0262035618", "https://www.amazon.com/Dive-into-Deep-Learning/dp/B08N9GKBSG"],
    "videos": ["https://www.youtube.com/watch?v=Z6rxFNMGdn0", "https://www.youtube.com/watch?v=HcStlHGpjN8"],
    "references": ["https://arxiv.org/list/cs.LG/recent", "https://distill.pub/", "https://openai.com/research/"]
  }
}');

-- Add IoT subjects
INSERT INTO subjects (track_id, subject_name, subject_desc, semester, resources) VALUES 
((SELECT id FROM tracks WHERE track_name = 'Internet of Things (IoT)' LIMIT 1), 'Embedded Systems Programming', 'Programming microcontrollers and embedded devices', 2, '{
  "beginner": {
    "books": ["https://www.arduino.cc/en/Tutorial/HomePage", "https://www.raspberrypi.org/documentation/", "https://www.edx.org/course/introduction-to-embedded-systems"],
    "videos": ["https://www.youtube.com/watch?v=fJWR7dBuc18", "https://www.youtube.com/watch?v=09zfRaLEasY", "https://www.youtube.com/watch?v=7vhvnaWUZjE"],
    "references": ["https://docs.arduino.cc/", "https://www.raspberrypi.org/documentation/", "https://www.espressif.com/en/support/documents/technical-documents"]
  },
  "intermediate": {
    "books": ["https://www.amazon.com/Programming-Embedded-Systems-C/dp/1565923545", "https://www.amazon.com/Making-Embedded-Systems-Patterns-Software/dp/1449302149"],
    "videos": ["https://www.youtube.com/watch?v=3V9eqvkMzHA", "https://www.youtube.com/watch?v=EBSINhyODLY"],
    "references": ["https://www.st.com/resource/en/user_manual/", "https://www.microchip.com/design-centers/embedded-systems"]
  },
  "hard": {
    "books": ["https://www.amazon.com/Real-Time-Embedded-Systems-Open-Source/dp/0128015071", "https://www.amazon.com/Advanced-Embedded-Systems-Patrick-Schaumont/dp/1461403383"],
    "videos": ["https://www.youtube.com/watch?v=W4Q2-kDSj_U", "https://www.youtube.com/watch?v=QSFlPjYMXws"],
    "references": ["https://www.freertos.org/Documentation/RTOS_book.html", "https://zephyrproject.org/documentation/"]
  }
}'),

((SELECT id FROM tracks WHERE track_name = 'Internet of Things (IoT)' LIMIT 1), 'Sensor Technology', 'Understanding and implementing various sensors for IoT applications', 2, '{
  "beginner": {
    "books": ["https://learn.sparkfun.com/tutorials/", "https://www.adafruit.com/category/35", "https://www.coursera.org/learn/iot-sensors"],
    "videos": ["https://www.youtube.com/watch?v=6WRySz-ZBTc", "https://www.youtube.com/watch?v=y6rdwrN9_4w", "https://www.youtube.com/watch?v=lEoBBfBr6bg"],
    "references": ["https://learn.adafruit.com/", "https://randomnerdtutorials.com/", "https://lastminuteengineers.com/"]
  },
  "intermediate": {
    "books": ["https://www.amazon.com/Sensors-Handbook-Second-Edition/dp/007147506X", "https://www.amazon.com/IoT-Fundamentals-Networking-Technologies-Protocols/dp/1587144565"],
    "videos": ["https://www.youtube.com/watch?v=QSREnUCeZXE", "https://www.youtube.com/watch?v=WxJKXGugfh8"],
    "references": ["https://www.bosch-sensortec.com/software-tools/", "https://invensense.tdk.com/developers/"]
  },
  "hard": {
    "books": ["https://www.amazon.com/Handbook-Modern-Sensors-Physics-Applications/dp/1441964665", "https://www.amazon.com/Industrial-Sensors-Measurement-Systems/dp/0750657178"],
    "videos": ["https://www.youtube.com/watch?v=N3AR8-CJKJs", "https://www.youtube.com/watch?v=M8YBr3mq4sM"],
    "references": ["https://www.analog.com/en/design-center/", "https://www.ti.com/sensors/overview.html"]
  }
}');

-- Add VLSI subjects
INSERT INTO subjects (track_id, subject_name, subject_desc, semester, resources) VALUES 
((SELECT id FROM tracks WHERE track_name = 'VLSI Design' LIMIT 1), 'Digital System Design', 'Fundamentals of digital circuit design and implementation', 3, '{
  "beginner": {
    "books": ["https://www.coursera.org/learn/digital-systems", "https://www.edx.org/course/digital-circuits-design", "https://nptel.ac.in/courses/108/106/108106165/"],
    "videos": ["https://www.youtube.com/watch?v=M0Ox33QaRAc", "https://www.youtube.com/watch?v=gI-qXk7XojA", "https://www.youtube.com/watch?v=VPw9vPN-3ac"],
    "references": ["https://www.allaboutcircuits.com/textbook/digital/", "https://www.electronics-tutorials.ws/logic/", "https://www.tutorialspoint.com/digital_circuits/"]
  },
  "intermediate": {
    "books": ["https://www.amazon.com/Digital-Design-Computer-Architecture-Harris/dp/0123944244", "https://www.amazon.com/Digital-Logic-Computer-Design-Mano/dp/0132781646"],
    "videos": ["https://www.youtube.com/watch?v=FlQJBHjLqfM", "https://www.youtube.com/watch?v=wvJc9CZcvBc"],
    "references": ["https://www.xilinx.com/support/university/vivado.html", "https://www.intel.com/content/www/us/en/software/programmable/quartus-prime/"]
  },
  "hard": {
    "books": ["https://www.amazon.com/CMOS-VLSI-Design-Circuits-Perspective/dp/0321547748", "https://www.amazon.com/Modern-VLSI-Design-Systems-Silicon/dp/0130619043"],
    "videos": ["https://www.youtube.com/watch?v=XUTdqfaFB8w", "https://www.youtube.com/watch?v=6-tKOHICqrI"],
    "references": ["https://www.cadence.com/en_US/home/training/all-courses.html", "https://www.synopsys.com/implementation-and-signoff.html"]
  }
}'),

((SELECT id FROM tracks WHERE track_name = 'VLSI Design' LIMIT 1), 'Advanced VLSI Design', 'Advanced concepts in VLSI design and implementation', 4, '{
  "beginner": {
    "books": ["https://nptel.ac.in/courses/117/106/117106030/", "https://www.coursera.org/specializations/vlsi-cad", "https://www.edx.org/course/vlsi-design"],
    "videos": ["https://www.youtube.com/watch?v=7eJexdVqjo4", "https://www.youtube.com/watch?v=sKBULXNBKAc", "https://www.youtube.com/watch?v=QnMng6oKzEE"],
    "references": ["https://www.eda.org/", "https://semiengineering.com/", "https://www.electronicdesign.com/"]
  },
  "intermediate": {
    "books": ["https://www.amazon.com/Introduction-VLSI-Circuits-Systems-Fabrication/dp/0201634791", "https://www.amazon.com/Analysis-Design-Digital-Integrated-Circuits/dp/0072283653"],
    "videos": ["https://www.youtube.com/watch?v=p_bj8VJbsEE", "https://www.youtube.com/watch?v=pAydM_x7VJw"],
    "references": ["https://www.mentor.com/products/ic_nanometer_design/", "https://www.ansys.com/products/semiconductors"]
  },
  "hard": {
    "books": ["https://www.amazon.com/Principles-CMOS-VLSI-Design-Perspective/dp/0321149017", "https://www.amazon.com/Static-Dynamic-Performance-Analysis-Integration/dp/0792396413"],
    "videos": ["https://www.youtube.com/watch?v=wnqDbqI3j5U", "https://www.youtube.com/watch?v=i3Rl3CjVFvs"],
    "references": ["https://www.research.ibm.com/labs/austin/vlsi/", "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=92"]
  }
}');