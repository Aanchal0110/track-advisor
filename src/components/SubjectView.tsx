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

  const renderResourceSection = (title: string, icon: React.ReactNode, resourceType: 'videos' | 'books' | 'references', items: string[]) => {
    if (!items || items.length === 0) return null;

    return (
      <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>
            {resourceType === 'videos' && 'Video tutorials and lectures'}
            {resourceType === 'books' && 'Books and study materials'}
            {resourceType === 'references' && 'Quick references and guides'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item: string, index: number) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {resourceType === 'videos' && <Video className="h-6 w-6 text-primary" />}
                {resourceType === 'books' && <FileText className="h-6 w-6 text-primary" />}
                {resourceType === 'references' && <ExternalLink className="h-6 w-6 text-primary" />}
                <div>
                  <p className="font-medium">{item}</p>
                  <p className="text-sm text-muted-foreground">
                    {resourceType === 'videos' && 'Video Content'}
                    {resourceType === 'books' && 'Study Material'}
                    {resourceType === 'references' && 'Quick Reference'}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleResourceClick(item)}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {resourceType === 'videos' ? 'Watch' : resourceType === 'books' ? 'Read' : 'View'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    );
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

      {/* Difficulty-based Resources */}
      <div className="grid gap-6">
        {/* Beginner Level */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Beginner Level
            </Badge>
          </div>
          {renderResourceSection('Beginner Videos', <Video className="h-5 w-5 text-primary" />, 'videos', resources?.beginner?.videos)}
          {renderResourceSection('Beginner Books', <FileText className="h-5 w-5 text-primary" />, 'books', resources?.beginner?.books)}
          {renderResourceSection('Beginner References', <ExternalLink className="h-5 w-5 text-primary" />, 'references', resources?.beginner?.references)}
        </div>

        {/* Intermediate Level */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Intermediate Level
            </Badge>
          </div>
          {renderResourceSection('Intermediate Videos', <Video className="h-5 w-5 text-primary" />, 'videos', resources?.intermediate?.videos)}
          {renderResourceSection('Intermediate Books', <FileText className="h-5 w-5 text-primary" />, 'books', resources?.intermediate?.books)}
          {renderResourceSection('Intermediate References', <ExternalLink className="h-5 w-5 text-primary" />, 'references', resources?.intermediate?.references)}
        </div>

        {/* Hard Level */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Expert Level
            </Badge>
          </div>
          {renderResourceSection('Expert Videos', <Video className="h-5 w-5 text-primary" />, 'videos', resources?.hard?.videos)}
          {renderResourceSection('Expert Books', <FileText className="h-5 w-5 text-primary" />, 'books', resources?.hard?.books)}
          {renderResourceSection('Expert References', <ExternalLink className="h-5 w-5 text-primary" />, 'references', resources?.hard?.references)}
        </div>

        {/* Empty State */}
        {!resources?.beginner && !resources?.intermediate && !resources?.hard && (
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