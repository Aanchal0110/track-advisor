import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Trophy, Badge, Route } from 'lucide-react';
import heroLearning from '@/assets/hero-learning.jpg';

const LearningEnhancement = () => {
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


