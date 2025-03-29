
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell, Moon, Sun, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useFitness } from '@/contexts/FitnessContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { fitnessData } = useFitness();
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-accent">
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-accent">
                  <span>Profile</span>
                </Link>
                <Link to="/social" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-accent">
                  <span>Social</span>
                </Link>
                <Link to="/judge" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-accent">
                  <span>Judge Demo</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="text-xl font-bold text-foreground flex items-center">
            <span className="bg-gradient-to-r from-cyber-purple to-cyber-blue bg-clip-text text-transparent">
              Neuro<span className="text-cyber-orange">Fit</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
            Profile
          </Link>
          <Link to="/social" className="text-foreground hover:text-primary transition-colors">
            Social
          </Link>
          <Link to="/judge" className="text-foreground hover:text-primary transition-colors">
            Judge Demo
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-cyber-orange rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/avatar-1.png" alt="Profile" />
              <AvatarFallback className="bg-cyber-purple text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block">
              <div className="text-sm font-medium">User</div>
              <div className="text-xs text-muted-foreground">Level {fitnessData.level}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
