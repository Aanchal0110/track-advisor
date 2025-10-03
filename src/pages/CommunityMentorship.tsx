import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users, Handshake, Network } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import heroCommunity from '@/assets/hero-community.jpg';

const CommunityMentorship = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroCommunity})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Community & Mentorship</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Learn with peers, connect with mentors, and build your professional network.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <Tabs defaultValue="peers" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="peers" className="flex items-center gap-2"><Users className="h-4 w-4" /> Peer Groups</TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center gap-2"><Handshake className="h-4 w-4" /> Mentors</TabsTrigger>
            <TabsTrigger value="alumni" className="flex items-center gap-2"><Network className="h-4 w-4" /> Alumni</TabsTrigger>
          </TabsList>

          <TabsContent value="peers">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Peer Study Groups & Forums</CardTitle>
                <CardDescription>Join topic-based groups and ask questions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Create or join cohorts organized by track and skill level.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentors">
            <MentorsGrid />
          </TabsContent>

          <TabsContent value="alumni">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Alumni Network</CardTitle>
                <CardDescription>Connect with alumni for referrals and guidance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Browse alumni by company, track, and graduation year.</p>
                <Button disabled>Coming soon</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityMentorship;


type Mentor = {
  id: string;
  name: string;
  designation?: string | null;
  department?: string | null;
  photo_url?: string | null;
  profile_url?: string | null;
  expertise?: string[] | null;
};

const staticFallbackMentors: Mentor[] = [
  { id: 'static-1', name: 'VIT Faculty Mentor', designation: 'Professor', department: 'Computer Engineering', photo_url: '', profile_url: '', expertise: ['AI','ML'] },
];

function MentorCard({ mentor }: { mentor: Mentor }) {
  const initials = mentor.name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase();
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.photo_url || undefined} alt={mentor.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-lg font-semibold">{mentor.name}</div>
            {mentor.designation && <div className="text-sm text-muted-foreground">{mentor.designation}</div>}
            {mentor.department && <div className="text-sm text-muted-foreground">{mentor.department}</div>}
          </div>
        </div>
        {mentor.expertise && mentor.expertise.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {mentor.expertise.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded bg-muted text-foreground/80">{tag}</span>
            ))}
          </div>
        )}
        {mentor.profile_url && (
          <div className="mt-4">
            <a className="text-primary text-sm underline" href={mentor.profile_url} target="_blank" rel="noreferrer">View Profile</a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MentorsGrid() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const { data, error } = await (supabase as any).from('mentors').select('*').order('name');
        if (error) throw error;
        setMentors((data as any) || []);
      } catch (e) {
        setMentors(staticFallbackMentors);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filtered = mentors.filter(m => {
    const target = `${m.name} ${m.designation ?? ''} ${m.department ?? ''} ${(m.expertise ?? []).join(' ')}`.toLowerCase();
    return target.includes(query.toLowerCase());
  });

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xl font-semibold">Mentors</div>
          <div className="text-sm text-muted-foreground">Search by name, designation, or department</div>
        </div>
        <Input
          placeholder="Search mentors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading mentors...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-muted-foreground">No mentors found.</div>
          )}
        </div>
      )}
    </div>
  );
}

