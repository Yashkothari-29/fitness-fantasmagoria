
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Footprints } from 'lucide-react';
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

const StepsVisualizer = () => {
  const { fitnessData } = useFitness();
  const { steps, stepsGoal, stepsPercentage, weeklySteps } = fitnessData;
  
  return (
    <Card className="cyber-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Steps</CardTitle>
          <Footprints className="h-5 w-5 text-cyber-blue" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">{steps.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">of {stepsGoal.toLocaleString()} steps</div>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeOpacity="0.1" 
              />
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="none" 
                stroke="url(#blue-gradient)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeDasharray={`${stepsPercentage}, 100`}
                transform="rotate(-90 18 18)" 
              />
              <defs>
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              {stepsPercentage}%
            </div>
          </div>
        </div>
        
        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySteps}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <Bar 
                dataKey="steps" 
                fill="url(#colorSteps)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <div className="text-xs font-medium mb-1">Steps Heatmap</div>
          <div className="grid grid-cols-12 gap-1">
            {fitnessData.stepsHeatmap.slice(0, 12).map((value, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-sm animate-footprint-appear"
                style={{ 
                  backgroundColor: `rgba(14, 165, 233, ${Math.min(value / 100, 1)})`,
                  animationDelay: `${index * 0.03}s`
                }} 
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepsVisualizer;
