import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StaticTrackCardProps {
  title: string;
  description: string;
  futureScope: string[];
  subjects: string[];
  slug: string;
  icon: React.ReactNode;
  gradient: string;
}

const StaticTrackCard = ({ title, description, futureScope, subjects, slug, icon, gradient }: StaticTrackCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <div 
            className="p-3 rounded-lg text-white"
            style={{ background: gradient }}
          >
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Future Scope */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-foreground">Future Opportunities</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {futureScope.slice(0, 3).map((scope, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {scope}
              </Badge>
            ))}
            {futureScope.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{futureScope.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Key Subjects */}
        <div>
          <span className="text-sm font-medium text-foreground mb-2 block">Key Subjects</span>
          <div className="flex flex-wrap gap-1">
            {subjects.slice(0, 4).map((subject, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {subject}
              </Badge>
            ))}
            {subjects.length > 4 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{subjects.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/track/${slug}`}>
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90">
            <Link to={`/track/${slug}/quiz`}>
              Take Quiz
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaticTrackCard;