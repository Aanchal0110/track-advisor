import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, TrendingUp, BookOpen, Users, DollarSign, Target, CheckCircle, MessageSquare } from 'lucide-react';
import { tracks } from '@/data/tracks';
import { FeedbackDialog } from '@/components/FeedbackDialog';

const TrackDetail = () => {
  const { slug } = useParams();
  const track = tracks.find(t => t.id === slug);

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Track Not Found</h1>
          <p className="text-muted-foreground mb-8">The track you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/tracks">Back to Tracks</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/tracks" className="hover:text-primary">Tracks</Link>
          <span>/</span>
          <span className="text-foreground">{track.title}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div 
              className="p-4 rounded-xl text-white"
              style={{ background: track.gradient }}
            >
              <track.icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {track.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {track.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
              asChild
            >
              <Link to={`/track/${track.id}/quiz`}>
                Take Aptitude Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/tracks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tracks
              </Link>
            </Button>
            <FeedbackDialog track={{ 
              id: track.id, 
              track_name: track.title, 
              description: track.description,
              future_scope: track.futureScope.join(', '),
              icon: null,
              color_scheme: null,
              created_at: new Date().toISOString()
            }}>
              <Button variant="outline" size="lg" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Share Feedback
              </Button>
            </FeedbackDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Track Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {track.detailedDescription}
                </p>
              </CardContent>
            </Card>

            {/* Career Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span>Career Progression Paths</span>
                </CardTitle>
                <CardDescription>
                  Typical career advancement opportunities in this field
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {track.careerPaths.map((path, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-career-blue to-career-purple flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {path.split(' → ').map((role, roleIndex) => (
                          <span key={roleIndex}>
                            <span className="text-foreground font-medium">{role}</span>
                            {roleIndex < path.split(' → ').length - 1 && (
                              <ArrowRight className="inline mx-2 h-4 w-4 text-primary" />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects & Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle>Core Subjects & Curriculum</CardTitle>
                <CardDescription>
                  Essential subjects you'll study in this specialization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {track.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{subject}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Required Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Key Skills You'll Develop</CardTitle>
                <CardDescription>
                  Essential skills for success in this field
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">Avg. Salary</span>
                  </div>
                  <span className="font-semibold text-foreground">{track.averageSalary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-career-blue" />
                    <span className="text-sm text-muted-foreground">Job Growth</span>
                  </div>
                  <span className="font-semibold text-foreground">{track.jobGrowth}</span>
                </div>
              </CardContent>
            </Card>

            {/* Future Opportunities */}
            <Card>  
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Job Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {track.futureScope.map((opportunity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-career-blue to-career-purple"></div>
                      <span className="text-sm text-muted-foreground">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prerequisites</CardTitle>
                <CardDescription>
                  Recommended background knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {track.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">{prereq}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-career-blue/10 to-career-purple/10 border-career-blue/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-2">Ready to Get Started?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take our specialized quiz to see if this track matches your interests and skills.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
                  asChild
                >
                  <Link to={`/track/${track.id}/quiz`}>
                    Start Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;