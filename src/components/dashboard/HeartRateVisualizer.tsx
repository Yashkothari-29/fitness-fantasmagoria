
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Heart } from 'lucide-react';
import { useFitness } from '@/contexts/FitnessContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 rounded border border-border text-xs">
        <p>{`${label}:00 - ${payload[0].value} bpm`}</p>
      </div>
    );
  }
  return null;
};

const HeartRateVisualizer = () => {
  const { fitnessData } = useFitness();
  const heartRate = fitnessData.heartRate;
  
  return (
    <Card className="cyber-card overflow-hidden h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Heart Rate</CardTitle>
          <Heart className="h-5 w-5 text-cyber-pink animate-heart-beat" fill="#D946EF" fillOpacity={0.2} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 mr-4">
            <div className="absolute inset-0 rounded-full bg-cyber-pink/10 flex items-center justify-center animate-pulse-glow">
              <Heart className="h-8 w-8 text-cyber-pink" fill="#D946EF" fillOpacity={0.3} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold">{heartRate}</div>
            <div className="text-sm text-muted-foreground">bpm</div>
          </div>
        </div>
        
        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fitnessData.dailyHeartRate}>
              <XAxis 
                dataKey="hour" 
                tickFormatter={(hour) => `${hour}`}
                tick={{ fontSize: 12 }}
                interval={3}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#D946EF" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, fill: "#D946EF" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-2 text-xs text-center text-muted-foreground">
          24-hour heart rate pattern
        </div>
      </CardContent>
    </Card>
  );
};

export default HeartRateVisualizer;
