import React from 'react';
import { Star, Clock, BarChart, Compass } from 'lucide-react';
import { Module } from '../../types';
import { moduleContents } from '../../moduleContentData';

interface HeroProps {
  activeModule: Module;
}

export default function Hero({ activeModule }: HeroProps) {
  const content = moduleContents[activeModule.id] || moduleContents[1];
  const imageUrl = content.imageUrl;

  return (
    <section className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl border border-blue-100/80 shadow-md p-5 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Text metadata */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-blue-50 text-blue-600 border border-blue-100/60">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>Module {activeModule.number}</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {activeModule.title}
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
            "{activeModule.description}"
          </p>

          {/* Rating & meta chips row */}
          <div className="flex flex-wrap items-center gap-3.5 text-xs pt-1">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              <span>{activeModule.rating}</span>
              <span className="text-slate-400 font-normal">({activeModule.reviews})</span>
            </div>
            
            <span className="text-slate-300">•</span>
            
            <span className="text-slate-600 flex items-center gap-1 font-semibold">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{activeModule.duration}</span>
            </span>

            <span className="text-slate-300">•</span>

            <span className="text-slate-600 flex items-center gap-1 font-semibold">
              <BarChart className="w-4 h-4 text-indigo-500" />
              <span>{activeModule.level}</span>
            </span>
          </div>
        </div>

        {/* Hero image for the module */}
        <div className="lg:col-span-5 relative aspect-video sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-blue-50/60 shadow-md">
          <img 
            src={imageUrl} 
            alt={activeModule.title} 
            className="w-full h-full object-cover select-none animate-fade-in"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
