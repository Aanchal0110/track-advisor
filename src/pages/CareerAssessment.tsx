import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, Gauge, Heart, Award, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import heroAssessment from '@/assets/hero-assessment.jpg';

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
      {/* Hero Section */}
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
            <div className="mt-6 space-y-4">
              {!user ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Please sign in to view your personality assessments.</p>
                  </CardContent>
                </Card>
              ) : loading ? (
                <div className="text-sm text-muted-foreground">Loading assessments...</div>
              ) : personalityData.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">No personality assessments completed yet. Take an assessment to see your results here.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {personalityData.map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          {assessment.personality_type}
                        </CardTitle>
                        <CardDescription>
                          Completed {new Date(assessment.completed_at).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-sm font-medium mb-2">Personality Traits:</div>
                          <div className="space-y-2">
                            {Object.entries(assessment.traits as Record<string, number>).map(([trait, score]) => (
                              <div key={trait} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{trait}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${score}%` }} />
                                  </div>
                                  <span className="text-sm text-muted-foreground w-10 text-right">{score}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-2">Career Matches:</div>
                          <div className="flex flex-wrap gap-2">
                            {assessment.career_matches?.map((career: string) => (
                              <Badge key={career}>{career}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="mt-6 space-y-4">
              {!user ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Please sign in to view your skills assessments.</p>
                  </CardContent>
                </Card>
              ) : loading ? (
                <div className="text-sm text-muted-foreground">Loading skills...</div>
              ) : skillsData.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">No skills assessments completed yet. Take an assessment to see your results here.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillsData.map((skill) => (
                    <Card key={skill.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          {skill.skill_name}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant="outline">{skill.skill_category}</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Assessment Score</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${skill.assessment_score}%` }} />
                            </div>
                            <span className="font-semibold">{skill.assessment_score}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Proficiency Level</div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-full rounded ${
                                  i < skill.proficiency_level ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Assessed {new Date(skill.completed_at).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="interests">
            <div className="mt-6 space-y-4">
              {!user ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Please sign in to view your interest surveys.</p>
                  </CardContent>
                </Card>
              ) : loading ? (
                <div className="text-sm text-muted-foreground">Loading interests...</div>
              ) : interestsData.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">No interest surveys completed yet. Complete a survey to see your results here.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interestsData.map((interest) => (
                    <Card key={interest.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          {interest.interest_area}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Interest Level</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${interest.interest_level * 10}%` }} />
                            </div>
                            <span className="font-semibold">{interest.interest_level}/10</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-medium mb-2">Related Careers:</div>
                          <div className="flex flex-wrap gap-2">
                            {interest.related_careers?.map((career: string) => (
                              <Badge key={career} variant="outline">{career}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Completed {new Date(interest.completed_at).toLocaleDateString()}
                        </div>
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

export default CareerAssessment;


