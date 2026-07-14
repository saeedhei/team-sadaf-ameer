import React from 'react';
import { motion } from 'motion/react';

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = '' }: ProgressProps) {
  // Ensure value is bounded between 0 and 100
  const clampedValue = Math.min(Math.max(0, value), 100);

  return (
    <div className={`w-full h-2 bg-slate-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}
