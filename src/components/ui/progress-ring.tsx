
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  bgClassName?: string;
  progressClassName?: string;
  showValue?: boolean;
  valueClassName?: string;
  children?: React.ReactNode;
  animationDuration?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 100,
  strokeWidth = 8,
  className,
  bgClassName,
  progressClassName,
  showValue = false,
  valueClassName,
  children,
  animationDuration = 1.5
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (circumference * normalizedProgress) / 100;

  const trackVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: normalizedProgress / 100,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: animationDuration, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={cn("stroke-muted transition-all", bgClassName)}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          className={cn("stroke-primary transition-all", progressClassName)}
          initial="hidden"
          animate="visible"
          variants={trackVariants}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showValue ? (
          <span className={cn("text-2xl font-bold", valueClassName)}>
            {normalizedProgress}%
          </span>
        ) : children}
      </div>
    </div>
  );
};

export default ProgressRing;
