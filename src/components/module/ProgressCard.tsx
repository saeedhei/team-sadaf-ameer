import React from 'react';
import { CheckCircle2, Circle, Star, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';

interface ProgressCardProps {
  progress: number;
  completedSteps: { [key: string]: boolean };
  onToggleStep?: (stepKey: string, isDone: boolean) => void;
}

export default function ProgressCard({ progress, completedSteps, onToggleStep }: ProgressCardProps) {
  const steps = [
    { key: 'introduction', label: '📖 Introduction: Read the basics', weight: '25%' },
    { key: 'accordion', label: '📚 Theory & Content: View all sections', weight: '25%' },
    { key: 'video', label: '🎬 Video Seminar: Play the video lesson', weight: '25%' },
    { key: 'quiz', label: '🧠 Practice Exercise: Solve "Real or Fake?"', weight: '25%' }
  ];

  return (
    <Card className="border-blue-200/60 bg-white/80 backdrop-blur-md shadow-md">
      <CardContent className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Your Learning Progress</span>
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Complete all sections to fully complete the active module.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full font-mono shrink-0">
            {progress}% completed
          </span>
        </div>

        {/* Progress bar */}
        <Progress value={progress} />

        {/* Step-by-step checklist */}
        <div className="pt-2 border-t border-blue-50/50 space-y-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Chapter Checklist
          </span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {steps.map((step) => {
              const isDone = completedSteps[step.key];
              return (
                <div
                  key={step.key}
                  onClick={() => onToggleStep?.(step.key, !isDone)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                    onToggleStep ? 'cursor-pointer' : ''
                  } ${
                    isDone 
                      ? 'bg-emerald-50/40 border-emerald-100 text-emerald-900 font-semibold' 
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <span className="text-[11px] sm:text-xs leading-normal break-words">{step.label}</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                    isDone ? 'bg-emerald-100/60 text-emerald-800' : 'bg-slate-200/50 text-slate-500'
                  }`}>
                    +{step.weight}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
