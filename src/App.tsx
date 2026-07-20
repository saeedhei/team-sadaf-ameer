import React, { useState } from 'react';
import { 
  ArrowLeft, 
  X, 
  MessageSquare, 
  Send, 
  Check, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Core Reusable Layout & Common Components
import MainLayout from './components/layout/MainLayout';
import Sidebar from './components/layout/Sidebar';
import PageHeader from './components/common/PageHeader';
import SectionTitle from './components/common/SectionTitle';

// Module specific Components
import Hero from './components/module/Hero';
import LearningGoals from './components/module/LearningGoals';
import LearningContent from './components/module/LearningContent';
import VideoSection from './components/module/VideoSection';
import InteractiveExercise from './components/module/InteractiveExercise';
import ProgressCard from './components/module/ProgressCard';
import ModuleNavigation from './components/module/ModuleNavigation';

// Core UI Components
import { Button } from './components/ui/button';

// Data Sources
import { modulesData } from './data';
import { moduleContents } from './moduleContentData';

export default function App() {
  const [currentModuleId, setCurrentModuleId] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(25); // Starts at 25% (intro read)
  
  // Modal states
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);

  // Support form state
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMsg, setSupportMsg] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportLoading, setSupportLoading] = useState(false);

  // Task list (individual sub-modules completion)
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({
    introduction: true, // starts complete
    accordion: false,
    video: false,
    quiz: false
  });

  // Calculate live progress percentage
  const updateStepCompleted = (stepKey: string, isDone: boolean) => {
    const updated = { ...completedSteps, [stepKey]: isDone };
    setCompletedSteps(updated);

    let val = 25; // default introduction is 25%
    if (updated.accordion) val += 25;
    if (updated.video) val += 25;
    if (updated.quiz) val += 25;
    setProgress(val);

    // If fully completed, fire a celebrating confetti!
    if (val === 100 && progress < 100) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMsg) return;
    setSupportLoading(true);
    setTimeout(() => {
      setSupportLoading(false);
      setSupportSubmitted(true);
      setTimeout(() => {
        setSupportSubmitted(false);
        setSupportModalOpen(false);
        setSupportName('');
        setSupportEmail('');
        setSupportMsg('');
      }, 2500);
    }, 1200);
  };

  const handleExitConfirm = () => {
    setExitModalOpen(false);
    const notifyDiv = document.createElement('div');
    notifyDiv.className = "fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl z-50 text-xs font-semibold border border-slate-700 animate-bounce";
    notifyDiv.innerText = "Learning unit exited. Your progress was saved locally.";
    document.body.appendChild(notifyDiv);
    setTimeout(() => notifyDiv.remove(), 3000);
  };

  const handleNextModule = () => {
    if (currentModuleId < modulesData.length) {
      const nextId = currentModuleId + 1;
      const notifyDiv = document.createElement('div');
      notifyDiv.className = "fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl z-50 text-xs font-semibold border border-emerald-500 animate-bounce";
      notifyDiv.innerText = `Excellent! Module ${nextId} is now loading...`;
      document.body.appendChild(notifyDiv);
      
      setTimeout(() => {
        notifyDiv.remove();
        setCurrentModuleId(nextId);
        setProgress(25);
        setCompletedSteps({
          introduction: true,
          accordion: false,
          video: false,
          quiz: false
        });
      }, 1500);
    } else {
      const notifyDiv = document.createElement('div');
      notifyDiv.className = "fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl z-50 text-xs font-semibold border border-emerald-500 animate-bounce";
      notifyDiv.innerText = "Amazing! You have successfully completed the entire program!";
      document.body.appendChild(notifyDiv);
      setTimeout(() => notifyDiv.remove(), 4000);
    }
  };

  const handlePrevModule = () => {
    if (currentModuleId > 1) {
      const prevId = currentModuleId - 1;
      const notifyDiv = document.createElement('div');
      notifyDiv.className = "fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2.5 rounded-lg shadow-xl z-50 text-xs font-semibold border border-blue-500 animate-bounce";
      notifyDiv.innerText = `Module ${prevId} is now loading...`;
      document.body.appendChild(notifyDiv);

      setTimeout(() => {
        notifyDiv.remove();
        setCurrentModuleId(prevId);
        setProgress(25);
        setCompletedSteps({
          introduction: true,
          accordion: false,
          video: false,
          quiz: false
        });
      }, 1000);
    }
  };

  const activeModule = modulesData.find(m => m.id === currentModuleId) || modulesData[0];
  const currentContent = moduleContents[currentModuleId] || moduleContents[1];

  // Assemble sidebar component
  const sidebarElement = (
    <Sidebar
      modules={modulesData}
      activeModule={activeModule}
      progress={progress}
      onSelectModule={(id) => {
        setCurrentModuleId(id);
        setMobileSidebarOpen(false);
      }}
      onOpenSupport={() => setSupportModalOpen(true)}
      onOpenExit={() => setExitModalOpen(true)}
      completedSteps={completedSteps}
    />
  );

  return (
    <MainLayout
      sidebar={sidebarElement}
      mobileSidebarOpen={mobileSidebarOpen}
      setMobileSidebarOpen={setMobileSidebarOpen}
      progress={progress}
    >
      
      {/* HEADER SECTION FOR MODULE INFO */}
      <header className="hidden lg:flex bg-white/95 backdrop-blur-md border-b border-blue-100/80 h-16 sticky top-0 z-30 px-6 items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              const notifyDiv = document.createElement('div');
              notifyDiv.className = "fixed bottom-4 right-4 bg-white text-blue-800 px-4 py-2.5 rounded-lg shadow-xl z-50 text-xs font-semibold border border-blue-200 animate-bounce";
              notifyDiv.innerText = "Back to Overview...";
              document.body.appendChild(notifyDiv);
              setTimeout(() => notifyDiv.remove(), 2500);
            }}
            className="group flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Overview</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 font-bold">Program: Digital Literacy</span>
          <Button 
            onClick={() => setExitModalOpen(true)}
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100/60"
          >
            Exit Module
          </Button>
        </div>
      </header>

      {/* CORE VIEWPORT SCROLL CONTAINER */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:p-8 max-w-5xl mx-auto w-full space-y-6">
        
        {/* PAGE HEADER */}
        <PageHeader 
          title={`Module ${currentModuleId}: ${currentContent.title}`}
          subtitle={currentContent.subtitle}
          badge="Active"
        />

        {/* HERO BANNER BLOCK */}
        <Hero activeModule={activeModule} />

        {/* COMPREHENSIVE LEARNING PROGRESS CARD */}
        <ProgressCard 
          progress={progress} 
          completedSteps={completedSteps} 
          onToggleStep={(key, isDone) => {
            // Let the user toggle steps manually to practice or complete items easily
            updateStepCompleted(key, isDone);
          }}
        />

        {/* EDUCATIONAL OBJECTIVES */}
        <section className="space-y-3">
          <SectionTitle 
            number="1" 
            title="Learning Objectives" 
            badge="Skills" 
          />
          <LearningGoals goals={currentContent.learningGoals} />
        </section>

        {/* LEARNING ACCORDION SEGMENT */}
        <section className="space-y-3">
          <SectionTitle 
            number="2" 
            title="Theory & Learning Content" 
            badge="Interactive" 
          />
          <LearningContent 
            moduleId={currentModuleId}
            isCompleted={completedSteps.accordion}
            onCompleted={(done) => updateStepCompleted('accordion', done)}
          />
        </section>

        {/* VIDEO SEMINAR PLAYER SECTION */}
        <section className="space-y-3">
          <SectionTitle 
            number="3" 
            title="Video Seminar: Focusing on Disinformation" 
            badge="Video" 
          />
          <VideoSection 
            moduleId={currentModuleId}
            isCompleted={completedSteps.video}
            onCompleted={(done) => updateStepCompleted('video', done)}
          />
        </section>

        {/* INTERACTIVE PRACTICE GAME */}
        <section className="space-y-3">
          <SectionTitle 
            number="4" 
            title="Interactive Exercise: Real or Fake?" 
            badge="Practice" 
          />
          <InteractiveExercise 
            moduleId={currentModuleId}
            isCompleted={completedSteps.quiz}
            onCompleted={(done) => updateStepCompleted('quiz', done)}
          />
        </section>

        {/* PROGRESS CONTROL BAR FOOTER */}
        <ModuleNavigation 
          progress={progress} 
          onNextModule={handleNextModule}
          onPrevModule={handlePrevModule}
          hasPrev={currentModuleId > 1}
        />

      </main>

      {/* FAQ / ASSISTANCE FORM MODAL */}
      <AnimatePresence>
        {supportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSupportModalOpen(false)}
              className="absolute inset-0 bg-black/45"
            />

            <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 15 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 15 }}
               className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative border border-blue-100/80 z-10 overflow-hidden"
            >
              <button 
                onClick={() => setSupportModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex gap-3 items-center mb-4">
                <div className="p-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Contact Support</h3>
                  <p className="text-[10px] text-slate-400">Leave us a message regarding any questions</p>
                </div>
              </div>

              {supportSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Thank you for your inquiry. A digital literacy expert will respond within 2-4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={supportName}
                      onChange={(e) => setSupportName(e.target.value)}
                      placeholder="e.g., John Doe"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="e.g., john@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Your Message / Question</label>
                    <textarea 
                      required
                      rows={4}
                      value={supportMsg}
                      onChange={(e) => setSupportMsg(e.target.value)}
                      placeholder="How can we help you with news verification or digital media literacy?"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={supportLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/15 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {supportLoading ? (
                      <span className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Support Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRMATION FOR LEAVING MODULE */}
      <AnimatePresence>
        {exitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setExitModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative border border-blue-100 z-10 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-500 border border-rose-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Exit module?</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Are you sure you want to exit the current learning module? Your progress will remain saved.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setExitModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/60 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExitConfirm}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer"
                >
                  Yes, exit
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </MainLayout>
  );
}
