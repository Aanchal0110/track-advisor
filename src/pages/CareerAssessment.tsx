import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, Gauge, Heart } from 'lucide-react';
import heroAssessment from '@/assets/hero-assessment.jpg';

const CareerAssessment = () => {
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
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Personality Assessment</CardTitle>
                <CardDescription>Supports Myers-Briggs and Big Five frameworks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Start a guided assessment to discover your work style and strengths.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Measure competencies with progress tracking and recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Track your proficiency across core subjects and see gaps to focus on.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interests">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Interest Profiling</CardTitle>
                <CardDescription>Find compatibility scores with tracks based on your interests.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Answer a short quiz to see which tracks fit you best.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerAssessment;


