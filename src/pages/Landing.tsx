import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Trophy, Target, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrackCard from '@/components/TrackCard';
import { tracks } from '@/data/tracks';
import heroImage from '@/assets/hero-career-guidance.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Your
              <span className="bg-gradient-to-r from-career-blue to-career-purple bg-clip-text text-transparent">
                {" "}Perfect Career{" "}
              </span>
              Path
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Take personalized quizzes, explore specialization tracks, and get AI-powered 
              recommendations to choose the right career path for your future in technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90 text-lg px-8 py-6"
                asChild
              >
                <Link to="/tracks">
                  Explore Tracks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-career-blue to-career-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
              <div className="text-muted-foreground">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-career-purple to-career-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-career-blue to-career-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">4</div>
              <div className="text-muted-foreground">Career Tracks</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-career-purple to-career-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">50+</div>
              <div className="text-muted-foreground">Quiz Questions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-career-blue to-career-purple bg-clip-text text-transparent">
                {" "}Specialization{" "}
              </span>
              Track
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive tracks designed to match your interests and skills 
              with the most in-demand technology careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                title={track.title}
                description={track.description}
                futureScope={track.futureScope}
                subjects={track.subjects}
                slug={track.id}
                icon={<track.icon className="h-6 w-6" />}
                gradient={track.gradient}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-career-blue hover:to-career-purple hover:text-white transition-all duration-300"
              asChild
            >
              <Link to="/tracks">
                View All Tracks
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-career-blue via-career-purple to-career-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect career path. 
            Take your first quiz today and discover your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-career-blue hover:bg-white/90"
              asChild
            >
              <Link to="/tracks">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-career-blue"
              asChild
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;