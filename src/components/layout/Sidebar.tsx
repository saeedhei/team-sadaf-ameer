import React from 'react';
import { BookOpen, HelpCircle, LogOut, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Module } from '../../types';
import { Progress } from '../ui/progress';

interface SidebarProps {
  modules: Module[];
  activeModule: Module;
  progress: number;
  onSelectModule: (id: number) => void;
  onOpenSupport: () => void;
  onOpenExit: () => void;
  completedSteps: { [key: string]: boolean };
}

export default function Sidebar({
  modules,
  activeModule,
  progress,
  onSelectModule,
  onOpenSupport,
  onOpenExit,
  completedSteps
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-full bg-white select-none">
      {/* Brand / Logo */}
      <div className="p-6 border-b border-blue-100/60 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
          <BookOpen className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none uppercase">Acuity Learn</h1>
          <p className="text-[10px] text-blue-600 font-bold tracking-wider uppercase mt-1">E-Learning Portal</p>
        </div>
      </div>

      {/* Course Header & Overall Progress */}
      <div className="p-5 border-b border-blue-100/60 bg-blue-50/20">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Course</span>
        <h2 className="text-xs font-bold text-slate-800 line-clamp-1">Digital Literacy Fundamentals</h2>
        
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-500">Course Progress</span>
            <span className="text-blue-600 font-mono">{progress}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      {/* Scrollable Course Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block px-2.5 mb-2">Modules</span>
        
        {modules.map((mod) => {
          const isActive = mod.id === activeModule.id;
          const isLocked = mod.status === 'locked';
          const isModule1AndDone = mod.id === 1 && completedSteps.quiz && completedSteps.video && completedSteps.accordion;
          
          return (
            <button
              key={mod.id}
              disabled={isLocked}
              onClick={() => onSelectModule(mod.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10 font-bold' 
                  : isLocked
                    ? 'opacity-50 bg-slate-50 border-slate-100/80 cursor-not-allowed text-slate-400'
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-blue-50/40'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-50 border border-slate-200/50 text-slate-500'
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`block text-[10px] uppercase tracking-wider ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    Module {mod.number}
                  </span>
                  <span className="block text-xs font-bold truncate leading-snug">
                    {mod.title}
                  </span>
                </div>
              </div>

              {/* Badges / Status */}
              <div className="shrink-0 pl-1">
                {isLocked ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : isModule1AndDone ? (
                  <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                ) : (
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    Live
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer / Utilities inside Sidebar */}
      <div className="p-4 border-t border-blue-100/60 space-y-2">
        <button
          onClick={onOpenSupport}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
          <span>Need Help / FAQ?</span>
        </button>

        <button 
          onClick={onOpenExit}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50/50 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Exit Learning Module</span>
        </button>
      </div>
    </div>
  );
}
