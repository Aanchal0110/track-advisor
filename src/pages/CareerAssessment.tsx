import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, Gauge, Heart, Award, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import heroAssessment from '@/assets/hero-assessment.jpg';

type Choice = {
  id: string;
  label: string;
  value: number;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  image?: string;
  choices: Choice[];
};

type QuizResult = {
  category: 'personality' | 'skills' | 'interests';
  score: number;
  answers: Record<string, number>;
  createdAt: string;
};

const personalityQuestions: QuizQuestion[] = [
  {
    id: 'p1',
    prompt: 'In a team project, which role do you naturally take?',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    choices: [
      { id: 'p1a', label: 'Coordinator — align people and goals', value: 5 },
      { id: 'p1b', label: 'Analyst — deep dive into details', value: 3 },
      { id: 'p1c', label: 'Doer — execute tasks fast', value: 4 },
      { id: 'p1d', label: 'Creator — ideate novel solutions', value: 5 },
    ],
  },
  {
    id: 'p2',
    prompt: 'Your ideal work environment is…',
    image: 'https://images.unsplash.com/photo-1517504734587-2890819debab?q=80&w=1200&auto=format&fit=crop',
    choices: [
      { id: 'p2a', label: 'Structured with clear processes', value: 3 },
      { id: 'p2b', label: 'Flexible with room to experiment', value: 5 },
      { id: 'p2c', label: 'Collaborative and social', value: 4 },
      { id: 'p2d', label: 'Independent and focused', value: 4 },
    ],
  },
];

const skillsQuestions: QuizQuestion[] = [
  {
    id: 's1',
    prompt: 'Rate your proficiency in data analysis',
    image: 'https://images.unsplash.com/photo-1551281044-8a5bf9af8bf0?q=80&w=1200&auto=format&fit=crop',
    choices: [
      { id: 's1a', label: 'Beginner', value: 1 },
      { id: 's1b', label: 'Intermediate', value: 3 },
      { id: 's1c', label: 'Advanced', value: 5 },
    ],
  },
  {
    id: 's2',
    prompt: 'How comfortable are you with public speaking?',
    image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop',
    choices: [
      { id: 's2a', label: 'Not comfortable', value: 1 },
      { id: 's2b', label: 'Somewhat comfortable', value: 3 },
      { id: 's2c', label: 'Very comfortable', value: 5 },
    ],
  },
];

const interestsQuestions: QuizQuestion[] = [
  {
    id: 'i1',
    prompt: 'Which activity sounds most appealing?',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    choices: [
      { id: 'i1a', label: 'Coding a side project', value: 5 },
      { id: 'i1b', label: 'Designing a product mockup', value: 4 },
      { id: 'i1c', label: 'Interviewing users for insights', value: 3 },
      { id: 'i1d', label: 'Planning a marketing campaign', value: 3 },
    ],
  },
  {
    id: 'i2',
    prompt: 'Pick a topic you could read about for hours',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    choices: [
      { id: 'i2a', label: 'AI and machine learning', value: 5 },
      { id: 'i2b', label: 'Psychology and behavior', value: 4 },
      { id: 'i2c', label: 'Business strategy', value: 3 },
      { id: 'i2d', label: 'Art and visual design', value: 4 },
    ],
  },
];

function computeScore(answers: Record<string, number>): number {
  const values = Object.values(answers);
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, n) => acc + n, 0);
  return Math.round((sum / (values.length * 5)) * 100);
}

function saveResult(result: QuizResult) {
  try {
    const key = 'assessmentResults';
    const existing = localStorage.getItem(key);
    const parsed: QuizResult[] = existing ? JSON.parse(existing) : [];
    parsed.push(result);
    localStorage.setItem(key, JSON.stringify(parsed));
  } catch {}
}

// ---------------- Big Five Data & Components ----------------
type BigFiveTrait = 'Extraversion' | 'Agreeableness' | 'Conscientiousness' | 'Neuroticism' | 'Openness';

type BigFiveQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
};

function generateTraitQuestions(trait: BigFiveTrait): BigFiveQuestion[] {
  const baseOptions = (
    idx: number
  ) => [
    { id: `a${idx}`, label: 'Strongly disagree' },
    { id: `b${idx}`, label: 'Disagree' },
    { id: `c${idx}`, label: 'Neutral' },
    { id: `d${idx}`, label: 'Agree' },
    { id: `e${idx}`, label: 'Strongly agree' },
  ];
  const items: BigFiveQuestion[] = [];
  for (let i = 1; i <= 30; i++) {
    const prompt = `Q${i}. ${trait}: This statement reflects ${trait.toLowerCase()} (item ${i}).`;
    const opts = baseOptions(i);
    // Arbitrary correct option: alternate to make demo varied
    const correct = opts[(i % 5)].id;
    items.push({ id: `${trait}-${i}`, prompt, options: opts, correctOptionId: correct });
  }
  return items;
}

const bigFiveMeta: { trait: BigFiveTrait; image: string; description: string }[] = [
  {
    trait: 'Extraversion',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
    description: 'Energy, sociability, and tendency to seek stimulation in the company of others.'
  },
  {
    trait: 'Agreeableness',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
    description: 'Compassionate, cooperative, and trusting orientation toward others.'
  },
  {
    trait: 'Conscientiousness',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop',
    description: 'Self-discipline, organization, and goal-directed behaviors.'
  },
  {
    trait: 'Neuroticism',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    description: 'Tendency toward emotional instability, anxiety, and moodiness.'
  },
  {
    trait: 'Openness',
    image: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1200&auto=format&fit=crop',
    description: 'Intellectual curiosity, creativity, and preference for novelty and variety.'
  },
];

function saveBigFiveAttempt(trait: BigFiveTrait, questionId: string, chosenId: string, correct: boolean) {
  try {
    const key = 'bigFiveAttempts';
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    parsed.push({ trait, questionId, chosenId, correct, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(parsed));
  } catch {}
}

type AssessRow = {
  id: string;
  category: 'personality' | 'skills';
  sub_category: string;
  prompt: string;
  options: { id: string; label: string }[];
  correct_option_id: string;
};

const BigFiveQuiz = ({ trait }: { trait: BigFiveTrait }) => {
  const fallbackQuestions = useMemo(() => generateTraitQuestions(trait), [trait]);
  const [questions, setQuestions] = useState<BigFiveQuestion[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('assessment_questions')
        .select('id, category, sub_category, prompt, options, correct_option_id')
        .eq('category', 'personality')
        .eq('sub_category', trait)
        .limit(30);
      if (!mounted) return;
      if (!error && data && data.length) {
        const mapped: BigFiveQuestion[] = (data as AssessRow[]).map((r, idx) => ({
          id: r.id || `${trait}-${idx + 1}`,
          prompt: r.prompt,
          options: r.options,
          correctOptionId: r.correct_option_id,
        }));
        setQuestions(mapped);
      } else {
        setQuestions(fallbackQuestions);
      }
      setLoading(false);
      setIndex(0);
      setSelected(null);
      setSubmitted(false);
    })();
    return () => {
      mounted = false;
    };
  }, [trait]);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading questions…</div>;
  }

  if (!questions || questions.length === 0) {
    return <div className="text-sm text-muted-foreground">No questions found. Please seed questions in Supabase.</div>;
  }

  const q = questions[index];
  const isCorrect = submitted && selected === q.correctOptionId;
  const atEnd = index === questions.length - 1;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Question {index + 1} / {questions.length}</div>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-4 space-y-3">
          <p className="font-medium">{q.prompt}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => (
              <label key={opt.id} className={`cursor-pointer rounded-md border p-3 text-sm flex items-center justify-between ${selected === opt.id ? 'border-primary bg-primary/5' : ''}`}>
                <span>{opt.label}</span>
                <input
                  type="radio"
                  name={q.id}
                  className="h-4 w-4"
                  checked={selected === opt.id}
                  onChange={() => {
                    setSelected(opt.id);
                    setSubmitted(false);
                  }}
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {submitted ? (isCorrect ? 'Correct ✅' : 'Incorrect ❌') : 'Select an option to enable submit'}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
            }}
          >
            Clear
          </Button>
          {!submitted && (
            <Button
              disabled={!selected}
              onClick={() => {
                if (!selected) return;
                const correctNow = selected === q.correctOptionId;
                saveBigFiveAttempt(trait, q.id, selected, correctNow);
                // best-effort log to Supabase
                supabase.from('assessment_attempts').insert({
                  category: 'personality',
                  sub_category: trait,
                  question_id: q.id,
                  chosen_option_id: selected,
                  is_correct: correctNow,
                });
                setSubmitted(true);
              }}
            >
              Submit
            </Button>
          )}
          {submitted && (
            <Button
              onClick={() => {
                if (atEnd) {
                  setIndex(0);
                } else {
                  setIndex(index + 1);
                }
                setSelected(null);
                setSubmitted(false);
              }}
            >
              {atEnd ? 'Restart' : 'Next'}
            </Button>
          )}
        </div>
      </div>

      {submitted && (
        <div className={`rounded-lg border p-3 ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <p className="text-sm">
            {isCorrect ? 'Great job! Your answer is correct.' : 'Not quite.'} Correct answer:
            <span className="ml-1 font-medium">
              {q.options.find(o => o.id === q.correctOptionId)?.label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const BigFivePersonality = () => {
  const [activeTrait, setActiveTrait] = useState<BigFiveTrait | null>(null);

  if (activeTrait) {
    const meta = bigFiveMeta.find(m => m.trait === activeTrait)!;
    return (
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{activeTrait} Assessment</h3>
            <p className="text-sm text-muted-foreground">30 questions • Per-question submit with instant feedback</p>
          </div>
          <Button variant="outline" onClick={() => setActiveTrait(null)}>Back to traits</Button>
        </div>
        <div className="rounded-lg overflow-hidden h-40 w-full bg-cover bg-center mb-4" style={{ backgroundImage: `url(${meta.image})` }} />
        <BigFiveQuiz trait={activeTrait} />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Big Five Personality</CardTitle>
          <CardDescription>
            Explore five core traits. Open any to take a 30-question MCQ quiz with instant feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bigFiveMeta.map(({ trait, image, description }) => (
              <div key={trait} className="rounded-lg border bg-card overflow-hidden flex flex-col">
                <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-semibold mb-1">{trait}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{description}</p>
                  <div className="mt-auto">
                    <Button onClick={() => setActiveTrait(trait)}>Start</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const QuizSection = ({
  title,
  description,
  questions,
  category,
}: {
  title: string;
  description: string;
  questions: QuizQuestion[];
  category: QuizResult['category'];
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => computeScore(answers), [answers]);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {questions.map((q) => (
            <div key={q.id} className="rounded-lg border bg-card overflow-hidden">
              {q.image && (
                <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${q.image})` }} />
              )}
              <div className="p-4 space-y-3">
                <p className="font-medium">{q.prompt}</p>
                <div className="flex flex-col gap-2">
                  {q.choices.map((c) => (
                    <label key={c.id} className={`cursor-pointer rounded-md border p-3 text-sm flex items-center justify-between ${answers[q.id] === c.value ? 'border-primary bg-primary/5' : ''}`}>
                      <span>{c.label}</span>
                      <input
                        type="radio"
                        name={q.id}
                        className="h-4 w-4"
                        checked={answers[q.id] === c.value}
                        onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: c.value }))}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {Object.keys(answers).length}/{questions.length} answered • Score estimate: {score}%
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
            >
              Reset
            </Button>
            <Button
              disabled={!allAnswered}
              onClick={() => {
                const result: QuizResult = {
                  category,
                  score,
                  answers,
                  createdAt: new Date().toISOString(),
                };
                saveResult(result);
                setSubmitted(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>

        {submitted && (
          <div className="rounded-lg border p-4 bg-muted/30">
            <p className="font-medium mb-1">Thanks! Your result has been saved.</p>
            <p className="text-sm text-muted-foreground">
              You can revisit later — we keep a history of your assessments for future analysis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ---------------- Skills Topics Data & Components ----------------
type SkillTopic = 'Communication' | 'Teamwork' | 'Reliability' | 'Problem Solving' | 'Organisation and planning' | 'Initiative' | 'Self Management' | 'Leadership' | 'Learning' | 'Technology';

type SkillQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
};

const skillsMeta: { topic: SkillTopic; image: string; description: string }[] = [
  { topic: 'Communication', image: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=1200&auto=format&fit=crop', description: 'Clear expression, active listening, and audience awareness.' },
  { topic: 'Teamwork', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop', description: 'Collaboration, conflict resolution, and shared ownership.' },
  { topic: 'Reliability', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop', description: 'Consistency, accountability, and follow-through.' },
  { topic: 'Problem Solving', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop', description: 'Analysis, creativity, and solution testing.' },
  { topic: 'Organisation and planning', image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1200&auto=format&fit=crop', description: 'Prioritization, structuring tasks, and time management.' },
  { topic: 'Initiative', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop', description: 'Proactive actions and ownership beyond instructions.' },
  { topic: 'Self Management', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop', description: 'Self-regulation, resilience, and reflection.' },
  { topic: 'Leadership', image: 'https://images.unsplash.com/photo-1474403078171-7f199e9d4c4f?q=80&w=1200&auto=format&fit=crop', description: 'Vision, influence, and enabling others to perform.' },
  { topic: 'Learning', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop', description: 'Curiosity, feedback seeking, and growth mindset.' },
  { topic: 'Technology', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop', description: 'Tooling, digital literacy, and safe practices.' },
];

function generateSkillQuestions(topic: SkillTopic): SkillQuestion[] {
  const options = (i: number) => [
    { id: `a${i}`, label: 'Strongly disagree' },
    { id: `b${i}`, label: 'Disagree' },
    { id: `c${i}`, label: 'Neutral' },
    { id: `d${i}`, label: 'Agree' },
    { id: `e${i}`, label: 'Strongly agree' },
  ];
  const items: SkillQuestion[] = [];
  for (let i = 1; i <= 30; i++) {
    const prompt = `Q${i}. ${topic}: This statement measures ${topic.toLowerCase()} (item ${i}).`;
    const opts = options(i);
    const correct = opts[(i % 5)].id; // placeholder correct option for demo
    items.push({ id: `${topic}-${i}`, prompt, options: opts, correctOptionId: correct });
  }
  return items;
}

function saveSkillAttempt(topic: SkillTopic, questionId: string, chosenId: string, correct: boolean) {
  try {
    const key = 'skillAttempts';
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    parsed.push({ topic, questionId, chosenId, correct, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(parsed));
  } catch {}
}

const SkillQuiz = ({ topic }: { topic: SkillTopic }) => {
  const fallbackQuestions = useMemo(() => generateSkillQuestions(topic), [topic]);
  const [questions, setQuestions] = useState<SkillQuestion[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('assessment_questions')
        .select('id, category, sub_category, prompt, options, correct_option_id')
        .eq('category', 'skills')
        .eq('sub_category', topic)
        .limit(30);
      if (!mounted) return;
      if (!error && data && data.length) {
        const mapped: SkillQuestion[] = (data as AssessRow[]).map((r, idx) => ({
          id: r.id || `${topic}-${idx + 1}`,
          prompt: r.prompt,
          options: r.options,
          correctOptionId: r.correct_option_id,
        }));
        setQuestions(mapped);
      } else {
        setQuestions(fallbackQuestions);
      }
      setLoading(false);
      setIndex(0);
      setSelected(null);
      setSubmitted(false);
    })();
    return () => {
      mounted = false;
    };
  }, [topic]);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading questions…</div>;
  }

  if (!questions || questions.length === 0) {
    return <div className="text-sm text-muted-foreground">No questions found. Please seed questions in Supabase.</div>;
  }

  const q = questions[index];
  const isCorrect = submitted && selected === q.correctOptionId;
  const atEnd = index === questions.length - 1;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Question {index + 1} / {questions.length}</div>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-4 space-y-3">
          <p className="font-medium">{q.prompt}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => (
              <label key={opt.id} className={`cursor-pointer rounded-md border p-3 text-sm flex items-center justify-between ${selected === opt.id ? 'border-primary bg-primary/5' : ''}`}>
                <span>{opt.label}</span>
                <input
                  type="radio"
                  name={q.id}
                  className="h-4 w-4"
                  checked={selected === opt.id}
                  onChange={() => {
                    setSelected(opt.id);
                    setSubmitted(false);
                  }}
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {submitted ? (isCorrect ? 'Correct ✅' : 'Incorrect ❌') : 'Select an option to enable submit'}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
            }}
          >
            Clear
          </Button>
          {!submitted && (
            <Button
              disabled={!selected}
              onClick={() => {
                if (!selected) return;
                const correctNow = selected === q.correctOptionId;
                saveSkillAttempt(topic, q.id, selected, correctNow);
                // best-effort log to Supabase
                supabase.from('assessment_attempts').insert({
                  category: 'skills',
                  sub_category: topic,
                  question_id: q.id,
                  chosen_option_id: selected,
                  is_correct: correctNow,
                });
                setSubmitted(true);
              }}
            >
              Submit
            </Button>
          )}
          {submitted && (
            <Button
              onClick={() => {
                if (atEnd) {
                  setIndex(0);
                } else {
                  setIndex(index + 1);
                }
                setSelected(null);
                setSubmitted(false);
              }}
            >
              {atEnd ? 'Restart' : 'Next'}
            </Button>
          )}
        </div>
      </div>

      {submitted && (
        <div className={`rounded-lg border p-3 ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <p className="text-sm">
            {isCorrect ? 'Great job! Your answer is correct.' : 'Not quite.'} Correct answer:
            <span className="ml-1 font-medium">
              {q.options.find(o => o.id === q.correctOptionId)?.label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const SkillsAssessment = () => {
  const [activeTopic, setActiveTopic] = useState<SkillTopic | null>(null);

  if (activeTopic) {
    const meta = skillsMeta.find(m => m.topic === activeTopic)!;
    return (
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{activeTopic} Assessment</h3>
            <p className="text-sm text-muted-foreground">30 questions • Per-question submit with instant feedback</p>
          </div>
          <Button variant="outline" onClick={() => setActiveTopic(null)}>Back to topics</Button>
        </div>
        <div className="rounded-lg overflow-hidden h-40 w-full bg-cover bg-center mb-4" style={{ backgroundImage: `url(${meta.image})` }} />
        <SkillQuiz topic={activeTopic} />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Skills Assessment</CardTitle>
          <CardDescription>
            Choose a topic to take a 30-question MCQ with instant feedback and saved attempts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsMeta.map(({ topic, image, description }) => (
              <div key={topic} className="rounded-lg border bg-card overflow-hidden flex flex-col">
                <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-semibold mb-1">{topic}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{description}</p>
                  <div className="mt-auto">
                    <Button onClick={() => setActiveTopic(topic)}>Start</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CareerAssessment = () => {
  const { user } = useAuth();
  const [personalityData, setPersonalityData] = useState<any[]>([]);
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [interestsData, setInterestsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const [personality, skills, interests] = await Promise.all([
          supabase.from('personality_assessments').select('*').eq('user_id', user.id).order('completed_at', { ascending: false }),
          supabase.from('skills_assessments').select('*').eq('user_id', user.id).order('assessment_score', { ascending: false }),
          supabase.from('interest_surveys').select('*').eq('user_id', user.id).order('interest_level', { ascending: false })
        ]);
        
        setPersonalityData(personality.data || []);
        setSkillsData(skills.data || []);
        setInterestsData(interests.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  return (
    <div className="min-h-screen">
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroAssessment})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Career Matching & Assessment</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Personality, skills, and interests assessments to match you with the right career paths.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="personality" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personality" className="flex items-center gap-2"><Brain className="h-4 w-4" /> Personality</TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2"><Gauge className="h-4 w-4" /> Skills</TabsTrigger>
            <TabsTrigger value="interests" className="flex items-center gap-2"><Heart className="h-4 w-4" /> Interests</TabsTrigger>
          </TabsList>

          <TabsContent value="personality">
            <BigFivePersonality />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsAssessment />
          </TabsContent>

          <TabsContent value="interests">
            <QuizSection
              title="Interest Profiling"
              description="Identify themes that energize you and map to tracks."
              questions={interestsQuestions}
              category="interests"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerAssessment;


