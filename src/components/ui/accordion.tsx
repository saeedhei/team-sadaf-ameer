import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionItemProps {
  key?: string | number;
  value: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  trigger,
  children,
  isOpen,
  onToggle
}: AccordionItemProps) {
  return (
    <div className={`rounded-2xl border transition-all overflow-hidden ${
      isOpen
        ? 'bg-blue-50/15 border-blue-300/80 shadow-md'
        : 'bg-white hover:bg-slate-50 border-blue-100 shadow-sm'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none cursor-pointer"
      >
        <div className="flex-1">{trigger}</div>
        <div className={`p-1 rounded-lg text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="p-5 pt-0 border-t border-blue-50/50">
              <div className="mt-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div className="space-y-3.5">{children}</div>;
}
