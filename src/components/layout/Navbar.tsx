
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell, Moon, Sun, User, Menu, Home, Users, Activity, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { useFitness } from '@/contexts/FitnessContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { fitnessData } = useFitness();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Navigation links data
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
    { name: 'Social', path: '/social', icon: <Users className="h-5 w-5" /> },
    { name: 'Judge Demo', path: '/judge', icon: <Award className="h-5 w-5" /> },
  ];
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl font-bold flex items-center">
                  <span className="bg-gradient-to-r from-cyber-purple to-cyber-blue bg-clip-text text-transparent">
                    Neuro<span className="text-cyber-orange">Fit</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col space-y-1 mt-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${
                      location.pathname === link.path 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-accent text-foreground hover:text-accent-foreground'
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    {location.pathname === link.path && (
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-cyber-purple ml-auto"
                        layoutId="navIndicator"
                      />
                    )}
                  </Link>
                ))}
              </div>
              
              <SheetFooter className="mt-auto">
                <div className="flex items-center justify-between w-full">
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-cyber-orange rounded-full"></span>
                  </Button>
                  
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatar-1.png" alt="Profile" />
                      <AvatarFallback className="bg-cyber-purple text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="text-xl font-bold text-foreground flex items-center">
            <span className="bg-gradient-to-r from-cyber-purple to-cyber-blue bg-clip-text text-transparent">
              Neuro<span className="text-cyber-orange">Fit</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`relative text-foreground hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary font-medium' : ''
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyber-purple to-cyber-blue"
                  layoutId="navIndicator"
                />
              )}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
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
