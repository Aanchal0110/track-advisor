import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Globe, Map, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import heroIndustry from '@/assets/hero-industry.jpg';

const IndustryIntelligence = () => {
  const [marketInsights, setMarketInsights] = useState<any[]>([]);
  const [growthPredictions, setGrowthPredictions] = useState<any[]>([]);
  const [locationInsights, setLocationInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [market, growth, location] = await Promise.all([
          supabase.from('market_insights').select('*').order('demand_score', { ascending: false }),
          supabase.from('growth_predictions').select('*').order('predicted_growth', { ascending: false }),
          supabase.from('location_insights').select('*').order('tech_ecosystem_score', { ascending: false })
        ]);
        
        setMarketInsights(market.data || []);
        setGrowthPredictions(growth.data || []);
        setLocationInsights(location.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroIndustry})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Industry Intelligence</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Job market data, salaries, and growth trends to inform your career choices.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <Tabs defaultValue="market" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market" className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Market</TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2"><Globe className="h-4 w-4" /> Growth</TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2"><Map className="h-4 w-4" /> Location</TabsTrigger>
          </TabsList>

          <TabsContent value="market">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Market Insights</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading market data...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {marketInsights.map((insight) => (
                    <Card key={insight.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{insight.role_title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant="secondary">Demand Score: {insight.demand_score}/100</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Median Salary:</span>
                          <span>${insight.median_salary.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Job Openings:</span>
                          <span>{insight.job_openings.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Growth Rate:</span>
                          <span>{insight.growth_rate}%</span>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-medium mb-2">Required Skills:</div>
                          <div className="flex flex-wrap gap-2">
                            {insight.skills_required?.map((skill: string) => (
                              <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="growth">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Growth Predictions</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading predictions...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {growthPredictions.map((prediction) => (
                    <Card key={prediction.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{prediction.track_name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant={prediction.confidence_level === 'High' ? 'default' : 'secondary'}>
                            {prediction.confidence_level} Confidence
                          </Badge>
                          <Badge variant="outline">{prediction.time_horizon}</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <span className="text-2xl font-bold text-primary">+{prediction.predicted_growth}%</span>
                          <span className="text-sm text-muted-foreground">predicted growth</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Current Demand:</span>
                          <span className="ml-2">{prediction.current_demand.toLocaleString()} positions</span>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-medium mb-2">Key Drivers:</div>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {prediction.key_drivers?.map((driver: string, idx: number) => (
                              <li key={idx}>{driver}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="location">
            <div className="mt-6 space-y-4">
              <div className="text-xl font-semibold">Location Insights</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading location data...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationInsights.map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{location.city}, {location.country}</CardTitle>
                        <CardDescription>
                          <Badge>Tech Score: {location.tech_ecosystem_score}/100</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Avg Salary</div>
                            <div className="text-lg font-semibold">${location.avg_salary.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Job Opportunities</div>
                            <div className="text-lg font-semibold">{location.job_opportunities.toLocaleString()}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Cost of Living Index</div>
                          <div className="text-lg font-semibold">{location.cost_of_living_index}</div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-medium mb-2">Top Companies:</div>
                          <div className="flex flex-wrap gap-2">
                            {location.top_companies?.map((company: string) => (
                              <Badge key={company} variant="outline">{company}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndustryIntelligence;


