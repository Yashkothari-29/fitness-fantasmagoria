
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { User, Settings, Medal, Star, Award, Dumbbell, FileText, ChevronRight } from 'lucide-react';
import { useFitness } from '@/contexts/FitnessContext';

const Profile = () => {
  const { fitnessData } = useFitness();
  
  const achievements = [
    { name: "Early Bird", description: "Complete 5 workouts before 8 AM", progress: 80, icon: <Star className="h-4 w-4" /> },
    { name: "Marathon Runner", description: "Run a total of 42.2 km", progress: 65, icon: <Award className="h-4 w-4" /> },
    { name: "Consistency King", description: "Work out for 7 days in a row", progress: 100, icon: <Medal className="h-4 w-4" /> },
    { name: "Weight Warrior", description: "Lift 1000kg total in a week", progress: 45, icon: <Dumbbell className="h-4 w-4" /> },
  ];
  
  return (
    <div className="min-h-screen bg-background cybernetic-bg">
      <Navbar />
      
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and achievements</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="cyber-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/avatar-1.png" alt="User" />
                    <AvatarFallback className="bg-cyber-purple text-white">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold mb-1">Fitness User</h2>
                  <p className="text-muted-foreground text-sm mb-4">Level {fitnessData.level} Fitness Explorer</p>
                  
                  <div className="w-full mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Level Progress</span>
                      <span>{Math.floor(fitnessData.xp % 100)}/100 XP</span>
                    </div>
                    <Progress value={fitnessData.levelProgress * 100} className="h-2" />
                  </div>
                  
                  <div className="w-full grid grid-cols-3 gap-2 mb-6">
                    <div className="flex flex-col items-center p-2 bg-secondary rounded-md">
                      <span className="text-lg font-bold">{fitnessData.steps.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">Steps</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-secondary rounded-md">
                      <span className="text-lg font-bold">{fitnessData.calories.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">Calories</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-secondary rounded-md">
                      <span className="text-lg font-bold">{fitnessData.activeMinutes}</span>
                      <span className="text-xs text-muted-foreground">Minutes</span>
                    </div>
                  </div>
                  
                  <div className="w-full space-y-2">
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Data
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="achievements">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="cybernetics">Cybernetic Upgrades</TabsTrigger>
              </TabsList>
              
              <TabsContent value="achievements">
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-md mr-3">
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{achievement.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                              <div className="flex items-center">
                                <Progress value={achievement.progress} className="h-2 flex-1 mr-3" />
                                <span className="text-xs font-medium">{achievement.progress}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="cybernetics">
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle>Cybernetic Upgrades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "Neuro-Kinetic Legs", level: 5, description: "Enhanced running speed and stamina", unlocked: fitnessData.level >= 5 },
                        { name: "Bionic Arms", level: 10, description: "Improved strength and grip, +20% lifting capacity", unlocked: fitnessData.level >= 10 },
                        { name: "Core Stabilizers", level: 15, description: "Better balance and posture protection", unlocked: fitnessData.level >= 15 },
                        { name: "Cardio Amplifier", level: 20, description: "Improved heart efficiency and oxygen processing", unlocked: fitnessData.level >= 20 },
                      ].map((upgrade, index) => (
                        <div 
                          key={index} 
                          className={`border border-border rounded-lg p-4 ${
                            upgrade.unlocked 
                              ? 'bg-gradient-to-br from-cyber-green/10 to-cyber-blue/10 border-cyber-green/30' 
                              : 'opacity-60'
                          }`}
                        >
                          <h3 className="font-medium mb-1 flex items-center">
                            {upgrade.name}
                            {upgrade.unlocked && (
                              <span className="ml-2 text-xs bg-cyber-green text-white px-2 py-0.5 rounded-full">Active</span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{upgrade.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Required Level: {upgrade.level}</span>
                            {upgrade.unlocked ? (
                              <Button size="sm" variant="outline" className="h-7 text-xs">Upgrade</Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled className="h-7 text-xs">Locked</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Upcoming Upgrades</h3>
                      <div className="border border-border rounded-lg p-4 bg-card/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Neural Interface</h4>
                            <p className="text-sm text-muted-foreground">Mental focus and cognitive enhancement</p>
                          </div>
                          <div className="text-sm font-medium text-cyber-purple">Level 25</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
