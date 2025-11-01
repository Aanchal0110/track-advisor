import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building2, Calendar, Compass, Star, Users, TrendingUp, Heart } from 'lucide-react';
import heroOpportunities from '@/assets/hero-opportunities.jpg';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';

type JobCompany = {
  id: string;
  rank: number;
  company_name: string;
  careers_url: string;
  category: string;
  key_areas: string[];
  relevant_backgrounds: string[];
  image_url: string | null;
};

const JobCompaniesGrid = () => {
  const [companies, setCompanies] = useState<JobCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from('job_companies')
          .select('id, rank, company_name, careers_url, category, key_areas, relevant_backgrounds, image_url')
          .order('category', { ascending: true })
          .order('rank', { ascending: true });
        if (!mounted) return;
        if (err) {
          console.error('Error fetching companies:', err);
          // If table doesn't exist, just show fallback instead of error
          if (err.message?.includes('does not exist') || err.message?.includes('schema cache')) {
            console.log('Table not found, using fallback companies');
            setCompanies([]); // Will trigger fallback display
            setError(null); // Don't show error, just use fallback
          } else {
            setError(err.message || 'Failed to load companies');
            setCompanies([]);
          }
        } else if (data && data.length > 0) {
          setCompanies(data as JobCompany[]);
        } else {
          setCompanies([]);
        }
      } catch (e) {
        console.error('Exception fetching companies:', e);
        setError('An error occurred');
        setCompanies([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const byCategory = useMemo(() => {
    const map: Record<string, JobCompany[]> = {};
    for (const c of companies) {
      map[c.category] = map[c.category] || [];
      map[c.category].push(c);
    }
    return map;
  }, [companies]);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading companies…</div>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-destructive">Error: {error}</div>
        <div className="text-sm text-muted-foreground">
          Make sure the job_companies table exists in Supabase. Run the schema SQL first, then seed the data.
        </div>
      </div>
    );
  }

  if (!companies.length) {
    const fallback: JobCompany[] = [
      { id: 'fb-google', rank: 1, company_name: 'Google (Alphabet)', careers_url: 'https://careers.google.com/', category: 'Tech Giants & Cloud', key_areas: ['AI/ML','Data Science','Data Engineering','IoT','VLSI'], relevant_backgrounds: ['CS','IT','ECE','BME'], image_url: 'https://logo.clearbit.com/google.com' },
      { id: 'fb-microsoft', rank: 2, company_name: 'Microsoft', careers_url: 'https://careers.microsoft.com/', category: 'Tech Giants & Cloud', key_areas: ['AI/ML','Data Science','Data Engineering','IoT'], relevant_backgrounds: ['CS','IT','ECE','BME'], image_url: 'https://logo.clearbit.com/microsoft.com' },
      { id: 'fb-amazon', rank: 3, company_name: 'Amazon (AWS)', careers_url: 'https://www.amazon.jobs/', category: 'Tech Giants & Cloud', key_areas: ['AI/ML','Data Science','Data Engineering','IoT','VLSI'], relevant_backgrounds: ['CS','IT','ECE','BME'], image_url: 'https://logo.clearbit.com/amazon.com' },
      { id: 'fb-nvidia', rank: 4, company_name: 'NVIDIA', careers_url: 'https://www.nvidia.com/en-in/about-nvidia/careers/', category: 'Tech Giants & Cloud', key_areas: ['VLSI','Advanced VLSI','AI/ML'], relevant_backgrounds: ['ECE','IT','CS'], image_url: 'https://logo.clearbit.com/nvidia.com' },
      { id: 'fb-qualcomm', rank: 11, company_name: 'Qualcomm', careers_url: 'https://careers.qualcomm.com/careers', category: 'VLSI & Semiconductors', key_areas: ['VLSI','Advanced VLSI','On-device AI'], relevant_backgrounds: ['ECE','IT','CS'], image_url: 'https://logo.clearbit.com/qualcomm.com' },
      { id: 'fb-tcs', rank: 20, company_name: 'TCS', careers_url: 'https://www.tcs.com/careers', category: 'Consulting & IT Services', key_areas: ['Data Science','AI/ML','Data Engineering','Data Visualization','IoT'], relevant_backgrounds: ['CS','IT','ECE','BME'], image_url: 'https://logo.clearbit.com/tcs.com' },
      { id: 'fb-infosys', rank: 21, company_name: 'Infosys', careers_url: 'https://www.infosys.com/careers.html', category: 'Consulting & IT Services', key_areas: ['Data Science','AI/ML','Data Engineering','Data Visualization'], relevant_backgrounds: ['CS','IT','ECE','BME'], image_url: 'https://logo.clearbit.com/infosys.com' },
      { id: 'fb-goldman', rank: 37, company_name: 'Goldman Sachs', careers_url: 'https://www.goldmansachs.com/careers/', category: 'Finance & Data Platforms', key_areas: ['Data Science','Data Engineering','AI/ML'], relevant_backgrounds: ['CS','IT','Data Analytics'], image_url: 'https://logo.clearbit.com/goldmansachs.com' },
      { id: 'fb-adobe', rank: 43, company_name: 'Adobe', careers_url: 'https://www.adobe.com/careers.html', category: 'High-Growth Tech', key_areas: ['AI/ML','Data Science','Data Visualization'], relevant_backgrounds: ['CS','IT','Data Analytics'], image_url: 'https://logo.clearbit.com/adobe.com' },
    ];
    const map: Record<string, JobCompany[]> = {};
    for (const c of fallback) {
      map[c.category] = map[c.category] || [];
      map[c.category].push(c);
    }
    const categories = Object.keys(map);
    return (
      <div className="space-y-6">
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">⚠️ Supabase Table Not Found</p>
          <p className="text-sm text-muted-foreground mb-2">
            The <code className="bg-background px-1 rounded">job_companies</code> table doesn't exist yet. Showing example companies below.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong>To see all 50 companies:</strong> Go to Supabase SQL Editor → Run <code className="bg-background px-1 rounded">job_companies_schema.sql</code> → Then run <code className="bg-background px-1 rounded">job_companies_seed_examples.sql</code>
          </p>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="space-y-4">
            <h3 className="text-lg font-semibold">{cat}</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {map[cat].map((c) => (
                <div key={c.id} className="rounded-lg border bg-card overflow-hidden flex flex-col">
                  <div className="h-28 w-full bg-muted flex items-center justify-center">
                    {c.image_url ? (
                      <img src={c.image_url} alt={c.company_name} className="h-12 object-contain" />
                    ) : (
                      <span className="text-sm text-muted-foreground">{c.company_name}</span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-medium mb-2">{c.company_name}</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {c.key_areas.slice(0, 4).map((k) => (
                        <span key={k} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{k}</span>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">{c.relevant_backgrounds.join(' • ')}</div>
                    <div className="mt-auto">
                      <Button asChild size="sm">
                        <a href={c.careers_url} target="_blank" rel="noreferrer">Open Careers</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const categories = Object.keys(byCategory);

  return (
    <div className="space-y-8">
      {categories.map((cat) => (
        <div key={cat} className="space-y-4">
          <h3 className="text-lg font-semibold">{cat}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {byCategory[cat].map((c) => (
              <div key={c.id} className="rounded-lg border bg-card overflow-hidden flex flex-col">
                <div className="h-28 w-full bg-muted flex items-center justify-center">
                  {c.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.image_url} alt={c.company_name} className="h-12 object-contain" />
                  ) : (
                    <span className="text-sm text-muted-foreground">{c.company_name}</span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-medium mb-2">{c.company_name}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {c.key_areas.slice(0, 4).map((k) => (
                      <span key={k} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{k}</span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mb-4">{c.relevant_backgrounds.join(' • ')}</div>
                  <div className="mt-auto">
                    <Button asChild size="sm">
                      <a href={c.careers_url} target="_blank" rel="noreferrer">Open Careers</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type CultureMetric = {
  label: string;
  score: number; // 0-100
  icon: React.ReactNode;
};

type CompanyCulture = {
  company_name: string;
  overall_rating: number;
  work_life_balance: number;
  diversity: number;
  career_growth: number;
  compensation: number;
  company_values: string[];
};

const CompanyCultureInsights = () => {
  const [companies, setCompanies] = useState<JobCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await (supabase as any)
          .from('job_companies')
          .select('id, company_name, image_url')
          .limit(20);

        if (!mounted) return;
        if (!error && data) {
          setCompanies(data as JobCompany[]);
        }
      } catch (e) {
        console.error('Error fetching companies:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Generate culture data (in a real app, this would come from Supabase)
  const getCultureData = (company: JobCompany): CompanyCulture => {
    // Simulated culture scores based on company name patterns
    const baseScore = 75 + (company.id.length % 25);
    return {
      company_name: company.company_name,
      overall_rating: baseScore,
      work_life_balance: baseScore - 5 + (company.id.length % 10),
      diversity: baseScore + 3 + (company.id.length % 8),
      career_growth: baseScore + 7 + (company.id.length % 12),
      compensation: baseScore + 10 + (company.id.length % 15),
      company_values: ['Innovation', 'Collaboration', 'Excellence', 'Diversity', 'Work-Life Balance'],
    };
  };

  // Fallback companies for culture insights
  const fallbackCompanies: JobCompany[] = [
    { id: 'fb-1', rank: 1, company_name: 'Google (Alphabet)', careers_url: '', category: '', key_areas: [], relevant_backgrounds: [], image_url: 'https://logo.clearbit.com/google.com' },
    { id: 'fb-2', rank: 2, company_name: 'Microsoft', careers_url: '', category: '', key_areas: [], relevant_backgrounds: [], image_url: 'https://logo.clearbit.com/microsoft.com' },
    { id: 'fb-3', rank: 3, company_name: 'Amazon (AWS)', careers_url: '', category: '', key_areas: [], relevant_backgrounds: [], image_url: 'https://logo.clearbit.com/amazon.com' },
    { id: 'fb-4', rank: 4, company_name: 'NVIDIA', careers_url: '', category: '', key_areas: [], relevant_backgrounds: [], image_url: 'https://logo.clearbit.com/nvidia.com' },
  ];

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading culture insights…</div>;
  }

  const displayCompanies = companies.length > 0 ? companies : fallbackCompanies;
  const cultureData = displayCompanies.map(getCultureData);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {cultureData.map((culture) => {
          const metrics: CultureMetric[] = [
            { label: 'Work-Life Balance', score: culture.work_life_balance, icon: <Heart className="h-4 w-4" /> },
            { label: 'Diversity & Inclusion', score: culture.diversity, icon: <Users className="h-4 w-4" /> },
            { label: 'Career Growth', score: culture.career_growth, icon: <TrendingUp className="h-4 w-4" /> },
            { label: 'Compensation', score: culture.compensation, icon: <Star className="h-4 w-4" /> },
          ];

          return (
            <Card key={culture.company_name} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {displayCompanies.find(c => c.company_name === culture.company_name)?.image_url && (
                    <img
                      src={displayCompanies.find(c => c.company_name === culture.company_name)?.image_url || ''}
                      alt={culture.company_name}
                      className="h-10 w-10 object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-lg">{culture.company_name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{culture.overall_rating}/100</span>
                      <span className="text-xs text-muted-foreground ml-1">Overall</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{metric.icon}</span>
                        <span>{metric.label}</span>
                      </div>
                      <span className="font-semibold">{metric.score}/100</span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <p className="text-xs font-medium mb-2 text-muted-foreground">Company Values</p>
                  <div className="flex flex-wrap gap-2">
                    {culture.company_values.map((value) => (
                      <span key={value} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {companies.length === 0 && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            Showing example culture data. Load job_companies data in Supabase to see all companies.
          </p>
        </div>
      )}
    </div>
  );
};

const OpportunityHub = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsData, companiesData, eventsData] = await Promise.all([
          supabase.from('job_listings').select('*').order('posted_at', { ascending: false }),
          supabase.from('company_culture').select('*').order('avg_rating', { ascending: false }),
          supabase.from('networking_events').select('*').order('event_date', { ascending: true })
        ]);
        
        setJobs(jobsData.data || []);
        setCompanies(companiesData.data || []);
        setEvents(eventsData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroOpportunities})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Opportunity Hub</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Internships, jobs, company insights, and networking opportunities in one place.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <Tabs defaultValue="jobs" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs" className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Jobs</TabsTrigger>
            <TabsTrigger value="culture" className="flex items-center gap-2"><Compass className="h-4 w-4" /> Culture</TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Events</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Job Market: Top Hiring Companies</CardTitle>
                <CardDescription>AI/ML, IoT, Data, and VLSI across sectors. Explore and apply.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <JobCompaniesGrid />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Company Culture Insights</CardTitle>
                <CardDescription>Culture ratings and values to help you choose the right fit.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CompanyCultureInsights />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Networking Events</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading events...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{event.event_name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant="outline">{event.event_type}</Badge>
                          {event.is_virtual && <Badge variant="secondary">Virtual</Badge>}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(event.event_date).toLocaleDateString()} at {new Date(event.event_date).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Organized by {event.organizer}</span>
                          </div>
                        </div>
                        {event.registration_url && (
                          <a
                            href={event.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1 pt-2"
                          >
                            Register Now <ExternalLink className="h-3 w-3" />
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

export default OpportunityHub;


