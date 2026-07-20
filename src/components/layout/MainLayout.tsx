import React from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MainLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  progress: number;
}

export default function MainLayout({
  sidebar,
  children,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  progress
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f3f7fc] text-slate-800 font-sans flex antialiased relative w-full">
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-blue-100/80 shrink-0 sticky top-0 h-screen select-none">
        {sidebar}
      </aside>

      {/* MOBILE DRAWER SIDEBAR */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            {/* Drawer Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-80 max-w-[calc(100vw-3rem)] bg-white h-full shadow-2xl flex flex-col z-10"
            >
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              {sidebar}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* MOBILE TOP NAVIGATION BAR */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-blue-100/80 px-4 py-3 sticky top-0 z-40 flex items-center justify-between shadow-sm select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-xs tracking-tight uppercase">Acuity Learn</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500">Progress:</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100/60 px-2 py-0.5 rounded-full font-mono">
              {progress}%
            </span>
          </div>
        </header>

        {/* PAGE CONTENT PANEL */}
        {children}
        
      </div>
    </div>
  );
}
