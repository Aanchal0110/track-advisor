import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Briefcase, FileText, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import heroTools from '@/assets/hero-tools.jpg';

const CareerTools = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioData, templateData, questionData] = await Promise.all([
          user ? supabase.from('portfolios').select('*').eq('user_id', user.id).order('created_at', { ascending: false }) : Promise.resolve({ data: [] }),
          supabase.from('resume_templates').select('*').order('template_name'),
          supabase.from('interview_questions').select('*').order('category')
        ]);
        
        setPortfolios(portfolioData.data || []);
        setTemplates(templateData.data || []);
        setQuestions(questionData.data || []);
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
        style={{ backgroundImage: `url(${heroTools})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Career Development Tools</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Build your portfolio, tailor resumes by track, and practice interviews.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <Tabs defaultValue="portfolio" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio" className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Portfolio</TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center gap-2"><FileText className="h-4 w-4" /> Resume</TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Interviews</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="mt-6 space-y-4">
              {!user ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Please sign in to view your portfolios.</p>
                  </CardContent>
                </Card>
              ) : loading ? (
                <div className="text-sm text-muted-foreground">Loading portfolios...</div>
              ) : portfolios.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">No portfolios created yet. Start building your portfolio to showcase your work!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolios.map((portfolio) => (
                    <Card key={portfolio.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{portfolio.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{portfolio.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {portfolio.technologies?.map((tech: string) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                        {portfolio.project_url && (
                          <a
                            href={portfolio.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            View Project <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        <div className="text-xs text-muted-foreground">
                          Created {new Date(portfolio.created_at).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resume">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Resume Templates</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading templates...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{template.template_name}</CardTitle>
                          {template.is_premium && (
                            <Badge variant="default">Premium</Badge>
                          )}
                        </div>
                        <CardDescription>
                          <Badge variant="outline">{template.category}</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        {template.preview_image && (
                          <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                            <img 
                              src={template.preview_image} 
                              alt={template.template_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="interview">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Interview Questions</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading questions...</div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(
                    questions.reduce((acc, q) => {
                      if (!acc[q.category]) acc[q.category] = [];
                      acc[q.category].push(q);
                      return acc;
                    }, {} as Record<string, any[]>)
                  ).map(([category, categoryQuestions]) => (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5" />
                          {category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {(categoryQuestions as any[]).map((question) => (
                          <div key={question.id} className="border-b last:border-0 pb-4 last:pb-0">
                            <div className="flex items-start gap-2 mb-2">
                              <Badge variant={
                                question.difficulty_level === 'Hard' ? 'destructive' :
                                question.difficulty_level === 'Medium' ? 'default' : 'secondary'
                              }>
                                {question.difficulty_level}
                              </Badge>
                              <h4 className="font-medium flex-1">{question.question_text}</h4>
                            </div>
                            {question.explanation && (
                              <p className="text-sm text-muted-foreground mb-2">{question.explanation}</p>
                            )}
                            {question.sample_answer && (
                              <details className="text-sm">
                                <summary className="cursor-pointer text-primary hover:underline">View sample answer</summary>
                                <p className="mt-2 text-muted-foreground">{question.sample_answer}</p>
                              </details>
                            )}
                            {question.tips && Array.isArray(question.tips) && question.tips.length > 0 && (
                              <div className="mt-2">
                                <div className="text-sm font-medium">Tips:</div>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {(question.tips as string[]).map((tip: string, idx: number) => (
                                    <li key={idx}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
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

export default CareerTools;


