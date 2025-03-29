
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useFitness } from '@/contexts/FitnessContext';

const XPProgress = () => {
  const { fitnessData } = useFitness();
  const { level, xp, levelProgress } = fitnessData;
  
  return (
    <Card className="cyber-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Level Progress</CardTitle>
          <Trophy className="h-5 w-5 text-cyber-green" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 mr-4 bg-gradient-to-br from-cyber-green to-cyber-blue rounded-lg flex items-center justify-center cyber-glow shadow-md">
            <span className="text-xl font-bold text-white">{level}</span>
          </div>
          <div>
            <div className="text-xl font-medium">Level {level}</div>
            <div className="text-sm text-muted-foreground">{Math.floor(xp % 100)} / 100 XP to next level</div>
          </div>
        </div>
        
        <Progress value={levelProgress * 100} className="h-2 bg-secondary" />
        
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Cybernetic Upgrades</div>
          <div className="grid grid-cols-3 gap-2">
            {["Legs", "Arms", "Core"].map((part, i) => (
              <div 
                key={i}
                className={`relative border border-border rounded-md p-3 text-center ${i < level / 5 ? 'bg-gradient-to-br from-cyber-green/20 to-cyber-blue/20' : 'bg-card'}`}
              >
                <div className="text-xs font-medium">{part}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {i < level / 5 ? 'Unlocked' : `Unlock at Lvl ${(i + 1) * 5}`}
                </div>
                {i < level / 5 && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-cyber-green rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          Earn XP by completing workouts and meeting daily goals
        </div>
      </CardContent>
    </Card>
  );
};

export default XPProgress;
