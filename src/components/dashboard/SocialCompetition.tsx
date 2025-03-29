
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useFitness } from '@/contexts/FitnessContext';
import { Link } from 'react-router-dom';

const SocialCompetition = () => {
  const { fitnessData } = useFitness();
  const { friends } = fitnessData;
  
  // Sort friends by steps in descending order
  const sortedFriends = [...friends].sort((a, b) => b.steps - a.steps);
  
  return (
    <Card className="cyber-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Social Competition</CardTitle>
          <Users className="h-5 w-5 text-cyber-blue" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">24h Step Challenge</div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{sortedFriends[0]?.name || 'No Leader'}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedFriends.slice(0, 3).map((friend, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-3 flex-shrink-0">
                <Avatar>
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium text-sm">{friend.name}</div>
                  <div className="text-xs font-medium">{friend.steps.toLocaleString()} steps</div>
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
        
        <div className="mt-6">
          <div className="text-sm font-medium mb-3">Live Activities</div>
          <div className="space-y-2">
            {sortedFriends.slice(0, 2).map((friend, i) => (
              <div key={i} className="p-2 border border-border rounded-md flex items-center bg-accent/10 animate-pulse-glow">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-xs font-medium">{friend.name} is active right now</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/social">
              <Button variant="outline" className="w-full" size="sm">
                <span>View All Competitions</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialCompetition;
