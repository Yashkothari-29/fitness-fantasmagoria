
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTodayFitnessSummary, getCoachMessages } from '../services/fitnessDataService';

// Define the types for our fitness data
type FitnessData = ReturnType<typeof getTodayFitnessSummary>;

interface FitnessContextType {
  fitnessData: FitnessData;
  refreshData: () => void;
  coachPersonality: 'kind' | 'snarky';
  toggleCoachPersonality: () => void;
  coachMessage: string;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fitnessData, setFitnessData] = useState<FitnessData>(getTodayFitnessSummary());
  const [coachPersonality, setCoachPersonality] = useState<'kind' | 'snarky'>('kind');
  const [coachMessage, setCoachMessage] = useState<string>(getCoachMessages('kind'));

  // Refresh data with new values
  const refreshData = () => {
    setFitnessData(getTodayFitnessSummary());
    setCoachMessage(getCoachMessages(coachPersonality));
  };

  // Toggle between kind and snarky coach personality
  const toggleCoachPersonality = () => {
    setCoachPersonality(prev => {
      const newPersonality = prev === 'kind' ? 'snarky' : 'kind';
      setCoachMessage(getCoachMessages(newPersonality));
      return newPersonality;
    });
  };

  // Initial load of data
  useEffect(() => {
    refreshData();
    
    // Auto-refresh data every 30 seconds for demo purposes
    const intervalId = setInterval(refreshData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <FitnessContext.Provider 
      value={{ 
        fitnessData, 
        refreshData, 
        coachPersonality, 
        toggleCoachPersonality,
        coachMessage
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = (): FitnessContextType => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
