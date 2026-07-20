import React from 'react';
import { BookOpen } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-blue-100/60 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md shadow-blue-500/15 shrink-0">
          <BookOpen className="w-6 h-6 stroke-[2]" />
        </div>
        <div className="space-y-1">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100/60 uppercase tracking-wider">
              {badge}
            </span>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 leading-normal">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
