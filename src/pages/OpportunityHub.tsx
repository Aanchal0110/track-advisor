import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building2, Calendar, Compass } from 'lucide-react';

const OpportunityHub = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Opportunity Hub</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Internships, jobs, company insights, and networking opportunities in one place.
          </p>
        </div>

        <Tabs defaultValue="jobs" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs" className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Jobs</TabsTrigger>
            <TabsTrigger value="culture" className="flex items-center gap-2"><Compass className="h-4 w-4" /> Culture</TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Events</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Internships & Job Board</CardTitle>
                <CardDescription>Curated opportunities aligned to your track.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Connect external job APIs and campus postings.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Company Culture Insights</CardTitle>
                <CardDescription>Reviews and values to help you choose the right fit.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Aggregate from review sources with sentiment summaries.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Networking Events</CardTitle>
                <CardDescription>Recommendations based on your interests and location.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Sync with calendars and RSVP directly.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OpportunityHub;


