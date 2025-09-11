import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { TrackCard } from '@/components/TrackCard';
import { SubjectView } from '@/components/SubjectView';
import { ArrowLeft, User, LogOut } from 'lucide-react';

type Track = Tables<'tracks'>;
type Subject = Tables<'subjects'>;

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('track_name');
      
      if (error) throw error;
      setTracks(data || []);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async (trackId: string) => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('track_id', trackId)
        .order('subject_name');
      
      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleTrackClick = async (track: Track) => {
    setSelectedTrack(track);
    setSelectedSubject(null);
    await fetchSubjects(track.id);
  };

  const handleBackToTracks = () => {
    setSelectedTrack(null);
    setSelectedSubject(null);
    setSubjects([]);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-career-bg-start to-career-bg-end flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-career-bg-start to-career-bg-end p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {selectedTrack && (
              <Button
                onClick={selectedSubject ? handleBackToSubjects : handleBackToTracks}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {selectedSubject ? selectedSubject.subject_name : 
                 selectedTrack ? selectedTrack.track_name : 'Dashboard'}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Welcome back, {user?.email}
              </p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Content */}
        {selectedSubject ? (
          <SubjectView subject={selectedSubject} />
        ) : selectedTrack ? (
          <div className="space-y-6">
            <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedTrack.track_name}
                </CardTitle>
                <CardDescription>{selectedTrack.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Future Scope</h3>
                    <p className="text-muted-foreground">{selectedTrack.future_scope}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-foreground">Subjects</h2>
              {subjects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((subject) => (
                    <Card 
                      key={subject.id}
                      className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm cursor-pointer hover:shadow-glow transition-all duration-300"
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{subject.subject_name}</CardTitle>
                        {subject.subject_desc && (
                          <CardDescription>{subject.subject_desc}</CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No subjects available for this track yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Choose Your Track</CardTitle>
                <CardDescription>
                  Select a specialization track to explore subjects and resources
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {tracks.map((track) => (
                <TrackCard 
                  key={track.id}
                  track={track}
                  onClick={() => handleTrackClick(track)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;