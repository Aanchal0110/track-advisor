import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Trophy, Badge, Route } from 'lucide-react';

const LearningEnhancement = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Learning Enhancement</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Track progress, earn badges, and follow certification roadmaps.
          </p>
        </div>

        <Tabs defaultValue="progress" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress" className="flex items-center gap-2"><Trophy className="h-4 w-4" /> Progress</TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2"><Badge className="h-4 w-4" /> Badges</TabsTrigger>
            <TabsTrigger value="certs" className="flex items-center gap-2"><Route className="h-4 w-4" /> Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Monitor your learning journey across tracks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Connect quiz results to personalized learning paths.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
                <CardDescription>Earn milestones as you level up skills.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Showcase achievements on your profile and resume.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certs">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Certification Roadmaps</CardTitle>
                <CardDescription>AWS, Google, Microsoft and more.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Step-by-step plans aligned to your track.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningEnhancement;


