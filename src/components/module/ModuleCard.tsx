import React from 'react';
import { BookOpen, Star, Clock, Lock, CheckCircle2 } from 'lucide-react';
import { Module } from '../../types';
import { Card, CardContent } from '../ui/card';

interface ModuleCardProps {
  module: Module;
  isActive: boolean;
  onSelect: (id: number) => void;
  isCompleted: boolean;
}

export default function ModuleCard({ module, isActive, onSelect, isCompleted }: ModuleCardProps) {
  const isLocked = module.status === 'locked';

  return (
    <Card 
      onClick={() => !isLocked && onSelect(module.id)}
      className={`transition-all duration-200 overflow-hidden cursor-pointer ${
        isActive 
          ? 'ring-2 ring-blue-600 border-transparent shadow-md' 
          : isLocked 
            ? 'opacity-60 bg-slate-50 border-slate-100 cursor-not-allowed' 
            : 'hover:shadow-md hover:border-blue-200/60 bg-white'
      }`}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${
              isActive 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : isLocked 
                  ? 'bg-slate-100 border-slate-200/60 text-slate-400' 
                  : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              <BookOpen className="w-4 h-4" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Module {module.number}
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                {module.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                {module.description}
              </p>
            </div>
          </div>

          <div className="shrink-0 pt-0.5">
            {isLocked ? (
              <div className="p-1.5 bg-slate-100 rounded-lg text-slate-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
            ) : isCompleted ? (
              <div className="p-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="p-1.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 text-[9px] font-bold uppercase tracking-wider">
                Live
              </div>
            )}
          </div>
        </div>

        {/* Info badges footer */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] text-slate-500 mt-4 border-t border-slate-100/60 pt-3">
          <span className="flex items-center gap-1 font-semibold text-slate-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            {module.rating}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {module.duration}
          </span>
          <span className="text-slate-300">•</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded font-bold uppercase text-[9px] text-slate-600">
            {module.level}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
