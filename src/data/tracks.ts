import { BarChart3, Brain, Wifi, Cpu } from 'lucide-react';

export interface Track {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  futureScope: string[];
  subjects: string[];
  careerPaths: string[];
  averageSalary: string;
  jobGrowth: string;
  icon: any;
  gradient: string;
  skills: string[];
  prerequisites: string[];
}

export const tracks: Track[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights for business decision-making.',
    detailedDescription: 'Data Analytics focuses on examining data sets to draw conclusions about the information they contain. This field combines statistical analysis, data visualization, and business intelligence to help organizations make informed decisions.',
    futureScope: [
      'Business Intelligence Analyst',
      'Data Scientist',
      'Decision Support Analyst',
      'Marketing Analytics Specialist',
      'Financial Data Analyst',
      'Healthcare Data Analyst'
    ],
    subjects: [
      'Statistics & Probability',
      'SQL & Database Management',
      'Data Visualization',
      'Python Programming',
      'R Programming',
      'Big Data Tools (Hadoop, Spark)',
      'Excel & Advanced Analytics',
      'Business Intelligence Tools'
    ],
    careerPaths: [
      'Junior Data Analyst → Senior Data Analyst → Data Science Manager',
      'Business Analyst → Senior Business Analyst → Analytics Consultant',
      'Research Analyst → Market Research Manager → Director of Analytics'
    ],
    averageSalary: '$65,000 - $120,000',
    jobGrowth: '25% (Much faster than average)',
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    skills: [
      'Statistical Analysis',
      'Data Cleaning',
      'Report Generation',
      'Problem Solving',
      'Communication',
      'Critical Thinking'
    ],
    prerequisites: [
      'Basic Mathematics',
      'Statistics Fundamentals',
      'Computer Literacy',
      'Analytical Mindset'
    ]
  },
  {
    id: 'ai-ml',
    title: 'Machine Learning & AI',
    description: 'Build intelligent systems that can learn and make decisions autonomously.',
    detailedDescription: 'Machine Learning and Artificial Intelligence involve creating systems that can learn from data, recognize patterns, and make intelligent decisions. This field is at the forefront of technological innovation.',
    futureScope: [
      'AI Engineer',
      'Machine Learning Engineer',
      'Research Scientist',
      'Computer Vision Engineer',
      'NLP Engineer',
      'Robotics Engineer',
      'AI Product Manager'
    ],
    subjects: [
      'Linear Algebra',
      'Probability & Statistics',
      'Neural Networks',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Reinforcement Learning',
      'Python & TensorFlow/PyTorch'
    ],
    careerPaths: [
      'ML Engineer → Senior ML Engineer → ML Architect → Chief AI Officer',
      'Research Assistant → Research Scientist → Principal Scientist',
      'AI Developer → AI Team Lead → VP of AI Strategy'
    ],
    averageSalary: '$95,000 - $180,000',
    jobGrowth: '31% (Much faster than average)',
    icon: Brain,
    gradient: 'linear-gradient(135deg, #10B981, #3B82F6)',
    skills: [
      'Algorithm Design',
      'Mathematical Modeling',
      'Programming',
      'Research & Development',
      'Problem Solving',
      'Innovation'
    ],
    prerequisites: [
      'Strong Mathematics Background',
      'Programming Experience',
      'Statistical Knowledge',
      'Logical Thinking'
    ]
  },
  {
    id: 'iot',
    title: 'Internet of Things (IoT)',
    description: 'Connect everyday objects to the internet to create smart, responsive environments.',
    detailedDescription: 'Internet of Things (IoT) involves connecting physical devices to the internet, enabling them to collect and exchange data. This creates smart ecosystems in homes, cities, and industries.',
    futureScope: [
      'IoT Solutions Architect',
      'Smart City Developer',
      'Wearable Technology Engineer',
      'Industrial IoT Specialist',
      'Connected Car Engineer',
      'Smart Home Developer'
    ],
    subjects: [
      'Embedded Systems Programming',
      'Sensor Technology',
      'Microcontrollers (Arduino, Raspberry Pi)',
      'Wireless Communication Protocols',
      'Cloud Platforms (AWS IoT, Azure IoT)',
      'Network Security',
      'Mobile App Development',
      'Data Analytics for IoT'
    ],
    careerPaths: [
      'IoT Developer → Senior IoT Engineer → IoT Solutions Architect',
      'Embedded Engineer → IoT Team Lead → CTO of IoT Company',
      'Hardware Engineer → IoT Product Manager → VP of IoT Products'
    ],
    averageSalary: '$75,000 - $140,000',
    jobGrowth: '22% (Much faster than average)',
    icon: Wifi,
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    skills: [
      'Hardware-Software Integration',
      'Network Protocols',
      'System Design',
      'Problem Solving',
      'Project Management',
      'Innovation'
    ],
    prerequisites: [
      'Basic Electronics',
      'Programming Fundamentals',
      'Network Concepts',
      'System Thinking'
    ]
  },
  {
    id: 'vlsi',
    title: 'VLSI Design',
    description: 'Design and develop advanced microchips and integrated circuits for modern electronics.',
    detailedDescription: 'Very Large-Scale Integration (VLSI) involves designing complex integrated circuits by combining millions of transistors into a single chip. This field is crucial for advancing computing technology.',
    futureScope: [
      'VLSI Design Engineer',
      'Chip Design Architect',
      'FPGA Design Engineer',
      'Semiconductor R&D Engineer',
      'Verification Engineer',
      'Layout Design Engineer'
    ],
    subjects: [
      'Digital Electronics',
      'CMOS Technology',
      'HDL (Verilog/VHDL)',
      'FPGA Design',
      'EDA Tools (Cadence, Synopsys)',
      'Analog Circuit Design',
      'Signal Processing',
      'Computer Architecture'
    ],
    careerPaths: [
      'Design Engineer → Senior Design Engineer → Principal Engineer → Chief Architect',
      'Verification Engineer → Lead Verification Engineer → Verification Manager',
      'Layout Engineer → Senior Layout Engineer → Physical Design Manager'
    ],
    averageSalary: '$85,000 - $160,000',
    jobGrowth: '5% (As fast as average)',
    icon: Cpu,
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    skills: [
      'Circuit Design',
      'Hardware Description Languages',
      'Problem Solving',
      'Attention to Detail',
      'Mathematical Analysis',
      'Innovation'
    ],
    prerequisites: [
      'Electronics Fundamentals',
      'Digital Logic',
      'Mathematics',
      'Physics Background'
    ]
  }
];