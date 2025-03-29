
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Users, Trophy, Medal, ArrowUp, ArrowDown, Video, User, Flag } from 'lucide-react';
import { useFitness } from '@/contexts/FitnessContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 rounded border border-border text-xs">
        <p>{`${label}: ${payload[0].value.toLocaleString()} steps`}</p>
      </div>
    );
  }
  return null;
};

const Social = () => {
  const { fitnessData } = useFitness();
  const { friends } = fitnessData;
  
  // Sort friends by steps in descending order
  const sortedFriends = [...friends].sort((a, b) => b.steps - a.steps);
  
  // Create the chart data
  const chartData = sortedFriends.map(friend => ({
    name: friend.name,
    steps: friend.steps,
  }));
  
  return (
    <div className="min-h-screen bg-background cybernetic-bg">
      <Navbar />
      
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Social</h1>
          <p className="text-muted-foreground mt-1">Compete with friends and join challenges</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="cyber-card h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>24h Step Challenge</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <XAxis type="number" hide />
                      <Tooltip content={<CustomTooltip />} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#0EA5E9" />
                        </linearGradient>
                      </defs>
                      <Bar 
                        dataKey="steps" 
                        fill="url(#barGradient)" 
                        radius={[0, 4, 4, 0]}
                        label={{ 
                          position: 'insideRight', 
                          fill: 'white',
                          formatter: (value: any) => `${value.toLocaleString()}`,
                          style: { fontSize: '12px' }
                        }}
                        background={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-4">Live Leaderboard</h3>
                  <div className="space-y-4">
                    {sortedFriends.slice(0, 3).map((friend, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-3 flex items-center justify-center w-6">
                          {index === 0 ? (
                            <Trophy className="h-5 w-5 text-yellow-500" />
                          ) : index === 1 ? (
                            <Medal className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Medal className="h-5 w-5 text-amber-700" />
                          )}
                        </div>
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">{friend.name}</div>
                            <div className="text-sm font-medium">{friend.steps.toLocaleString()} steps</div>
                          </div>
                          <Progress 
                            value={(friend.steps / 15000) * 100} 
                            className="h-1"
                            style={{
                              background: index === 0 ? 'linear-gradient(to right, #FCD34D, #F59E0B)' : undefined
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="cyber-card mb-6">
              <CardHeader>
                <CardTitle>Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedFriends.map((friend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{friend.name}</div>
                          <div className="text-xs text-muted-foreground">Level {friend.level}</div>
                        </div>
                      </div>
                      {index < 2 && (
                        <div className="flex items-center text-xs font-medium text-green-500">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          Active
                        </div>
                      )}
                      {index >= 2 && (
                        <div className="flex items-center text-xs font-medium text-muted-foreground">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          2h ago
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <Users className="h-4 w-4 mr-2" />
                  Add Friends
                </Button>
              </CardContent>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Weekend Warrior", type: "Steps", goal: "50,000 steps", days: "2 days left", participants: 12 },
                    { name: "Calorie Crusher", type: "Calories", goal: "10,000 calories", days: "5 days left", participants: 8 },
                    { name: "Early Birds", type: "Workouts", goal: "5 morning workouts", days: "Weekly", participants: 5 },
                  ].map((challenge, index) => (
                    <div key={index} className="border border-border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-sm">{challenge.name}</h3>
                          <p className="text-xs text-muted-foreground">{challenge.goal} • {challenge.days}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Join</Button>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{challenge.participants} participants</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="replays">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="replays">Workout Replays</TabsTrigger>
              <TabsTrigger value="races">Ghost Races</TabsTrigger>
            </TabsList>
            
            <TabsContent value="replays">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                  <Card key={index} className="cyber-card overflow-hidden">
                    <div className="relative aspect-video bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/20 flex items-center justify-center">
                      <Video className="h-10 w-10 text-muted-foreground" />
                      <div className="absolute bottom-2 right-2 bg-background/80 rounded px-2 py-0.5 text-xs">
                        {index === 0 ? '2:35' : index === 1 ? '5:12' : '3:45'}
                      </div>
                      <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full rounded-none opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
                        <span className="sr-only">Play</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-sm">
                            {index === 0 ? 'Morning HIIT Session' : index === 1 ? 'Park Run Highlights' : 'Yoga Flow'}
                          </h3>
                          <div className="flex items-center mt-1">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage src={`/avatar-${(index % 3) + 1}.png`} alt="" />
                              <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {index === 0 ? sortedFriends[0]?.name : index === 1 ? sortedFriends[1]?.name : sortedFriends[2]?.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{index === 0 ? '2h' : index === 1 ? '1d' : '5h'} ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="races">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "5K Morning Route", friend: sortedFriends[0]?.name, time: "28:45", difficulty: "Moderate" },
                  { name: "Park Circuit", friend: sortedFriends[1]?.name, time: "15:20", difficulty: "Easy" },
                ].map((race, index) => (
                  <Card key={index} className="cyber-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{race.name}</h3>
                          <p className="text-sm text-muted-foreground">Race against {race.friend}'s ghost</p>
                        </div>
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Flag className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-secondary rounded-md p-2 text-center">
                          <div className="text-xs text-muted-foreground">Distance</div>
                          <div className="font-medium">{index === 0 ? '5km' : '2.5km'}</div>
                        </div>
                        <div className="bg-secondary rounded-md p-2 text-center">
                          <div className="text-xs text-muted-foreground">Best Time</div>
                          <div className="font-medium">{race.time}</div>
                        </div>
                        <div className="bg-secondary rounded-md p-2 text-center">
                          <div className="text-xs text-muted-foreground">Difficulty</div>
                          <div className="font-medium">{race.difficulty}</div>
                        </div>
                      </div>
                      
                      <Button className="w-full">Start Race</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Social;
