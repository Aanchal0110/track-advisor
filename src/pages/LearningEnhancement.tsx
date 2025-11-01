import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Trophy, GraduationCap, Route, ExternalLink, DollarSign, Clock, User, MessageSquare } from 'lucide-react';
import heroLearning from '@/assets/hero-learning.jpg';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

type Certification = {
  id: string;
  certification_name: string;
  provider: string;
  description: string;
  duration: string;
  cost: number;
  certification_url: string;
  track_id: string | null;
};

const CertificationsTab = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterProvider, setFilterProvider] = useState<string>('all');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        let query = (supabase as any)
          .from('certifications')
          .select('id, certification_name, provider, description, duration, cost, certification_url, track_id')
          .order('provider', { ascending: true })
          .order('certification_name', { ascending: true });

        if (filterProvider !== 'all') {
          query = query.eq('provider', filterProvider);
        }

        const { data, error: err } = await query;

        if (!mounted) return;
        if (err) {
          console.error('Error fetching certifications:', err);
          if (err.message?.includes('does not exist') || err.message?.includes('schema cache')) {
            setError('Table certifications not found or column names don\'t match.');
          } else {
            setError(err.message || 'Failed to load certifications');
          }
          setCertifications([]);
        } else if (data) {
          setCertifications(data as Certification[]);
        }
      } catch (e) {
        console.error('Exception fetching certifications:', e);
        setError('An error occurred');
        setCertifications([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [filterProvider]);

  const providers = Array.from(new Set(certifications.map(c => c.provider))).sort();

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground">Loading certifications…</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-sm text-destructive mb-2">Error: {error}</div>
          <div className="text-xs text-muted-foreground">
            Make sure the certifications table has columns: certification_name, provider, description, duration, cost, certification_url.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Certification Roadmaps</CardTitle>
          <CardDescription>AWS, Google, Microsoft and more. {certifications.length} certifications available.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {certifications.length > 0 && providers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterProvider === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterProvider('all')}
              >
                All Providers
              </Button>
              {providers.slice(0, 10).map((p) => (
                <Button
                  key={p}
                  variant={filterProvider === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterProvider(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          )}

          {certifications.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-8">
              No certifications found. Make sure the certifications table has data.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{cert.certification_name}</CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">{cert.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">{cert.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {cert.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${cert.cost === 0 ? 'Free' : cert.cost}
                      </span>
                    </div>
                    <div className="mt-auto pt-2">
                      <Button asChild size="sm" variant="outline" className="w-full">
                        <a href={cert.certification_url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          Learn More
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

type Mentor = {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo_url?: string | null;
  profile_url?: string | null;
  expertise: string[];
};

const GuidanceTab = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch mentors matching actual table structure (no bio, no availability)
        const { data, error: err } = await (supabase as any)
          .from('mentors')
          .select('id, name, designation, department, photo_url, profile_url, expertise')
          .order('name', { ascending: true });

        if (!mounted) return;
        if (err) {
          console.error('Error fetching mentors:', err);
          // If table doesn't exist, just show empty state instead of error
          if (err.message?.includes('does not exist') || err.message?.includes('schema cache')) {
            console.log('Table not found, showing empty state');
            setMentors([]);
            setError(null); // Don't show error, just show empty state
          } else {
            setError(err.message || 'Failed to load mentors');
            setMentors([]);
          }
        } else if (data) {
          setMentors(data as Mentor[]);
        } else {
          setMentors([]);
        }
      } catch (e) {
        console.error('Exception fetching mentors:', e);
        setError('An error occurred');
        setMentors([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filteredMentors = mentors.filter(mentor => {
    const search = searchQuery.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(search) ||
      mentor.designation?.toLowerCase().includes(search) ||
      mentor.department?.toLowerCase().includes(search) ||
      mentor.expertise?.some(exp => exp.toLowerCase().includes(search))
    );
  });

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground">Loading mentors…</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-sm text-destructive mb-2">Error: {error}</div>
          <div className="rounded-lg border bg-muted/30 p-4 mt-4">
            <p className="text-sm font-medium mb-2">⚠️ Setup Required</p>
            <p className="text-sm text-muted-foreground mb-2">
              The <code className="bg-background px-1 rounded">mentors</code> table doesn't exist yet.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>To create the table:</strong> Go to Supabase SQL Editor → Run <code className="bg-background px-1 rounded">mentors_schema.sql</code> (located in <code className="bg-background px-1 rounded">supabase/sql/</code>)
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Mentor Guidance</CardTitle>
          <CardDescription>Connect with experienced mentors for career guidance and support.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search mentors by name, designation, department, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'} found
            </div>
          </div>

          {mentors.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <div className="text-sm text-muted-foreground">No mentors found.</div>
              {!error && (
                <div className="text-xs text-muted-foreground">
                  Add mentors to the <code className="bg-muted px-1 rounded">mentors</code> table in Supabase to display them here.
                </div>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => {
                const initials = mentor.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
                return (
                  <Card key={mentor.id} className="flex flex-col">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={mentor.photo_url || undefined} alt={mentor.name} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{mentor.name}</h3>
                          {mentor.designation && (
                            <p className="text-sm text-primary font-medium">{mentor.designation}</p>
                          )}
                          {mentor.department && (
                            <p className="text-sm text-muted-foreground">{mentor.department}</p>
                          )}
                        </div>
                      </div>

                             {mentor.expertise && mentor.expertise.length > 0 && (
                               <div className="mb-4">
                                 <p className="text-xs font-medium text-muted-foreground mb-2">Expertise</p>
                                 <div className="flex flex-wrap gap-2">
                                   {mentor.expertise.map((exp) => (
                                     <span key={exp} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                       {exp}
                                     </span>
                                   ))}
                                 </div>
                               </div>
                             )}

                      <div className="mt-auto pt-4 border-t flex gap-2">
                        {mentor.profile_url && (
                          <Button asChild size="sm" variant="outline" className="flex-1">
                            <a href={mentor.profile_url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                              <User className="h-3 w-3" />
                              Profile
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="default" className="flex-1">
                          <MessageSquare className="h-3 w-3 mr-2" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {searchQuery && filteredMentors.length === 0 && mentors.length > 0 && (
            <div className="text-sm text-muted-foreground text-center py-8">
              No mentors match "{searchQuery}". Try a different search term.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

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
            <TabsTrigger value="guidance" className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Guidance</TabsTrigger>
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

          <TabsContent value="guidance">
            <GuidanceTab />
          </TabsContent>

          <TabsContent value="certs">
            <CertificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningEnhancement;


