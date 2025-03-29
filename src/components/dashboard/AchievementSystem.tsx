
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy, Zap, Star, Medal, UserPlus, Target, Calendar } from 'lucide-react';
import ProgressRing from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  date?: string;
};

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'Early Bird',
    description: 'Complete 5 workouts before 8 AM',
    icon: <Star className="h-6 w-6" />,
    progress: 3,
    maxProgress: 5,
    rarity: 'common',
    unlocked: false
  },
  {
    id: '2',
    name: 'Consistent Runner',
    description: 'Run 3 times a week for 4 weeks',
    icon: <Zap className="h-6 w-6" />,
    progress: 9,
    maxProgress: 12,
    rarity: 'rare',
    unlocked: false
  },
  {
    id: '3',
    name: 'Marathon Master',
    description: 'Complete a marathon distance in one month',
    icon: <Trophy className="h-6 w-6" />,
    progress: 25,
    maxProgress: 42,
    rarity: 'epic',
    unlocked: false
  },
  {
    id: '4',
    name: 'Social Butterfly',
    description: 'Invite 5 friends to join the platform',
    icon: <UserPlus className="h-6 w-6" />,
    progress: 5,
    maxProgress: 5,
    rarity: 'common',
    unlocked: true,
    date: '2023-09-15'
  },
  {
    id: '5',
    name: 'Goal Crusher',
    description: 'Achieve 10 personal fitness goals',
    icon: <Target className="h-6 w-6" />,
    progress: 7,
    maxProgress: 10,
    rarity: 'rare',
    unlocked: false
  },
  {
    id: '6',
    name: '30-Day Warrior',
    description: 'Work out every day for 30 days',
    icon: <Calendar className="h-6 w-6" />,
    progress: 30,
    maxProgress: 30,
    rarity: 'legendary',
    unlocked: true,
    date: '2023-08-30'
  },
];

const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common':
      return 'from-blue-500 to-cyan-500';
    case 'rare':
      return 'from-purple-500 to-pink-500';
    case 'epic':
      return 'from-amber-500 to-orange-500';
    case 'legendary':
      return 'from-red-500 to-yellow-500';
    default:
      return 'from-blue-500 to-cyan-500';
  }
};

const getRarityBg = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common':
      return 'from-blue-500/20 to-cyan-500/20';
    case 'rare':
      return 'from-purple-500/20 to-pink-500/20';
    case 'epic':
      return 'from-amber-500/20 to-orange-500/20';
    case 'legendary':
      return 'from-red-500/20 to-yellow-500/20';
    default:
      return 'from-blue-500/20 to-cyan-500/20';
  }
};

const AchievementSystem: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  // Filter achievements based on the selected filter
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  return (
    <Card className="cyber-card overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-cyber-purple" />
            <span>Achievement System</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-3 py-1 text-xs rounded-md transition-colors",
                filter === 'all' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={cn(
                "px-3 py-1 text-xs rounded-md transition-colors",
                filter === 'unlocked' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Unlocked
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={cn(
                "px-3 py-1 text-xs rounded-md transition-colors",
                filter === 'locked' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              In Progress
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer border",
                achievement.unlocked ? "border-cyber-purple/50" : "border-border"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
                transition: { duration: 0.2 }
              }}
              onClick={() => setSelectedAchievement(achievement)}
            >
              {/* Background gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-30",
                getRarityBg(achievement.rarity)
              )} />
              
              <div className="relative p-4 flex items-start">
                <div className="mr-4">
                  <div className={cn(
                    "rounded-full p-3 bg-gradient-to-br",
                    getRarityColor(achievement.rarity)
                  )}>
                    {achievement.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full capitalize",
                      achievement.rarity === 'common' ? "bg-blue-500/10 text-blue-500" :
                      achievement.rarity === 'rare' ? "bg-purple-500/10 text-purple-500" :
                      achievement.rarity === 'epic' ? "bg-amber-500/10 text-amber-500" :
                      "bg-red-500/10 text-red-500"
                    )}>
                      {achievement.rarity}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">{achievement.description}</p>
                  
                  {achievement.unlocked ? (
                    <div className="flex items-center space-x-2 text-xs text-green-500">
                      <Medal className="h-4 w-4" />
                      <span>Unlocked {achievement.date && `on ${new Date(achievement.date).toLocaleDateString()}`}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r",
                            getRarityColor(achievement.rarity)
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          transition={{ duration: 1, type: 'spring' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Achievement detail modal */}
        <AnimatePresence>
          {selectedAchievement && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
            >
              <motion.div 
                className="relative w-full max-w-md bg-card rounded-lg overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header gradient */}
                <div className={cn(
                  "h-24 bg-gradient-to-r",
                  getRarityColor(selectedAchievement.rarity)
                )} />
                
                {/* Icon */}
                <div className="relative flex justify-center">
                  <div className={cn(
                    "absolute -top-12 rounded-full p-5 bg-gradient-to-br border-4 border-card",
                    getRarityColor(selectedAchievement.rarity)
                  )}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      {selectedAchievement.icon}
                    </motion.div>
                  </div>
                </div>
                
                <div className="px-6 pt-16 pb-6">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold mb-1">{selectedAchievement.name}</h2>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full capitalize inline-block",
                      selectedAchievement.rarity === 'common' ? "bg-blue-500/10 text-blue-500" :
                      selectedAchievement.rarity === 'rare' ? "bg-purple-500/10 text-purple-500" :
                      selectedAchievement.rarity === 'epic' ? "bg-amber-500/10 text-amber-500" :
                      "bg-red-500/10 text-red-500"
                    )}>
                      {selectedAchievement.rarity} Achievement
                    </span>
                  </div>
                  
                  <p className="text-center text-muted-foreground mb-6">{selectedAchievement.description}</p>
                  
                  {selectedAchievement.unlocked ? (
                    <div className="flex flex-col items-center space-y-2 mb-6">
                      <div className="flex items-center space-x-2 text-green-500">
                        <Medal className="h-5 w-5" />
                        <span>Achievement Unlocked!</span>
                      </div>
                      {selectedAchievement.date && (
                        <span className="text-sm text-muted-foreground">
                          Completed on {new Date(selectedAchievement.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center mb-6">
                      <ProgressRing
                        progress={(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}
                        size={120}
                        strokeWidth={10}
                        progressClassName={cn(
                          selectedAchievement.rarity === 'common' ? "stroke-blue-500" :
                          selectedAchievement.rarity === 'rare' ? "stroke-purple-500" :
                          selectedAchievement.rarity === 'epic' ? "stroke-amber-500" :
                          "stroke-red-500"
                        )}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            {Math.round((selectedAchievement.progress / selectedAchievement.maxProgress) * 100)}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {selectedAchievement.progress}/{selectedAchievement.maxProgress}
                          </div>
                        </div>
                      </ProgressRing>
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    <motion.button
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAchievement(null)}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AchievementSystem;
