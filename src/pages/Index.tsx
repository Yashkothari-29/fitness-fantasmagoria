
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Activity, CreditCard, Dumbbell, Calendar } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import HeartRateVisualizer from '@/components/dashboard/HeartRateVisualizer';
import StepsVisualizer from '@/components/dashboard/StepsVisualizer';
import CaloriesVisualizer from '@/components/dashboard/CaloriesVisualizer';
import XPProgress from '@/components/dashboard/XPProgress';
import AiCoach from '@/components/dashboard/AiCoach';
import SocialCompetition from '@/components/dashboard/SocialCompetition';
import { useFitness } from '@/contexts/FitnessContext';

const Dashboard = () => {
  const { fitnessData, refreshData } = useFitness();
  
  // Add tilt-to-refresh functionality
  React.useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      // @ts-ignore: beta property might be undefined in some browsers
      const tiltAngle = event.beta;
      
      // If device is tilted forward more than 60 degrees, refresh data
      if (tiltAngle && tiltAngle > 60) {
        refreshData();
      }
    };
    
    // Check if DeviceOrientationEvent is available and permission is granted
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    return () => {
      if ('DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [refreshData]);
  
  return (
    <div className="min-h-screen bg-background cybernetic-bg">
      <Navbar />
      
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Your fitness metrics and progress</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Active Minutes"
            value={`${fitnessData.activeMinutes} min`}
            icon={<Activity className="h-4 w-4" />}
            description={`${fitnessData.activeMinutesPercentage}% of daily goal`}
            iconClassName="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          />
          
          <StatsCard
            title="Calories Burned"
            value={fitnessData.calories.toLocaleString()}
            icon={<CreditCard className="h-4 w-4" />}
            description={`${fitnessData.caloriesPercentage}% of daily goal`}
            iconClassName="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
          />
          
          <StatsCard
            title="Daily Steps"
            value={fitnessData.steps.toLocaleString()}
            icon={<Dumbbell className="h-4 w-4" />}
            description={`${fitnessData.stepsPercentage}% of daily goal`}
            iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          />
          
          <StatsCard
            title="Current Level"
            value={fitnessData.level}
            icon={<Calendar className="h-4 w-4" />}
            description={`${Math.floor(fitnessData.xp % 100)} XP to next level`}
            iconClassName="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <HeartRateVisualizer />
          <StepsVisualizer />
          <CaloriesVisualizer />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <XPProgress />
          <AiCoach />
          <SocialCompetition />
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Tip: Tilt your device forward to refresh data</p>
          <p className="mt-1">Try the Konami code for a surprise! (↑ ↑ ↓ ↓ ← → ← → B A)</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
