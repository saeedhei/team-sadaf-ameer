import React from 'react';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Loading module content...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-100 rounded-full animate-pulse" />
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-xs sm:text-sm font-semibold text-slate-500 animate-pulse">
        {message}
      </p>
    </div>
  );
}
