-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  college_name TEXT,
  year_of_study TEXT,
  branch_stream TEXT,
  interests TEXT[],
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create tracks table
CREATE TABLE public.tracks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  track_name TEXT NOT NULL,
  description TEXT NOT NULL,
  future_scope TEXT NOT NULL,
  icon TEXT,
  color_scheme TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for tracks (public read access)
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tracks" 
ON public.tracks 
FOR SELECT 
USING (true);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  subject_name TEXT NOT NULL,
  subject_desc TEXT,
  resources JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for subjects (public read access)
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view subjects" 
ON public.subjects 
FOR SELECT 
USING (true);

-- Create quiz_results table
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  recommended BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for quiz results
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz results" 
ON public.quiz_results 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz results" 
ON public.quiz_results 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''));
  RETURN new;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample tracks data
INSERT INTO public.tracks (track_name, description, future_scope, icon, color_scheme) VALUES
('Data Analytics', 'Transform raw data into meaningful insights for business decisions', 'Business intelligence, Big Data, Data Scientist roles, Decision-making jobs', 'BarChart3', 'blue'),
('Machine Learning & AI', 'Build intelligent systems that learn and adapt', 'AI Engineer, ML Engineer, Research Scientist, Automation & Robotics', 'Brain', 'purple'),
('Internet of Things (IoT)', 'Connect physical devices to create smart ecosystems', 'Smart Cities, Wearables, Industrial IoT, Smart Homes', 'Wifi', 'green'),
('VLSI Design', 'Design and develop integrated circuits and semiconductor systems', 'Semiconductor industry, Chip design, FPGA/ASIC design, Hardware R&D', 'Cpu', 'orange');

-- Insert sample subjects data
INSERT INTO public.subjects (track_id, subject_name, subject_desc, resources) 
SELECT 
  t.id,
  unnest(ARRAY['Statistics', 'SQL', 'Data Visualization', 'Python', 'R Programming', 'Big Data Tools']) as subject_name,
  unnest(ARRAY[
    'Statistical analysis and probability theory',
    'Structured Query Language for databases',
    'Creating meaningful charts and dashboards',
    'Programming language for data analysis',
    'Statistical computing and graphics',
    'Hadoop, Spark, and distributed computing'
  ]) as subject_desc,
  '{"pdf": null, "video": null, "links": []}' as resources
FROM public.tracks t WHERE t.track_name = 'Data Analytics';

INSERT INTO public.subjects (track_id, subject_name, subject_desc, resources)
SELECT 
  t.id,
  unnest(ARRAY['Linear Algebra', 'Probability Theory', 'Neural Networks', 'Deep Learning', 'Natural Language Processing', 'Reinforcement Learning']) as subject_name,
  unnest(ARRAY[
    'Mathematical foundations for ML algorithms',
    'Statistical foundations for uncertainty',
    'Artificial neural network architectures', 
    'Advanced neural network techniques',
    'Processing and understanding human language',
    'Learning through interaction and rewards'
  ]) as subject_desc,
  '{"pdf": null, "video": null, "links": []}' as resources
FROM public.tracks t WHERE t.track_name = 'Machine Learning & AI';

INSERT INTO public.subjects (track_id, subject_name, subject_desc, resources)
SELECT 
  t.id,
  unnest(ARRAY['Embedded Systems', 'Sensors & Actuators', 'Microcontrollers', 'Wireless Communication', 'Cloud Platforms', 'IoT Security']) as subject_name,
  unnest(ARRAY[
    'Hardware-software integration systems',
    'Physical world interface devices',
    'Programming embedded controllers',
    'WiFi, Bluetooth, LoRa communication',
    'AWS IoT, Azure IoT, Google Cloud IoT',
    'Securing connected devices and data'
  ]) as subject_desc,
  '{"pdf": null, "video": null, "links": []}' as resources
FROM public.tracks t WHERE t.track_name = 'Internet of Things (IoT)';

INSERT INTO public.subjects (track_id, subject_name, subject_desc, resources)
SELECT 
  t.id,
  unnest(ARRAY['Digital Electronics', 'HDL Programming', 'CMOS Technology', 'FPGA Design', 'EDA Tools', 'Chip Architecture']) as subject_name,
  unnest(ARRAY[
    'Digital logic design and circuits',
    'Verilog and VHDL programming',
    'Complementary metal-oxide-semiconductor',
    'Field-Programmable Gate Array design',
    'Electronic Design Automation software',
    'Processor and system-on-chip design'
  ]) as subject_desc,
  '{"pdf": null, "video": null, "links": []}' as resources
FROM public.tracks t WHERE t.track_name = 'VLSI Design';