import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Trophy, Badge as BadgeIcon, Route, Clock, ExternalLink, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import heroLearning from '@/assets/hero-learning.jpg';

const LearningEnhancement = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressData, badgesData, certsData] = await Promise.all([
          user ? supabase.from('user_progress').select('*, tracks(track_name)').eq('user_id', user.id).order('last_activity', { ascending: false }) : Promise.resolve({ data: [] }),
          user ? supabase.from('user_badges').select('*, badges(*)').eq('user_id', user.id).order('earned_at', { ascending: false }) : Promise.resolve({ data: [] }),
          supabase.from('certifications').select('*').order('certification_name')
        ]);
        
        setUserProgress(progressData.data || []);
        setUserBadges(badgesData.data || []);
        setCertifications(certsData.data || []);
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
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroLearning})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Learning Enhancement</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Track progress, earn badges, and follow certification roadmaps.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <Tabs defaultValue="progress" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress" className="flex items-center gap-2"><Trophy className="h-4 w-4" /> Progress</TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2"><BadgeIcon className="h-4 w-4" /> Badges</TabsTrigger>
            <TabsTrigger value="certs" className="flex items-center gap-2"><Route className="h-4 w-4" /> Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <div className="mt-6 space-y-4">
              {!user ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Please sign in to view your learning progress.</p>
                  </CardContent>
                </Card>
              ) : loading ? (
                <div className="text-sm text-muted-foreground">Loading progress...</div>
              ) : userProgress.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">No learning progress tracked yet. Start a track to see your progress here!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {userProgress.map((progress) => (
                    <Card key={progress.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5" />
                          {progress.tracks?.track_name || 'Track Progress'}
                        </CardTitle>
                        <CardDescription>
                          Last activity: {new Date(progress.last_activity).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm font-semibold">{progress.progress_percentage}%</span>
                          </div>
                          <Progress value={progress.progress_percentage} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Completed Modules</div>
                            <div className="text-2xl font-bold">{progress.completed_modules}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Total Modules</div>
                            <div className="text-2xl font-bold">{progress.total_modules}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <div className="mt-6 space-y-4">
              {!user ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Please sign in to view your badges.</p>
                  </CardContent>
                </Card>
              ) : loading ? (
                <div className="text-sm text-muted-foreground">Loading badges...</div>
              ) : userBadges.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">No badges earned yet. Keep learning to unlock achievements!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userBadges.map((userBadge) => (
                    <Card key={userBadge.id} className="text-center">
                      <CardContent className="pt-6">
                        <div className="text-4xl mb-2">{userBadge.badges?.icon || '🏆'}</div>
                        <h3 className="font-semibold mb-1">{userBadge.badges?.badge_name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{userBadge.badges?.description}</p>
                        <UIBadge variant="secondary">+{userBadge.badges?.points} points</UIBadge>
                        <div className="text-xs text-muted-foreground mt-3">
                          Earned {new Date(userBadge.earned_at).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="certs">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Certification Roadmaps</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading certifications...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <Card key={cert.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          {cert.certification_name}
                        </CardTitle>
                        <CardDescription>{cert.provider}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{cert.duration}</span>
                          </div>
                          {cert.cost !== null && (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Cost:</span>
                              <span>${cert.cost}</span>
                            </div>
                          )}
                        </div>
                        {cert.certification_url && (
                          <a
                            href={cert.certification_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            Learn More <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningEnhancement;


