import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';
import { Tables } from '@/integrations/supabase/types';

type Track = Tables<'tracks'>;
type QuizResult = Tables<'quiz_results'>;

interface FeedbackDialogProps {
  track?: Track;
  quizResult?: QuizResult;
  children?: React.ReactNode;
}

export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ 
  track, 
  quizResult, 
  children 
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Give Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-0">
        <FeedbackForm 
          track={track} 
          quizResult={quizResult} 
          onClose={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};