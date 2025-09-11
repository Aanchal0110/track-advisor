import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/integrations/supabase/types';
import { BookOpen, Video, FileText, ExternalLink, Download } from 'lucide-react';

type Subject = Tables<'subjects'>;

interface SubjectViewProps {
  subject: Subject;
}

export const SubjectView: React.FC<SubjectViewProps> = ({ subject }) => {
  const resources = subject.resources as any;

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Subject Overview */}
      <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{subject.subject_name}</CardTitle>
              {subject.subject_desc && (
                <CardDescription className="text-base mt-2">
                  {subject.subject_desc}
                </CardDescription>
              )}
            </div>
            <Badge variant="outline" className="bg-primary/10">
              <BookOpen className="h-4 w-4 mr-1" />
              Subject
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Resources Section */}
      <div className="grid gap-6">
        {resources?.pdf && (
          <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                PDF Resources
              </CardTitle>
              <CardDescription>
                Download or view PDF materials for this subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{subject.subject_name} - Study Material</p>
                    <p className="text-sm text-muted-foreground">PDF Document</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResourceClick(resources.pdf)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleDownload(resources.pdf, `${subject.subject_name}.pdf`)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {resources?.video && (
          <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Video Lectures
              </CardTitle>
              <CardDescription>
                Watch video tutorials and lectures for this subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Video className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{subject.subject_name} - Video Lecture</p>
                    <p className="text-sm text-muted-foreground">Video Content</p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleResourceClick(resources.video)}
                >
                  <Video className="h-4 w-4 mr-1" />
                  Watch
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {resources?.links && resources.links.length > 0 && (
          <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Additional Resources
              </CardTitle>
              <CardDescription>
                External links and additional study materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.links.map((link: string, index: number) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">External Resource {index + 1}</p>
                      <p className="text-sm text-muted-foreground">{link}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResourceClick(link)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!resources?.pdf && !resources?.video && (!resources?.links || resources.links.length === 0) && (
          <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Resources Available</h3>
              <p className="text-muted-foreground">
                Resources for this subject are being prepared. Check back later!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};