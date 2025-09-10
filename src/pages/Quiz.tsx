import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { tracks } from '@/data/tracks';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const dataAnalyticsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary purpose of data visualization?",
    options: [
      "To make data look pretty",
      "To communicate insights clearly and effectively",
      "To hide complex information",
      "To replace statistical analysis"
    ],
    correctAnswer: 1,
    explanation: "Data visualization's main purpose is to communicate insights clearly and help people understand patterns in data."
  },
  {
    id: 2,
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    correctAnswer: 2,
    explanation: "SELECT is the SQL command used to query and retrieve data from database tables."
  },
  {
    id: 3,
    question: "What does ETL stand for in data processing?",
    options: [
      "Extract, Transform, Load",
      "Evaluate, Test, Launch",
      "Export, Transfer, Link",
      "Engage, Track, Learn"
    ],
    correctAnswer: 0,
    explanation: "ETL stands for Extract, Transform, Load - the process of extracting data from sources, transforming it, and loading it into a destination system."
  },
  {
    id: 4,
    question: "Which Python library is most commonly used for data manipulation?",
    options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
    correctAnswer: 1,
    explanation: "While all are important, Pandas is specifically designed for data manipulation and analysis, making it the most commonly used for this purpose."
  },
  {
    id: 5,
    question: "What is a key difference between correlation and causation?",
    options: [
      "They are the same thing",
      "Correlation implies causation",
      "Correlation shows relationship, causation shows cause-effect",
      "Causation is stronger than correlation"
    ],
    correctAnswer: 2,
    explanation: "Correlation shows a statistical relationship between variables, while causation indicates that one variable directly causes changes in another."
  }
];

const Quiz = () => {
  const { slug } = useParams();
  const track = tracks.find(t => t.id === slug);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // For demo purposes, using data analytics quiz for all tracks
  const quizQuestions = dataAnalyticsQuiz;

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Track Not Found</h1>
          <Button asChild>
            <Link to="/tracks">Back to Tracks</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizQuestions.length) * 100;
  };

  const getRecommendation = (score: number) => {
    if (score >= 80) {
      return {
        level: "Excellent Match",
        message: "You show strong aptitude for this field! This track aligns perfectly with your knowledge and interests.",
        color: "text-success",
        icon: CheckCircle
      };
    } else if (score >= 60) {
      return {
        level: "Good Match",
        message: "You have a solid foundation for this track. With some additional preparation, you'll do great!",
        color: "text-career-blue",
        icon: TrendingUp
      };
    } else {
      return {
        level: "Consider Other Options",
        message: "This track might be challenging. Consider exploring other tracks or building foundational knowledge first.",
        color: "text-warning",
        icon: AlertTriangle
      };
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/tracks" className="hover:text-primary">Tracks</Link>
            <span>/</span>
            <Link to={`/track/${track.id}`} className="hover:text-primary">{track.title}</Link>
            <span>/</span>
            <span className="text-foreground">Quiz</span>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div 
                className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center text-white"
                style={{ background: track.gradient }}
              >
                <track.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl mb-2">{track.title} Aptitude Quiz</CardTitle>
              <CardDescription className="text-lg">
                Test your knowledge and see if this track is right for you!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">What to Expect:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• {quizQuestions.length} multiple-choice questions</li>
                  <li>• Estimated time: 10-15 minutes</li>
                  <li>• Personalized recommendations based on your score</li>
                  <li>• No time limit - take your time to think</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
                  onClick={() => setQuizStarted(true)}
                >
                  Start Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to={`/track/${track.id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Track
                  </Link>
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
    const RecommendationIcon = recommendation.icon;

    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div 
                className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center text-white"
                style={{ background: track.gradient }}
              >
                <track.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
              <CardDescription>
                Here are your results for {track.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground mb-2">
                  {Math.round(score)}%
                </div>
                <div className="text-muted-foreground">
                  You got {selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length} out of {quizQuestions.length} questions correct
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <RecommendationIcon className={`h-6 w-6 ${recommendation.color}`} />
                  <h3 className={`text-xl font-semibold ${recommendation.color}`}>
                    {recommendation.level}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {recommendation.message}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Question Review:</h3>
                {quizQuestions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer;
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-foreground mb-2">
                            {index + 1}. {question.question}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Your answer: {question.options[selectedAnswers[index]]}
                          </div>
                          {!isCorrect && (
                            <div className="text-sm text-success mb-2">
                              Correct answer: {question.options[question.correctAnswer]}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground">
                            {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
                  asChild
                >
                  <Link to={`/track/${track.id}`}>
                    Explore Track Details
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/tracks">
                    Try Other Tracks
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            <Badge variant="secondary">
              {track.title} Quiz
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 hover:border-primary/50 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary/5 text-primary font-medium'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary text-white'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;