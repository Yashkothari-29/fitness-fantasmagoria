
import React, { createContext, useContext, useState } from 'react';

// This would come from an API in a real app
const initialFitnessData = {
  steps: 8452,
  heartRate: 72,
  calories: 1842,
  xp: 2540,
  level: 12,
  streak: 7, // Adding the streak property
  levelProgress: 0.65,
  stepsGoal: 10000,
  caloriesGoal: 2500,
  stepsPercentage: 84.52,
  caloriesPercentage: 73.68,
  activeMinutes: 48,
  weeklySteps: [
    { day: 'Mon', steps: 7200 },
    { day: 'Tue', steps: 8300 },
    { day: 'Wed', steps: 7600 },
    { day: 'Thu', steps: 9100 },
    { day: 'Fri', steps: 8452 },
    { day: 'Sat', steps: 0 },
    { day: 'Sun', steps: 0 },
  ],
  weeklyCalories: [
    { day: 'Mon', calories: 1600 },
    { day: 'Tue', calories: 1750 },
    { day: 'Wed', calories: 1500 },
    { day: 'Thu', calories: 2100 },
    { day: 'Fri', calories: 1842 },
    { day: 'Sat', calories: 0 },
    { day: 'Sun', calories: 0 },
  ],
  heartRateHistory: [
    { time: '12:00', value: 68 },
    { time: '13:00', value: 72 },
    { time: '14:00', value: 75 },
    { time: '15:00', value: 82 },
    { time: '16:00', value: 78 },
    { time: '17:00', value: 72 },
  ],
  friends: [
    { name: 'Emma', steps: 10245, level: 14, avatar: '/avatar-2.png' },
    { name: 'John', steps: 9321, level: 11, avatar: '/avatar-3.png' },
    { name: 'Sarah', steps: 8100, level: 10, avatar: '/avatar-4.png' },
    { name: 'Mike', steps: 7500, level: 9, avatar: '/avatar-5.png' },
  ],
};

type FitnessContextType = {
  fitnessData: typeof initialFitnessData;
  updateSteps: (steps: number) => void;
};

const FitnessContext = createContext<FitnessContextType | null>(null);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fitnessData, setFitnessData] = useState(initialFitnessData);
  
  const updateSteps = (steps: number) => {
    setFitnessData(prev => ({
      ...prev,
      steps,
      stepsPercentage: (steps / prev.stepsGoal) * 100
    }));
  };
  
  return (
    <FitnessContext.Provider value={{ fitnessData, updateSteps }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
