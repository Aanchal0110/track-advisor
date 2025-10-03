import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, Sparkles } from 'lucide-react';

const CareerTools = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Career Development Tools</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Build your portfolio, tailor resumes by track, and practice interviews.
          </p>
        </div>

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


