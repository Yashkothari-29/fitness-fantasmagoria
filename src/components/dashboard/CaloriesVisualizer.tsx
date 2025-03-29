
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from 'lucide-react';
import { useFitness } from '@/contexts/FitnessContext';

const CaloriesVisualizer = () => {
  const { fitnessData } = useFitness();
  const { calories, caloriesGoal, caloriesPercentage } = fitnessData;
  
  return (
    <Card className="cyber-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Calories</CardTitle>
          <Flame className="h-5 w-5 text-cyber-orange" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-60px)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">{calories.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">of {caloriesGoal.toLocaleString()} cal</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-cyber-orange rounded-full p-2 animate-pulse">
            <Flame className="h-5 w-5 text-white" />
          </div>
        </div>
        
        <div className="relative flex-1 mt-4 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <div className="w-20 h-48 bg-gradient-to-t from-cyber-orange/80 to-yellow-400/50 rounded-t-lg relative">
              <div 
                className="absolute inset-0 bg-card animate-melt"
                style={{ 
                  height: `${100 - caloriesPercentage}%`,
                  top: 0 
                }}
              ></div>
              
              <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-red-500 to-transparent opacity-70"></div>
              
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-white/80 animate-float"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    bottom: `${10 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-xs text-muted-foreground">Calories burned today</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaloriesVisualizer;
