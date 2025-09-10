import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Trophy, BookOpen, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Profile {
  id: string;
  full_name: string;
  college_name?: string;
  year_of_study?: string;
  branch_stream?: string;
}

interface QuizResult {
  id: string;
  track_name: string;
  score: number;
  recommended: boolean;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch quiz results with track names
      const { data: quizData } = await supabase
        .from('quiz_results')
        .select(`
          id,
          score,
          recommended,
          created_at,
          tracks (
            track_name
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (quizData) {
        const formattedResults = quizData.map(result => ({
          id: result.id,
          track_name: (result.tracks as any)?.track_name || 'Unknown Track',
          score: result.score,
          recommended: result.recommended,
          created_at: result.created_at
        }));
        setQuizResults(formattedResults);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const recommendedTrack = quizResults.find(result => result.recommended);
  const completedQuizzes = quizResults.length;
  const averageScore = quizResults.length > 0 
    ? Math.round(quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-career-bg-start to-career-bg-end flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-career-bg-start to-career-bg-end">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.full_name || 'Student'}!
            </h1>
            <p className="text-muted-foreground">
              Track your career exploration journey and discover your perfect path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Profile Card */}
            <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{profile?.full_name}</p>
                  {profile?.college_name && (
                    <p className="text-sm text-muted-foreground">{profile.college_name}</p>
                  )}
                  {profile?.branch_stream && (
                    <Badge variant="secondary">{profile.branch_stream}</Badge>
                  )}
                  {profile?.year_of_study && (
                    <p className="text-sm text-muted-foreground">Year: {profile.year_of_study}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quiz Stats */}
            <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Quiz Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <span className="font-bold">{completedQuizzes}/4</span>
                  </div>
                  <Progress value={(completedQuizzes / 4) * 100} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Score</span>
                    <span className="font-bold">{averageScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Track */}
            <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Recommended Track</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendedTrack ? (
                  <div className="space-y-3">
                    <p className="font-medium">{recommendedTrack.track_name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Best Match</Badge>
                      <span className="text-sm text-muted-foreground">
                        {recommendedTrack.score}% compatibility
                      </span>
                    </div>
                    <Button asChild size="sm" className="w-full">
                      <Link to={`/track/${recommendedTrack.track_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                        View Details <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete quizzes to get personalized recommendations
                    </p>
                    <Button asChild size="sm">
                      <Link to="/tracks">
                        Take Quiz <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Quiz Results */}
          {quizResults.length > 0 && (
            <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Recent Quiz Results</span>
                </CardTitle>
                <CardDescription>Your track exploration history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizResults.slice(0, 5).map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-primary">{result.score}%</div>
                        <div>
                          <p className="font-medium">{result.track_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(result.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {result.recommended && (
                        <Badge variant="default">Recommended</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No quizzes taken yet */}
          {quizResults.length === 0 && (
            <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Quizzes Taken Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring different career tracks by taking our specialized quizzes.
                </p>
                <Button asChild>
                  <Link to="/tracks">
                    Explore Tracks <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;