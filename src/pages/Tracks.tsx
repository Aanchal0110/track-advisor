import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StaticTrackCard from '@/components/StaticTrackCard';
import { tracks } from '@/data/tracks';

const Tracks = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-career-blue to-career-purple bg-clip-text text-transparent">
              {" "}Career Track{" "}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive specialization tracks designed to match your interests 
            and skills with the most in-demand technology careers.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {tracks.map((track) => (
            <StaticTrackCard
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

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-career-blue/10 to-career-purple/10 border-career-blue/20">
            <CardHeader>
              <CardTitle className="text-2xl">Not Sure Which Track to Choose?</CardTitle>
              <CardDescription className="text-lg">
                Take our comprehensive assessment to get personalized recommendations based on your interests and skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
                asChild
              >
                <Link to="/assessment">
                  Take Career Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tracks;