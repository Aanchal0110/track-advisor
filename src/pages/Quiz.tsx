import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, RotateCcw, Trophy, Brain, CheckCircle, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { FeedbackDialog } from '@/components/FeedbackDialog';

interface QuizQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  difficulty: 'beginner' | 'intermediate' | 'hard';
  explanation: string;
}

interface Track {
  id: string;
  track_name: string;
  description: string;
}

export default function Quiz() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [track, setTrack] = useState<Track | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedQuizResult, setSavedQuizResult] = useState<any>(null);

  useEffect(() => {
    fetchTrackAndQuestions();
  }, [slug]);

  const fetchTrackAndQuestions = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      
      // Fetch track information
      const { data: trackData, error: trackError } = await supabase
        .from('tracks')
        .select('id, track_name, description')
        .ilike('track_name', `%${slug.replace('-', ' ')}%`)
        .single();

      if (trackError || !trackData) {
        console.error('Track not found:', trackError);
        return;
      }

      setTrack(trackData);

      // Fetch all questions for this track
      const { data: questionsData, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('track_id', trackData.id);

      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        return;
      }

      // Randomize and select questions with proper difficulty distribution
      const shuffledQuestions = generateQuizQuestions(questionsData?.map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options as string),
        difficulty: q.difficulty as 'beginner' | 'intermediate' | 'hard'
      })) || []);
      setQuestions(shuffledQuestions);
      setSelectedAnswers(new Array(shuffledQuestions.length).fill(-1));
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQuizQuestions = (allQuestions: QuizQuestion[]): QuizQuestion[] => {
    // Separate questions by difficulty
    const beginnerQuestions = allQuestions.filter(q => q.difficulty === 'beginner');
    const intermediateQuestions = allQuestions.filter(q => q.difficulty === 'intermediate');
    const hardQuestions = allQuestions.filter(q => q.difficulty === 'hard');

    // Calculate number of questions per difficulty (total 10 questions)
    const totalQuestions = 10;
    const beginnerCount = Math.ceil(totalQuestions * 0.4); // 40% = 4 questions
    const intermediateCount = Math.ceil(totalQuestions * 0.3); // 30% = 3 questions
    const hardCount = totalQuestions - beginnerCount - intermediateCount; // 30% = 3 questions

    // Randomly select questions from each difficulty
    const selectedBeginner = shuffleArray(beginnerQuestions).slice(0, Math.min(beginnerCount, beginnerQuestions.length));
    const selectedIntermediate = shuffleArray(intermediateQuestions).slice(0, Math.min(intermediateCount, intermediateQuestions.length));
    const selectedHard = shuffleArray(hardQuestions).slice(0, Math.min(hardCount, hardQuestions.length));

    // Combine and shuffle all selected questions
    const combinedQuestions = [...selectedBeginner, ...selectedIntermediate, ...selectedHard];
    return shuffleArray(combinedQuestions);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = async () => {
    const score = calculateScore();
    const recommendation = getRecommendation(score);
    
    // Count difficulty distribution
    const difficultyDistribution = {
      beginner: questions.filter(q => q.difficulty === 'beginner').length,
      intermediate: questions.filter(q => q.difficulty === 'intermediate').length,
      hard: questions.filter(q => q.difficulty === 'hard').length
    };

    // Save quiz result if user is logged in
    if (user && track) {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .insert({
            user_id: user.id,
            track_id: track.id,
            score: score,
            answers: selectedAnswers,
            recommended: recommendation.recommended,
            difficulty_distribution: difficultyDistribution
          })
          .select()
          .single();

        if (error) {
          console.error('Error saving quiz result:', error);
        } else {
          toast.success('Quiz completed successfully!');
          setSavedQuizResult(data);
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }

    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index]?.correct_answer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getRecommendation = (score: number) => {
    if (score >= 70) {
      return {
        recommended: true,
        title: "Excellent Performance!",
        message: `You scored ${score}%! You have a strong foundation for this track and should definitely pursue it.`,
        color: "text-green-600"
      };
    } else if (score >= 50) {
      return {
        recommended: true,
        title: "Good Potential",
        message: `You scored ${score}%. With some additional study, this track could be a great fit for you.`,
        color: "text-yellow-600"
      };
    } else {
      return {
        recommended: false,
        title: "Consider Other Options",
        message: `You scored ${score}%. You might want to explore other tracks or spend more time building fundamentals in this area.`,
        color: "text-red-600"
      };
    }
  };

  const startNewQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSavedQuizResult(null);
    fetchTrackAndQuestions(); // This will regenerate questions
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-destructive mb-4">Track Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The requested track could not be found.
            </p>
            <Link to="/tracks">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tracks
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-0 shadow-elegant">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl">{track.track_name} Quiz</CardTitle>
              <p className="text-muted-foreground mt-2">
                {track.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>10 randomized questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>40% Beginner, 30% Intermediate, 30% Expert level questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Questions change with every attempt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Personalized recommendations based on performance</span>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Link to="/tracks">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Tracks
                  </Button>
                </Link>
                <Button 
                  onClick={() => setQuizStarted(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const recommendation = getRecommendation(score);
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index]?.correct_answer
    ).length;

    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-0 shadow-elegant">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl">Quiz Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{score}%</div>
                <div className="text-muted-foreground">
                  You got {correctAnswers} out of {questions.length} questions correct
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${recommendation.color}`}>
                <h3 className="font-semibold text-lg mb-2">{recommendation.title}</h3>
                <p>{recommendation.message}</p>
              </div>

              <div className="grid gap-4">
                <h4 className="font-semibold">Question Breakdown:</h4>
                {questions.map((question, index) => (
                  <div key={question.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={
                        question.difficulty === 'beginner' ? 'secondary' : 
                        question.difficulty === 'intermediate' ? 'default' : 'destructive'
                      }>
                        {question.difficulty}
                      </Badge>
                      <Badge variant={selectedAnswers[index] === question.correct_answer ? 'default' : 'destructive'}>
                        {selectedAnswers[index] === question.correct_answer ? 'Correct' : 'Wrong'}
                      </Badge>
                    </div>
                    <p className="font-medium mb-2">{question.question_text}</p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={startNewQuiz} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
                <Link to="/tracks">
                  <Button>
                    Explore More Tracks
                  </Button>
                </Link>
                <FeedbackDialog 
                  track={track ? {
                    id: track.id,
                    track_name: track.track_name,
                    description: track.description,
                    future_scope: '',
                    icon: null,
                    color_scheme: null,
                    created_at: new Date().toISOString()
                  } : undefined}
                  quizResult={savedQuizResult}
                >
                  <Button variant="secondary" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Share Feedback
                  </Button>
                </FeedbackDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-0 shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
              <Badge variant={
                currentQuestion?.difficulty === 'beginner' ? 'secondary' : 
                currentQuestion?.difficulty === 'intermediate' ? 'default' : 'destructive'
              }>
                {currentQuestion?.difficulty}
              </Badge>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-xl">{currentQuestion?.question_text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {currentQuestion?.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                  className="p-4 h-auto text-left justify-start"
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === -1}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}