import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, Sparkles } from 'lucide-react';
import heroTools from '@/assets/hero-tools.jpg';

const CareerTools = () => {
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
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Portfolio Builder</CardTitle>
                <CardDescription>Showcase projects aligned to your chosen track.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Add case studies, links, and evidence of skills.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
                <CardDescription>Track-specific templates and keyword guidance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Generate role-matched bullet points automatically.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interview">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Mock Interviews</CardTitle>
                <CardDescription>Practice with AI feedback and sample questions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Coding, system design, and behavioral interview modes.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerTools;


