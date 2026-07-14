import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Share2, 
  Smartphone, 
  ShieldCheck, 
  Globe, 
  Search, 
  Eye, 
  Scale, 
  Cpu, 
  Brain 
} from 'lucide-react';
import { Accordion, AccordionItem } from '../ui/accordion';
import { moduleContents } from '../../moduleContentData';

interface LearningContentProps {
  moduleId: number;
  onCompleted: (isDone: boolean) => void;
  isCompleted: boolean;
}

const iconMap: { [key: string]: any } = {
  Newspaper,
  Share2,
  Smartphone,
  ShieldCheck,
  Globe,
  Search,
  Eye,
  Scale,
  Cpu,
  Brain
};

export default function LearningContent({ moduleId, onCompleted, isCompleted }: LearningContentProps) {
  const currentContent = moduleContents[moduleId] || moduleContents[1];
  const sections = currentContent.sections;
  const firstSectionId = sections[0]?.id || '';

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());

  // Reset states when the module changes
  useEffect(() => {
    if (firstSectionId) {
      setOpenSection(firstSectionId);
      setViewedSections(new Set([firstSectionId]));
    }
  }, [moduleId, firstSectionId]);

  const handleToggle = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
    if (sectionId) {
      const updated = new Set(viewedSections);
      updated.add(sectionId);
      setViewedSections(updated);
    }
  };

  // Automatically mark as complete when user opens all sections
  useEffect(() => {
    if (sections.length > 0 && viewedSections.size === sections.length && !isCompleted) {
      onCompleted(true);
    }
  }, [viewedSections, sections.length, isCompleted, onCompleted]);

  const formatContentText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-2" />;
      
      if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
        return (
          <li key={i} className="list-disc ml-4 text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed.match(/^\d+\./)) {
        return (
          <p key={i} className="text-xs sm:text-sm text-slate-800 leading-relaxed mt-2 font-bold pl-2.5 border-l-2 border-blue-500 bg-blue-50/30 py-1 rounded">
            {trimmed}
          </p>
        );
      }
      return (
        <p key={i} className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <Accordion>
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        const Icon = iconMap[section.iconName] || Newspaper;

        return (
          <AccordionItem
            key={section.id}
            value={section.id}
            isOpen={isOpen}
            onToggle={() => handleToggle(section.id)}
            trigger={
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-colors ${
                  isOpen ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-50 border border-slate-200/50 text-slate-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold transition-colors ${
                    isOpen ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
                  }`}>
                    {section.title}
                  </h4>
                  <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase mt-1 tracking-wider border ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>
              </div>
            }
          >
            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed p-1">
              {typeof section.content === 'string' ? (
                <div className="space-y-1.5">
                  {formatContentText(section.content)}
                </div>
              ) : (
                section.content
              )}

              {/* Special Addition: render a styled helper alert box for specific tabs */}
              {section.id === 'reliable-sources' && moduleId === 1 && (
                <div className="bg-blue-50/40 p-3 rounded-xl border border-blue-100 flex items-start gap-2 text-xs text-slate-600 mt-2">
                  <Globe className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p>
                    💡 <strong className="text-blue-900 font-bold">Lateral Reading Method:</strong> If a piece of news looks suspicious to you, don\'t stay on that page. Open a new browser tab, search for the topic in your preferred search engine, and check if reputable media outlets or independent fact-checkers (like Snopes, PolitiFact, or FactCheck.org) have already verified or debunked it.
                  </p>
                </div>
              )}
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
