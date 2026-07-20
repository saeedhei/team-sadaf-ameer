import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ModuleNavigationProps {
  progress: number;
  onNextModule: () => void;
  onPrevModule?: () => void;
  hasPrev?: boolean;
}

export default function ModuleNavigation({
  progress,
  onNextModule,
  onPrevModule,
  hasPrev = false
}: ModuleNavigationProps) {
  const isComplete = progress === 100;

  const handleNextClick = () => {
    if (!isComplete) {
      const notifyDiv = document.createElement('div');
      notifyDiv.className = "fixed bottom-4 right-4 bg-white text-blue-800 px-4 py-2.5 rounded-lg shadow-xl z-50 text-xs font-semibold border border-blue-200 animate-bounce";
      notifyDiv.innerText = "Please complete all steps (Theory, Video & Exercise) first!";
      document.body.appendChild(notifyDiv);
      setTimeout(() => notifyDiv.remove(), 2500);
    } else {
      onNextModule();
    }
  };

  return (
    <footer className="bg-white rounded-2xl border border-blue-100/80 shadow-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      <div className="text-center sm:text-left space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Module Progress: {progress}%
        </span>
        <p className="text-xs text-slate-500 font-medium">
          {isComplete 
            ? '🎉 Congratulations! You have completed this module.' 
            : 'Complete all tasks to unlock the next module.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          disabled={!hasPrev}
          onClick={onPrevModule}
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Previous Module
        </Button>

        <button
          onClick={handleNextClick}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
            isComplete
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white animate-pulse'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/10'
          }`}
        >
          <span>Next Module</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </footer>
  );
}
