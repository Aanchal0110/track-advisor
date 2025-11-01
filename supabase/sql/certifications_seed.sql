-- Certifications catalog seed data
-- Run this in Supabase SQL editor after creating the schema
-- NOTE: These statements use gen_random_uuid() for the ID and NULL for track_id to ensure compatibility.

-- ====================================================================
-- TRACK 1: Artificial Intelligence (AI) and Machine Learning (ML)
-- ====================================================================

INSERT INTO public.certification_catalog (id, certification_name, provider, description, duration, cost, certification_url, track_id, created_at) VALUES 
(gen_random_uuid(), 'Google Cloud Professional Machine Learning Engineer', 'Google Cloud', 'Design, build, and productionize ML models on GCP.', '6 Months', 200, 'https://cloud.google.com/certification/machine-learning-engineer', NULL, NOW()),
(gen_random_uuid(), 'AWS Certified Machine Learning - Specialty', 'Amazon Web Services (AWS)', 'Validate expertise in building, training, tuning, and deploying ML models on AWS.', '4 Months', 300, 'https://aws.amazon.com/certification/certified-machine-learning-specialty/', NULL, NOW()),
(gen_random_uuid(), 'Microsoft Azure AI Engineer Associate', 'Microsoft Azure', 'Implement and manage AI solutions using Azure Cognitive Services and Azure Machine Learning.', '3 Months', 165, 'https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/', NULL, NOW()),
(gen_random_uuid(), 'IBM AI Engineering Professional Certificate', 'IBM (via Coursera)', 'A comprehensive series of courses covering Deep Learning, NLP, and Computer Vision using TensorFlow and Keras.', '8 Months', 49, 'https://www.coursera.org/professional-certificates/ibm-ai-engineering', NULL, NOW()),
(gen_random_uuid(), 'Deep Learning Specialization', 'DeepLearning.AI (via Coursera)', 'Five courses by Andrew Ng focusing on Neural Networks, CNNs, RNNs, and optimization.', '5 Months', 49, 'https://www.coursera.org/specializations/deep-learning', NULL, NOW()),
(gen_random_uuid(), 'NVIDIA Deep Learning Institute (DLI) - Fundamentals', 'NVIDIA', 'Hands-on training covering accelerated computing, deep learning, and parallel programming using CUDA.', '2 Days', 300, 'https://www.nvidia.com/en-us/training/dli/', NULL, NOW()),
(gen_random_uuid(), 'Advanced Data Science Specialization', 'IBM (via Coursera)', 'Focuses on advanced statistical modeling, time series analysis, and deployment.', '6 Months', 49, 'https://www.coursera.org/specializations/advanced-data-science', NULL, NOW()),
(gen_random_uuid(), 'Certified Generative AI Engineer', 'Vector Institute', 'Certification focused on building, fine-tuning, and deploying Large Language Models (LLMs).', '3 Months', 450, 'https://vectorinstitute.ai/generative-ai-certification/', NULL, NOW()),
(gen_random_uuid(), 'MLOps Specialization', 'DeepLearning.AI (via Coursera)', 'Focuses on deploying, monitoring, and managing production ML systems.', '4 Months', 49, 'https://www.coursera.org/specializations/mlops-fundamentals', NULL, NOW()),
(gen_random_uuid(), 'Professional Certificate in Computer Vision', 'edX (IBM)', 'Covers image processing, object detection, and segmentation.', '4 Months', 499, 'https://www.edx.org/professional-certificate/ibm-computer-vision', NULL, NOW()),
(gen_random_uuid(), 'Natural Language Processing Specialization', 'DeepLearning.AI (via Coursera)', 'Covers sentiment analysis, sequence models, and attention mechanisms.', '5 Months', 49, 'https://www.coursera.org/specializations/natural-language-processing', NULL, NOW()),
(gen_random_uuid(), 'AI Product Manager Certification', 'AIPM', 'Certification focused on the product lifecycle for AI-powered solutions.', '2 Months', 1500, 'https://ai-pm.com/certification-program/', NULL, NOW()),
(gen_random_uuid(), 'SAS Certified AI & Machine Learning Professional', 'SAS', 'Validate advanced skills in machine learning model development and deployment using SAS.', '5 Months', 595, 'https://www.sas.com/en_us/certification/credentials/ai-machine-learning-professional.html', NULL, NOW()),
(gen_random_uuid(), 'Certified AI Developer', 'Intel (via Udacity)', 'Focuses on optimizing ML models for Intel hardware and using OpenVINO.', '3 Months', 399, 'https://www.udacity.com/course/intel-edge-ai-for-iot-developers--ud123', NULL, NOW()),
(gen_random_uuid(), 'AI for Healthcare Specialization', 'Stanford (via Coursera)', 'Covers the application of AI and ML in clinical settings and medical imaging.', '5 Months', 49, 'https://www.coursera.org/specializations/ai-for-healthcare', NULL, NOW());

-- ====================================================================
-- TRACK 2: Data Science & Analytics (DS/DA)
-- ====================================================================

INSERT INTO public.certification_catalog (id, certification_name, provider, description, duration, cost, certification_url, track_id, created_at) VALUES
(gen_random_uuid(), 'Google Advanced Data Analytics Professional Certificate', 'Google (via Coursera)', 'Focuses on statistical modeling, R programming, and advanced data visualization with Tableau.', '6 Months', 49, 'https://www.coursera.org/professional-certificates/google-advanced-data-analytics', NULL, NOW()),
(gen_random_uuid(), 'Certified Analytics Professional (CAP)', 'INFORMS', 'Vendor-neutral certification validating the entire analytics process, from framing to deployment.', 'Self-Paced', 695, 'https://www.certifiedanalytics.org/certification/', NULL, NOW()),
(gen_random_uuid(), 'Tableau Certified Data Analyst', 'Tableau', 'Validates fundamental skills in data preparation, analysis, and dashboard creation in Tableau.', '2 Months', 250, 'https://www.tableau.com/learn/certification/data-analyst', NULL, NOW()),
(gen_random_uuid(), 'Microsoft Power BI Data Analyst Associate', 'Microsoft Azure', 'Focuses on using Power BI to visualize data, model data, and maintain reports in the cloud.', '2 Months', 165, 'https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/', NULL, NOW()),
(gen_random_uuid(), 'Data Scientist Professional Certificate', 'IBM (via Coursera)', 'Covers Python, SQL, data analysis, visualization, and machine learning algorithms.', '7 Months', 49, 'https://www.coursera.org/professional-certificates/ibm-data-science', NULL, NOW()),
(gen_random_uuid(), 'PMP for Data Science (PMP-DS)', 'Project Management Institute (PMI)', 'Focuses on managing data science projects, including agile methodologies.', '3 Months', 555, 'https://www.pmi.org/certifications/data-science', NULL, NOW()),
(gen_random_uuid(), 'Certified Clinical Data Manager (CCDM)', 'SCDM', 'Specific to Biomedical students focusing on clinical trial data management and quality assurance.', 'Self-Paced', 500, 'https://scdm.org/certification/ccdm/', NULL, NOW()),
(gen_random_uuid(), 'Certified Professional Data Scientist (CPDS)', 'DAMA International', 'Vendor-neutral certification covering data science methodology and governance.', '3 Months', 400, 'https://www.dama.org/certification/cpds', NULL, NOW()),
(gen_random_uuid(), 'Data Visualization with Python', 'edX (MIT)', 'Focuses on creating interactive and complex visualizations using libraries like Plotly and Dash.', '2 Months', 199, 'https://www.edx.org/course/data-visualization-with-python', NULL, NOW()),
(gen_random_uuid(), 'Financial Data Science Specialization', 'Wharton (via Coursera)', 'Covers ML applications in finance, including quantitative trading and risk management.', '4 Months', 49, 'https://www.coursera.org/specializations/wharton-data-science-finance', NULL, NOW()),
(gen_random_uuid(), 'Certified Data Management Professional (CDMP)', 'DAMA International', 'Covers core data management concepts, a prerequisite for advanced data roles.', '4 Months', 600, 'https://www.dama.org/certification/cdmp/', NULL, NOW()),
(gen_random_uuid(), 'Advanced SQL for Data Scientists', 'DataCamp', 'In-depth SQL for complex data manipulation, stored procedures, and optimization.', '1 Month', 30, 'https://www.datacamp.com/tracks/sql', NULL, NOW()),
(gen_random_uuid(), 'Statistics for Data Science', 'MIT OpenCourseWare', 'Free foundational course in statistics and probability.', 'Variable', 0, 'https://ocw.mit.edu/courses/mathematics/18-s997-statistics-for-data-science-fall-2016/', NULL, NOW()),
(gen_random_uuid(), 'Certified Python Programmer', 'Python Institute', 'Validates core knowledge of the Python language used in data science.', '1 Month', 300, 'https://pythoninstitute.org/certification/', NULL, NOW()),
(gen_random_uuid(), 'Data Science in Consulting', 'McKinsey', 'Focuses on structuring ambiguous business problems for data science solutions.', '2 Months', 500, 'https://www.mckinsey.com/careers/data-analytics', NULL, NOW());

-- ====================================================================
-- TRACK 3: Data Engineering & IoT
-- ====================================================================

INSERT INTO public.certification_catalog (id, certification_name, provider, description, duration, cost, certification_url, track_id, created_at) VALUES
(gen_random_uuid(), 'Databricks Certified Data Engineer Professional', 'Databricks', 'Expertise in Spark programming, Delta Lake, and building production-grade data pipelines.', '3 Months', 200, 'https://www.databricks.com/discover/training-certification/data-engineer-professional', NULL, NOW()),
(gen_random_uuid(), 'Certified Spark Developer', 'Cloudera', 'Focuses on using Apache Spark for large-scale data processing and transformation.', '3 Months', 400, 'https://www.cloudera.com/about/training/certification.html', NULL, NOW()),
(gen_random_uuid(), 'Snowflake Certified Advanced Administrator', 'Snowflake', 'Deep knowledge of Snowflake architecture, data governance, and optimization.', '4 Months', 375, 'https://learn.snowflake.com/en/certifications/advanced-admin-cert/', NULL, NOW()),
(gen_random_uuid(), 'Certified IoT Professional', 'CISCO', 'Covers core IoT components, networking, security, and data handling in an IoT environment.', '3 Months', 400, 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/iot.html', NULL, NOW()),
(gen_random_uuid(), 'Certified Kafka Developer', 'Confluent', 'Expertise in building and managing real-time data streaming pipelines using Apache Kafka.', '2 Months', 150, 'https://www.confluent.io/certification/kafka-developer/', NULL, NOW()),
(gen_random_uuid(), 'IoT Security Practitioner (CISP)', 'IoT Security Institute', 'Focuses on securing IoT devices, networks, and applications (Relevant for ECE/CS).', '3 Months', 600, 'https://www.iotsecurityinstitute.com/certification/cisp-certified-iot-security-practitioner/', NULL, NOW()),
(gen_random_uuid(), 'Certified Kubernetes Application Developer (CKAD)', 'CNCF', 'Focuses on designing and deploying containerized applications (essential for MLOps/Data Engg).', '3 Months', 395, 'https://www.cncf.io/certification/ckad/', NULL, NOW()),
(gen_random_uuid(), 'Certified Systems Architect - Data Engineering', 'Hadoop/Big Data Council', 'Vendor-neutral certification on Hadoop ecosystem components (HDFS, Hive, etc.).', '3 Months', 300, 'https://www.bigdatauniversity.com/certifications/', NULL, NOW()),
(gen_random_uuid(), 'AWS Certified Security - Specialty', 'Amazon Web Services (AWS)', 'Focuses on securing data and infrastructure in the AWS cloud.', '4 Months', 300, 'https://aws.amazon.com/certification/certified-security-specialty/', NULL, NOW()),
(gen_random_uuid(), 'Microsoft Power Platform Developer Associate', 'Microsoft Azure', 'Focuses on building business automation and data-driven solutions using the Power Platform.', '2 Months', 165, 'https://learn.microsoft.com/en-us/certifications/power-platform-developer-associate/', NULL, NOW()),
(gen_random_uuid(), 'IoT Analytics for Predictive Maintenance', 'Siemens', 'Specific to industrial IoT (IIoT), focusing on sensor data and time-series analysis.', '2 Months', 500, 'https://new.siemens.com/global/en/company/digital-industrial-iot.html', NULL, NOW()),
(gen_random_uuid(), 'Certified Data Vault 2.0 Practitioner', 'Data Vault Alliance', 'Focuses on advanced data warehousing modeling techniques.', '3 Months', 1200, 'https://datavaultalliance.com/certifications/', NULL, NOW()),
(gen_random_uuid(), 'MongoDB Certified Developer Associate', 'MongoDB', 'Validate hands-on experience in developing applications with MongoDB.', '1 Month', 150, 'https://university.mongodb.com/certification', NULL, NOW()),
(gen_random_uuid(), 'Certified DevOps Engineer', 'DevOps Institute', 'Focuses on CI/CD principles essential for automated data pipeline deployment.', '3 Months', 450, 'https://www.devopsinstitute.com/certifications/', NULL, NOW()),
(gen_random_uuid(), 'IoT Development with Arduino and Raspberry Pi', 'edX', 'Practical course on building basic IoT prototypes (great for ECE/BME students).', '2 Months', 199, 'https://www.edx.org/course/iot-development-with-arduino-and-raspberry-pi', NULL, NOW());

-- ====================================================================
-- TRACK 4: VLSI & Advanced VLSI
-- ====================================================================

INSERT INTO public.certification_catalog (id, certification_name, provider, description, duration, cost, certification_url, track_id, created_at) VALUES
(gen_random_uuid(), 'Synopsys Certified Verification Professional (SV/UVM)', 'Synopsys', 'Expertise in verification methodologies using SystemVerilog and UVM, essential for VLSI roles.', '4 Months', 800, 'https://www.synopsys.com/support/training/verification-academy.html', NULL, NOW()),
(gen_random_uuid(), 'Cadence Certified Physical Design Engineer', 'Cadence Design Systems', 'Validate skills in physical design flow: floorplanning, placement, clock tree synthesis (CTS), and routing.', '5 Months', 900, 'https://www.cadence.com/en_US/home/training/certifications.html', NULL, NOW()),
(gen_random_uuid(), 'ARM Certified System-on-Chip (SoC) Design', 'ARM', 'Focuses on designing SoCs based on ARM CPU architecture.', '4 Months', 600, 'https://developer.arm.com/training-and-certification', NULL, NOW()),
(gen_random_uuid(), 'NVIDIA DLI - Accelerated Computing with CUDA C/C++', 'NVIDIA', 'Focuses on GPU programming and optimization for parallel computing.', '2 Days', 300, 'https://www.nvidia.com/en-us/training/dli/accelerated-computing/', NULL, NOW()),
(gen_random_uuid(), 'Certified Functional Verification Engineer (CFVE)', 'VLSI Industry Experts', 'Vendor-neutral certification covering general RTL, design, and verification concepts.', '3 Months', 500, 'https://www.vlsi-certification.com/cfve/', NULL, NOW()),
(gen_random_uuid(), 'Advanced CMOS Design and Layout', 'edX (MIT/Berkeley)', 'Deep dive into transistor-level analog/mixed-signal VLSI design.', '4 Months', 499, 'https://www.edx.org/course/advanced-cmos-design', NULL, NOW()),
(gen_random_uuid(), 'NXP Advanced Embedded Systems Professional', 'NXP Semiconductors', 'Focuses on microcontrollers, embedded security, and IoT hardware integration.', '3 Months', 450, 'https://www.nxp.com/support/training', NULL, NOW()),
(gen_random_uuid(), 'VLSI Physical Design Automation', 'NPTEL (IIT Madras)', 'Free online course covering algorithms and tools used in automated chip layout.', '3 Months', 0, 'https://nptel.ac.in/courses/106106088', NULL, NOW()),
(gen_random_uuid(), 'Certified DFT (Design-for-Test) Engineer', 'VLSI Industry Experts', 'Focuses on techniques like Scan Chain and BIST for manufacturing testability.', '3 Months', 600, 'https://www.vlsi-certification.com/dft/', NULL, NOW()),
(gen_random_uuid(), 'RTL Design and Synthesis with Verilog', 'Coursera (IIT Bombay)', 'Practical implementation of digital circuits using synthesizable Verilog.', '2 Months', 49, 'https://www.coursera.org/specializations/fpga-design-vlsi', NULL, NOW()),
(gen_random_uuid(), 'NVIDIA DLI - Edge AI for IoT Developers', 'NVIDIA', 'Focuses on deploying AI inference on edge devices (relevant for ECE/IoT).', '2 Days', 300, 'https://www.nvidia.com/en-us/training/dli/edge-ai-for-iot/', NULL, NOW()),
(gen_random_uuid(), 'Certified Signal Integrity Engineer', 'IEEE', 'Focuses on high-speed circuit design and electromagnetic principles for VLSI.', '3 Months', 700, 'https://www.ieee.org/membership/certification/sig-integrity-cert.html', NULL, NOW()),
(gen_random_uuid(), 'Advanced Static Timing Analysis (STA)', 'VLSI Expert Courses', 'Covers complex timing constraints, clock domains, and timing closure.', '3 Months', 500, 'https://www.vlsi-expert.com/category/static-timing-analysis/', NULL, NOW()),
(gen_random_uuid(), 'Certified FPGA Design Professional', 'Xilinx/AMD', 'Expertise in using FPGAs for rapid prototyping and hardware acceleration.', '3 Months', 400, 'https://www.xilinx.com/support/training.html', NULL, NOW()),
(gen_random_uuid(), 'Low Power VLSI Design Techniques', 'edX (Purdue)', 'Focuses on techniques to reduce power consumption in digital circuits (clock gating, voltage scaling).', '2 Months', 199, 'https://www.edx.org/course/low-power-vlsi-design', NULL, NOW()),
(gen_random_uuid(), 'Digital IC Design - Advanced', 'TCS', 'Covers advanced digital design and high-speed CMOS implementation.', '2 Months', 500, 'https://www.tcs.com/careers/learning-and-development', NULL, NOW()),
(gen_random_uuid(), 'Certified Mixed-Signal Design Engineer', 'VLSI Industry Experts', 'Focuses on the integration and verification of analog and digital circuits.', '4 Months', 750, 'https://www.vlsi-certification.com/mixed-signal-design/', NULL, NOW()),
(gen_random_uuid(), 'Embedded Systems Design using ARM Cortex', 'edX', 'Practical course on microcontroller programming and peripheral interfacing.', '3 Months', 299, 'https://www.edx.org/course/embedded-systems-design-using-arm-cortex', NULL, NOW()),
(gen_random_uuid(), 'Advanced Analog IC Design (Op-Amps & Filters)', 'Analog Devices', 'Deep dive into core analog building blocks.', '4 Months', 600, 'https://www.analogdevices.com/en/education/university-program.html', NULL, NOW()),
(gen_random_uuid(), 'RISC-V Architecture and Programming', 'Linux Foundation', 'Certification on the open standard instruction set architecture (ISA) for custom processor design.', '3 Months', 350, 'https://training.linuxfoundation.org/certification/risc-v-developer-certification-rvdc/', NULL, NOW());

-- ====================================================================
-- TRACK 5: Cross-Domain & Advanced Skills
-- ====================================================================

INSERT INTO public.certification_catalog (id, certification_name, provider, description, duration, cost, certification_url, track_id, created_at) VALUES
(gen_random_uuid(), 'Professional Scrum Master I (PSM I)', 'Scrum.org', 'Validate understanding of Scrum framework, highly valued in agile tech teams.', '1 Month', 150, 'https://www.scrum.org/professional-scrum-master-i-psm-i', NULL, NOW()),
(gen_random_uuid(), 'Certified Data Privacy Solutions Engineer (CDPSE)', 'ISACA', 'Focuses on privacy by design, relevant for all data and BME roles.', '3 Months', 760, 'https://www.isaca.org/credentialing/cdpse', NULL, NOW()),
(gen_random_uuid(), 'Advanced Generative AI for Developers', 'AWS (via edX)', 'Focuses on developing Gen AI applications using Bedrock and other AWS services.', '3 Months', 399, 'https://www.edx.org/professional-certificate/aws-generative-ai', NULL, NOW()),
(gen_random_uuid(), 'Certified Internet of Medical Things (IoMT) Security', 'Cybrary', 'Specific to securing connected medical devices (BME focus).', '2 Months', 250, 'https://www.cybrary.it/course/iomt-security/', NULL, NOW()),
(gen_random_uuid(), 'Introduction to Quantum Computing', 'IBM', 'Covers the basics of quantum circuits and Qiskit programming.', '2 Months', 0, 'https://www.ibm.com/quantum/qiskit', NULL, NOW()),
(gen_random_uuid(), 'Certified Cloud Security Professional (CCSP)', 'ISC2', 'Validate expertise in cloud security architecture and operations.', '5 Months', 599, 'https://www.isc2.org/Certifications/CCSP', NULL, NOW()),
(gen_random_uuid(), 'Advanced Data Visualization with D3.js', 'Udemy', 'Mastering D3.js for custom, interactive data visualization on the web.', '2 Months', 19, 'https://www.udemy.com/course/d3js-data-visualization-by-example/', NULL, NOW()),
(gen_random_uuid(), 'Computational Biology for Data Scientists', 'edX (Harvard)', 'Covers bioinformatics and data analysis techniques relevant to BME data.', '4 Months', 499, 'https://www.edx.org/course/computational-biology', NULL, NOW()),
(gen_random_uuid(), 'Certified Biomedical Equipment Technician (CBET)', 'AAMI', 'Core certification for BME students working with medical devices, intersecting with IoT.', 'Self-Paced', 500, 'https://www.aami.org/training-and-certifications/certification/cbet', NULL, NOW()),
(gen_random_uuid(), 'Advanced Data Storytelling', 'Deloitte', 'Focuses on translating complex data insights into actionable business narratives.', '1 Month', 300, 'https://www.deloitte.com/us/en/pages/careers/articles/deloitte-university-training.html', NULL, NOW()),
(gen_random_uuid(), 'Product Owner Certification (CSPO)', 'Scrum Alliance', 'Focuses on maximizing the value of the product resulting from the work of the Development Team.', '2 Days', 1195, 'https://www.scrumalliance.org/certifications/product-owner-certifications', NULL, NOW()),
(gen_random_uuid(), 'NVIDIA DLI - Multi-GPU Programming', 'NVIDIA', 'Focuses on scaling deep learning training across multiple GPUs and nodes.', '2 Days', 300, 'https://www.nvidia.com/en-us/training/dli/multi-gpu-programming/', NULL, NOW()),
(gen_random_uuid(), 'Certified Professional in Healthcare Quality (CPHQ)', 'NAHQ', 'Focuses on quality improvement and data use in healthcare systems (BME/Data).', '4 Months', 525, 'https://nahq.org/certification/cphq/', NULL, NOW()),
(gen_random_uuid(), 'Certified Technical Trainer (CTT+)', 'CompTIA', 'Focuses on technical training skills, useful for experts who want to teach or mentor.', '3 Months', 358, 'https://www.comptia.org/certifications/cct', NULL, NOW()),
(gen_random_uuid(), 'AI and Blockchain Specialization', 'IBM (via Coursera)', 'Focuses on combining decentralized data with intelligent systems.', '4 Months', 49, 'https://www.coursera.org/specializations/ai-blockchain', NULL, NOW()),
(gen_random_uuid(), 'Certified Professional in Accessibility Core Competencies (CPACC)', 'IAAP', 'Focuses on designing accessible technology and data visualizations.', '2 Months', 485, 'https://www.accessibilityassociation.org/certification', NULL, NOW()),
(gen_random_uuid(), 'Mastering Git and GitHub', 'Udemy', 'Essential version control skills for all tech roles.', '1 Month', 19, 'https://www.udemy.com/course/git-and-github-bootcamp/', NULL, NOW()),
(gen_random_uuid(), 'Certified Six Sigma Green Belt', 'ASQ', 'Focuses on process improvement and statistical control, highly valued in VLSI/Manufacturing.', '4 Months', 399, 'https://asq.org/certifications/six-sigma-green-belt', NULL, NOW()),
(gen_random_uuid(), 'Certified Automation Professional (CAP)', 'ISA', 'Focuses on industrial control systems and automation, core to IIoT.', '4 Months', 700, 'https://www.isa.org/training-and-certification/isa-certification/cap', NULL, NOW()),
(gen_random_uuid(), 'Introduction to Bioinformatics', 'edX (Johns Hopkins)', 'Covers algorithms for biological sequence analysis (BME/Data).', '3 Months', 299, 'https://www.edx.org/course/introduction-to-bioinformatics', NULL, NOW()),
(gen_random_uuid(), 'Google Cloud Certified Professional Security Engineer', 'Google Cloud', 'Focuses on security design and implementation for cloud applications and data.', '5 Months', 200, 'https://cloud.google.com/certification/cloud-security-engineer', NULL, NOW()),
(gen_random_uuid(), 'Certified Penetration Testing Engineer (CPTE)', 'Mile2', 'Practical skills in penetration testing of systems and networks.', '4 Months', 400, 'https://www.mile2.com/cpte.html', NULL, NOW()),
(gen_random_uuid(), 'Cloud FinOps Certified Practitioner', 'FinOps Foundation', 'Focuses on managing cloud costs for large-scale data and ML workloads.', '2 Months', 499, 'https://www.finops.org/certification/cloud-finops-certified-practitioner', NULL, NOW()),
(gen_random_uuid(), 'Certified Information Systems Auditor (CISA)', 'ISACA', 'Focuses on auditing, control, and security of IT and business systems.', '5 Months', 760, 'https://www.isaca.org/credentialing/cisa', NULL, NOW()),
(gen_random_uuid(), 'Certified Technical Project Manager', 'CompTIA', 'Focuses on managing technical projects, scope, and resources.', '3 Months', 358, 'https://www.comptia.org/certifications/project-plus', NULL, NOW()),
(gen_random_uuid(), 'Certified Biomedical Instrumentation Specialist (CBIS)', 'AAMI', 'Specific to calibration and maintenance of biomedical instruments.', 'Self-Paced', 500, 'https://www.aami.org/training-and-certifications/certification/cbis', NULL, NOW()),
(gen_random_uuid(), 'Advanced Data Governance and Ethics', 'edX', 'Focuses on policy, compliance, and ethical frameworks for data usage.', '3 Months', 199, 'https://www.edx.org/course/data-governance-and-ethics', NULL, NOW()),
(gen_random_uuid(), 'Foundations of Data Engineering', 'LinkedIn Learning', 'Covers core principles of building robust data infrastructure.', '2 Months', 30, 'https://www.linkedin.com/learning/paths/become-a-data-engineer', NULL, NOW());

