
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import StepsVisualizer from '@/components/dashboard/StepsVisualizer';
import HeartRateVisualizer from '@/components/dashboard/HeartRateVisualizer';
import CaloriesVisualizer from '@/components/dashboard/CaloriesVisualizer';
import XPProgress from '@/components/dashboard/XPProgress';
import AiCoach from '@/components/dashboard/AiCoach';
import SocialCompetition from '@/components/dashboard/SocialCompetition';
import StatsCard from '@/components/dashboard/StatsCard';
import WorkoutTimeline3D from '@/components/dashboard/WorkoutTimeline3D';
import AchievementSystem from '@/components/dashboard/AchievementSystem';
import { Activity, Trophy, Zap, BarChart } from 'lucide-react';
import { useFitness } from '@/contexts/FitnessContext';

const Index = () => {
  const { fitnessData } = useFitness();
  
  return (
    <div className="min-h-screen bg-background cybernetic-bg">
      <Navbar />
      
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Your fitness journey at a glance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            title="Daily Steps"
            value={fitnessData.steps.toLocaleString()}
            icon={<Activity className="h-5 w-5" />}
            description="Goal: 10,000 steps"
            trend={{
              value: 12,
              isPositive: true
            }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
            iconClassName="bg-blue-500/20 text-blue-500"
          />
          
          <StatsCard
            title="Weekly Streak"
            value={`${fitnessData.streak} days`}
            icon={<Zap className="h-5 w-5" />}
            description="Personal best: 14 days"
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10"
            iconClassName="bg-amber-500/20 text-amber-500"
          />
          
          <StatsCard
            title="Level Progress"
            value={`${fitnessData.level}`}
            icon={<Trophy className="h-5 w-5" />}
            description={`${fitnessData.xp.toLocaleString()} XP total`}
            trend={{
              value: 23,
              isPositive: true
            }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10"
            iconClassName="bg-purple-500/20 text-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <WorkoutTimeline3D />
          </div>
          
          <div className="space-y-6">
            <XPProgress />
            <AiCoach />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 lg:col-span-1">
            <HeartRateVisualizer />
          </div>
          <div>
            <StepsVisualizer />
          </div>
          <div>
            <CaloriesVisualizer />
          </div>
        </div>
        
        <div className="mb-6">
          <AchievementSystem />
        </div>
        
        <div className="mb-6">
          <SocialCompetition />
        </div>
      </main>
    </div>
  );
};

export default Index;
