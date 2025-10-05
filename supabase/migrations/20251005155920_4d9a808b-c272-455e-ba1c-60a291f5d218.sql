-- Create mentors table first
CREATE TABLE public.mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  department TEXT NOT NULL,
  photo_url TEXT,
  profile_url TEXT,
  expertise TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view mentors" ON public.mentors FOR SELECT USING (true);

-- Industry Intelligence Tables
CREATE TABLE public.market_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_title TEXT NOT NULL,
  demand_score INTEGER NOT NULL,
  median_salary INTEGER NOT NULL,
  growth_rate DECIMAL NOT NULL,
  job_openings INTEGER NOT NULL,
  skills_required TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.growth_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_name TEXT NOT NULL,
  current_demand INTEGER NOT NULL,
  predicted_growth DECIMAL NOT NULL,
  time_horizon TEXT NOT NULL,
  confidence_level TEXT NOT NULL,
  key_drivers TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.location_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  avg_salary INTEGER NOT NULL,
  cost_of_living_index INTEGER NOT NULL,
  job_opportunities INTEGER NOT NULL,
  tech_ecosystem_score INTEGER NOT NULL,
  top_companies TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Career Assessment Tables
CREATE TABLE public.personality_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  personality_type TEXT NOT NULL,
  traits JSONB NOT NULL,
  career_matches TEXT[] NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.skills_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  skill_category TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  proficiency_level INTEGER NOT NULL,
  assessment_score INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.interest_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  interest_area TEXT NOT NULL,
  interest_level INTEGER NOT NULL,
  related_careers TEXT[] NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Career Tools Tables
CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  project_url TEXT,
  technologies TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.resume_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  category TEXT NOT NULL,
  preview_image TEXT,
  description TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.interview_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL,
  sample_answer TEXT NOT NULL,
  tips TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Learning Enhancement Tables
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  track_id UUID REFERENCES public.tracks(id),
  progress_percentage INTEGER DEFAULT 0,
  completed_modules INTEGER DEFAULT 0,
  total_modules INTEGER NOT NULL,
  last_activity TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  criteria TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  badge_id UUID REFERENCES public.badges(id),
  earned_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_name TEXT NOT NULL,
  provider TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  cost INTEGER,
  certification_url TEXT,
  track_id UUID REFERENCES public.tracks(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Opportunity Hub Tables
CREATE TABLE public.job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_range TEXT NOT NULL,
  job_type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  apply_url TEXT,
  posted_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.company_culture (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  culture_score DECIMAL NOT NULL,
  work_life_balance INTEGER NOT NULL,
  benefits TEXT[] NOT NULL,
  employee_reviews INTEGER NOT NULL,
  avg_rating DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.networking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  organizer TEXT NOT NULL,
  registration_url TEXT,
  is_virtual BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.market_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personality_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interest_surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_culture ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.networking_events ENABLE ROW LEVEL SECURITY;

-- Public read policies for reference data
CREATE POLICY "Anyone can view market insights" ON public.market_insights FOR SELECT USING (true);
CREATE POLICY "Anyone can view growth predictions" ON public.growth_predictions FOR SELECT USING (true);
CREATE POLICY "Anyone can view location insights" ON public.location_insights FOR SELECT USING (true);
CREATE POLICY "Anyone can view resume templates" ON public.resume_templates FOR SELECT USING (true);
CREATE POLICY "Anyone can view interview questions" ON public.interview_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Anyone can view certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Anyone can view job listings" ON public.job_listings FOR SELECT USING (true);
CREATE POLICY "Anyone can view company culture" ON public.company_culture FOR SELECT USING (true);
CREATE POLICY "Anyone can view networking events" ON public.networking_events FOR SELECT USING (true);

-- User-specific policies
CREATE POLICY "Users can view their own assessments" ON public.personality_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own assessments" ON public.personality_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own skills" ON public.skills_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own skills" ON public.skills_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own interests" ON public.interest_surveys FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own interests" ON public.interest_surveys FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own portfolios" ON public.portfolios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own portfolios" ON public.portfolios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own portfolios" ON public.portfolios FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);