import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Tables } from '@/integrations/supabase/types';

type Track = Tables<'tracks'>;
type QuizResult = Tables<'quiz_results'>;

interface FeedbackFormProps {
  track?: Track;
  quizResult?: QuizResult;
  onClose?: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  track, 
  quizResult, 
  onClose 
}) => {
  const [rating, setRating] = useState<number>(0);
  const [satisfaction, setSatisfaction] = useState<string>('');
  const [feedbackText, setFeedbackText] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [trackUsefulness, setTrackUsefulness] = useState<number>(0);
  const [quizHelpfulness, setQuizHelpfulness] = useState<number>(0);
  const [improvements, setImprovements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const satisfactionLevels = [
    { value: 'very_unsatisfied', label: 'Very Unsatisfied', color: 'bg-red-100 text-red-800' },
    { value: 'unsatisfied', label: 'Unsatisfied', color: 'bg-orange-100 text-orange-800' },
    { value: 'neutral', label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    { value: 'satisfied', label: 'Satisfied', color: 'bg-blue-100 text-blue-800' },
    { value: 'very_satisfied', label: 'Very Satisfied', color: 'bg-green-100 text-green-800' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !satisfaction) {
      toast({
        title: "Missing Information",
        description: "Please provide a rating and satisfaction level.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit feedback.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          track_id: track?.id || null,
          quiz_result_id: quizResult?.id || null,
          rating,
          satisfaction_level: satisfaction,
          feedback_text: feedbackText || null,
          would_recommend: wouldRecommend,
          improvement_suggestions: improvements || null,
          track_usefulness: trackUsefulness || null,
          quiz_helpfulness: quizHelpfulness || null,
        });

      if (error) throw error;

      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted successfully.",
        variant: "default",
      });

      // Reset form
      setRating(0);
      setSatisfaction('');
      setFeedbackText('');
      setWouldRecommend(null);
      setTrackUsefulness(0);
      setQuizHelpfulness(0);
      setImprovements('');
      
      if (onClose) onClose();
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    label: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-colors"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-elegant bg-card/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-career-blue to-career-purple rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">We Value Your Feedback</CardTitle>
        <CardDescription className="text-base">
          {track 
            ? `Help us improve the ${track.track_name} track experience`
            : 'Help us improve our career guidance platform'
          }
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <StarRating
            value={rating}
            onChange={setRating}
            label="Overall Experience Rating *"
          />

          {/* Satisfaction Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Satisfaction Level *</Label>
            <div className="flex flex-wrap gap-2">
              {satisfactionLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setSatisfaction(level.value)}
                >
                  <Badge
                    variant={satisfaction === level.value ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      satisfaction === level.value 
                        ? 'bg-primary text-primary-foreground' 
                        : level.color
                    }`}
                  >
                    {level.label}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Track Usefulness (if track provided) */}
          {track && (
            <StarRating
              value={trackUsefulness}
              onChange={setTrackUsefulness}
              label="How useful was this track for your career planning?"
            />
          )}

          {/* Quiz Helpfulness (if quiz result provided) */}
          {quizResult && (
            <StarRating
              value={quizHelpfulness}
              onChange={setQuizHelpfulness}
              label="How helpful was the quiz in guiding your decision?"
            />
          )}

          {/* Would Recommend */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Would you recommend this to other students?</Label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setWouldRecommend(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  wouldRecommend === true
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                Yes
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  wouldRecommend === false
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <ThumbsUp className="h-4 w-4 rotate-180" />
                No
              </button>
            </div>
          </div>

          {/* Feedback Text */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium">
              Additional Comments
            </Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, suggestions, or any specific feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Improvement Suggestions */}
          <div className="space-y-2">
            <Label htmlFor="improvements" className="text-sm font-medium">
              How can we improve?
            </Label>
            <Textarea
              id="improvements"
              placeholder="What features, content, or changes would make this better?"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0 || !satisfaction}
              className="flex-1 bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
            {onClose && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};