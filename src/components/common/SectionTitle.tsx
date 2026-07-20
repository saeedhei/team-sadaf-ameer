import React from 'react';

interface SectionTitleProps {
  number: string;
  title: string;
  badge?: string;
  badgeColor?: string;
}

export default function SectionTitle({
  number,
  title,
  badge,
  badgeColor = 'bg-blue-50 text-blue-600 border-blue-100/60'
}: SectionTitleProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
        <span className="text-xs font-black w-6 h-6 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 flex items-center justify-center shrink-0">
          {number}
        </span>
        <span>{title}</span>
      </h3>
      {badge && (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeColor} self-start sm:self-auto shrink-0`}>
          {badge}
        </span>
      )}
    </div>
  );
}
