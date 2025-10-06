import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, Compass, MapPin, DollarSign, Briefcase, ExternalLink, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import heroOpportunities from '@/assets/hero-opportunities.jpg';

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
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Job Listings</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading jobs...</div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{job.job_title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Building2 className="h-4 w-4" />
                              {job.company_name}
                            </CardDescription>
                          </div>
                          <Badge>{job.job_type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{job.salary_range}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Requirements:</div>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements?.map((req: string) => (
                              <Badge key={req} variant="outline">{req}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-muted-foreground">
                            Posted {new Date(job.posted_at).toLocaleDateString()}
                          </span>
                          {job.apply_url && (
                            <a
                              href={job.apply_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              Apply Now <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="culture">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Company Culture</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading company data...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companies.map((company) => (
                    <Card key={company.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {company.company_name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-semibold">{company.avg_rating}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{company.employee_reviews} reviews</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Work-Life Balance</span>
                            <span className="font-medium">{company.work_life_balance}/5</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Culture Score</span>
                            <span className="font-medium">{company.culture_score}/5</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Benefits:</div>
                          <div className="flex flex-wrap gap-2">
                            {company.benefits?.map((benefit: string) => (
                              <Badge key={benefit} variant="secondary">{benefit}</Badge>
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


