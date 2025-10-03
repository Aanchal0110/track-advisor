import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, Globe, Map } from 'lucide-react';

const IndustryIntelligence = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Industry Intelligence</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Job market data, salaries, and growth trends to inform your career choices.
          </p>
        </div>

        <Tabs defaultValue="market" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market" className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Market</TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2"><Globe className="h-4 w-4" /> Growth</TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2"><Map className="h-4 w-4" /> Location</TabsTrigger>
          </TabsList>

          <TabsContent value="market">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Real-time Job Market</CardTitle>
                <CardDescription>Openings, salaries, and demand by track and role.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Integrate with labor market APIs (e.g., Adzuna, Levels.fyi) for live data.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Growth Predictions</CardTitle>
                <CardDescription>See projected growth and emerging roles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Show trend charts and projections by specialization.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Location Insights</CardTitle>
                <CardDescription>Regional salary medians and demand heatmaps.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Add geo filters to personalize opportunities near you.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndustryIntelligence;


