
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useFitness } from '@/contexts/FitnessContext';

const AiCoach = () => {
  const { coachMessage, coachPersonality, toggleCoachPersonality } = useFitness();
  
  return (
    <Card className="cyber-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">AI Coach</CardTitle>
          <Zap className="h-5 w-5 text-cyber-pink" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Switch 
                id="coach-mode" 
                checked={coachPersonality === 'snarky'}
                onCheckedChange={toggleCoachPersonality}
              />
              <label htmlFor="coach-mode" className="ml-2 text-sm">
                {coachPersonality === 'kind' ? 'Kind Mode' : 'Snarky Mode'}
              </label>
            </div>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              New Tip
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex">
          <div className="w-12 h-12 rounded-full mr-3 bg-gradient-to-br from-cyber-pink to-cyber-purple flex items-center justify-center flex-shrink-0">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div className="bg-gradient-to-r from-card to-accent/50 p-3 rounded-lg rounded-tl-none flex-1 border border-border">
            <p className="text-sm">{coachMessage}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Suggested Workouts</div>
          <div className="space-y-2">
            {[
              { name: "Morning Stretches", duration: "10 min", intensity: "Low" },
              { name: "HIIT Cardio", duration: "20 min", intensity: "High" },
              { name: "Evening Yoga", duration: "15 min", intensity: "Medium" }
            ].map((workout, i) => (
              <div key={i} className="p-2 border border-border rounded-md flex justify-between items-center hover:bg-accent/50 transition-colors cursor-pointer">
                <div>
                  <div className="font-medium text-sm">{workout.name}</div>
                  <div className="text-xs text-muted-foreground">{workout.duration} • {workout.intensity}</div>
                </div>
                <Button variant="ghost" size="sm">Start</Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiCoach;
