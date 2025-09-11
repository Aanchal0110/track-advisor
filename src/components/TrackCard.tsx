import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/integrations/supabase/types';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

type Track = Tables<'tracks'>;

interface TrackCardProps {
  track: Track;
  onClick: () => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, onClick }) => {
  // Get the icon component dynamically
  const IconComponent = track.icon ? (Icons as any)[track.icon] : Icons.BookOpen;
  
  return (
    <Card 
      className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm hover:shadow-glow transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-${track.color_scheme || 'primary'}/10`}>
              {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {track.track_name}
              </CardTitle>
              <CardDescription className="text-sm">{track.description}</CardDescription>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-muted-foreground text-sm">Future Scope:</span>
            <p className="text-sm mt-1 line-clamp-2">{track.future_scope}</p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <Badge 
              variant="outline" 
              className={`bg-${track.color_scheme || 'primary'}/10 border-${track.color_scheme || 'primary'}/20`}
            >
              Specialization Track
            </Badge>
            <span className="text-xs text-muted-foreground">Click to explore</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};