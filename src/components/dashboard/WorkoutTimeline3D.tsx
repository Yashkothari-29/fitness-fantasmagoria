
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Flame, HeartPulse, Dumbbell, Timer } from 'lucide-react';
import { useFitness } from '@/contexts/FitnessContext';
import { cn } from '@/lib/utils';

type Workout = {
  id: string;
  name: string;
  date: string;
  duration: number;
  calories: number;
  heartRate: number;
  type: 'cardio' | 'strength' | 'flexibility' | 'hiit';
  intensity: 'low' | 'medium' | 'high';
  completed: boolean;
};

const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Morning Run',
    date: '2023-10-01T08:00:00',
    duration: 35,
    calories: 320,
    heartRate: 145,
    type: 'cardio',
    intensity: 'medium',
    completed: true,
  },
  {
    id: '2',
    name: 'Weight Training',
    date: '2023-10-02T17:30:00',
    duration: 55,
    calories: 450,
    heartRate: 135,
    type: 'strength',
    intensity: 'high',
    completed: true,
  },
  {
    id: '3',
    name: 'Yoga Session',
    date: '2023-10-03T19:00:00',
    duration: 40,
    calories: 180,
    heartRate: 110,
    type: 'flexibility',
    intensity: 'low',
    completed: true,
  },
  {
    id: '4',
    name: 'HIIT Workout',
    date: '2023-10-04T18:15:00',
    duration: 25,
    calories: 380,
    heartRate: 165,
    type: 'hiit',
    intensity: 'high',
    completed: true,
  },
  {
    id: '5',
    name: 'Bike Ride',
    date: '2023-10-05T07:45:00',
    duration: 60,
    calories: 520,
    heartRate: 150,
    type: 'cardio',
    intensity: 'medium',
    completed: true,
  },
  {
    id: '6',
    name: 'Upcoming: Circuit Training',
    date: '2023-10-07T16:30:00',
    duration: 45,
    calories: 400,
    heartRate: 155,
    type: 'strength',
    intensity: 'high',
    completed: false,
  },
];

const getTypeIcon = (type: Workout['type']) => {
  switch (type) {
    case 'cardio':
      return <HeartPulse className="h-6 w-6" />;
    case 'strength':
      return <Dumbbell className="h-6 w-6" />;
    case 'flexibility':
      return <Award className="h-6 w-6" />;
    case 'hiit':
      return <Flame className="h-6 w-6" />;
    default:
      return <HeartPulse className="h-6 w-6" />;
  }
};

const getIntensityColor = (intensity: Workout['intensity']) => {
  switch (intensity) {
    case 'low':
      return 'from-green-500/80 to-green-500/20';
    case 'medium':
      return 'from-blue-500/80 to-blue-500/20';
    case 'high':
      return 'from-red-500/80 to-red-500/20';
    default:
      return 'from-blue-500/80 to-blue-500/20';
  }
};

const WorkoutTimeline3D: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [hoveredWorkout, setHoveredWorkout] = useState<string | null>(null);
  const { fitnessData } = useFitness();
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now we'll use our mock data
    setWorkouts(mockWorkouts);
  }, []);

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  return (
    <Card className="cyber-card relative overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Workout Timeline</span>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyber-purple"
          >
            <Timer className="h-5 w-5" />
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-cyber-purple via-cyber-blue to-background rounded-full" />
          
          {/* Workout items */}
          <div className="space-y-8 py-4">
            {workouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div 
                  className={cn(
                    "absolute left-1/2 top-4 h-4 w-4 -translate-x-1/2 rounded-full shadow-glow z-10",
                    workout.completed ? "bg-cyber-purple" : "bg-gray-400"
                  )}
                  initial={{ scale: 1 }}
                  animate={hoveredWorkout === workout.id ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Workout card */}
                <motion.div
                  className={cn(
                    "ml-auto w-[calc(50%-20px)] p-4 rounded-lg glass-morphism border-l-4",
                    index % 2 === 0 ? "ml-[calc(50%+20px)]" : "mr-[calc(50%+20px)]",
                    workout.completed ? "border-l-cyber-purple" : "border-l-gray-400"
                  )}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => handleWorkoutClick(workout)}
                  onMouseEnter={() => setHoveredWorkout(workout.id)}
                  onMouseLeave={() => setHoveredWorkout(null)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <motion.div
                        className={cn(
                          "p-2 rounded-full mr-3 bg-gradient-to-br",
                          getIntensityColor(workout.intensity)
                        )}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {getTypeIcon(workout.type)}
                      </motion.div>
                      <div>
                        <h3 className="font-medium text-foreground">{workout.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(workout.date).toLocaleDateString()} • {new Date(workout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Timer className="h-4 w-4 mr-1" />
                      <span>{workout.duration} min</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="flex items-center text-sm">
                      <Flame className="h-4 w-4 mr-1 text-cyber-orange" />
                      <span>{workout.calories} kcal</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <HeartPulse className="h-4 w-4 mr-1 text-red-500" />
                      <span>{workout.heartRate} bpm</span>
                    </div>
                  </div>
                  
                  {/* Intensity indicator */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Intensity</span>
                      <span className="capitalize">{workout.intensity}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r",
                          workout.intensity === 'low' ? "from-green-500 to-green-400 w-1/3" :
                          workout.intensity === 'medium' ? "from-blue-500 to-blue-400 w-2/3" :
                          "from-red-500 to-red-400 w-full"
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Detailed view when workout is selected */}
        {selectedWorkout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 rounded-lg border border-cyber-purple/30 bg-background/50 backdrop-blur-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedWorkout.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedWorkout.date).toLocaleDateString()} • {new Date(selectedWorkout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div 
                className={cn(
                  "p-2 rounded-full bg-gradient-to-br",
                  getIntensityColor(selectedWorkout.intensity)
                )}
              >
                {getTypeIcon(selectedWorkout.type)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-background/80 border border-border">
                <p className="text-xs text-muted-foreground">Duration</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{selectedWorkout.duration}</span>
                  <span className="text-sm ml-1">min</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-background/80 border border-border">
                <p className="text-xs text-muted-foreground">Calories</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{selectedWorkout.calories}</span>
                  <span className="text-sm ml-1">kcal</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-background/80 border border-border">
                <p className="text-xs text-muted-foreground">Avg Heart Rate</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{selectedWorkout.heartRate}</span>
                  <span className="text-sm ml-1">bpm</span>
                </div>
              </div>
            </div>
            
            <motion.button 
              className="w-full py-2 rounded-lg bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple border border-cyber-purple/30 transition-colors text-sm"
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedWorkout(null)}
            >
              Close Details
            </motion.button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutTimeline3D;
