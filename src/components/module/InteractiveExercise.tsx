import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, RotateCcw, AlertTriangle, CheckCircle, HelpCircle, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { moduleContents } from '../../moduleContentData';

interface InteractiveExerciseProps {
  moduleId: number;
  onCompleted: (isDone: boolean) => void;
  isCompleted: boolean;
}

interface ExampleCase {
  id: number;
  platform: 'WhatsApp' | 'TikTok' | 'Instagram';
  sender: string;
  avatar: string;
  timestamp: string;
  headline: string;
  postContent: string;
  imageUrl?: string;
  isReal: boolean;
  question: string;
  explanation: string;
  options: { label: string; value: boolean }[];
}

export default function InteractiveExercise({ moduleId, onCompleted, isCompleted }: InteractiveExerciseProps) {
  const currentContent = moduleContents[moduleId] || moduleContents[1];
  const cases = currentContent.exerciseCases;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Reset exercise when the module changes
  useEffect(() => {
    handleReset();
  }, [moduleId]);

  const currentCase = cases[currentIdx] || cases[0];

  const handleSelect = (val: boolean) => {
    if (isSubmitted) return;
    setSelectedAnswer(val);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || isSubmitted) return;
    setIsSubmitted(true);
    
    const isCorrect = selectedAnswer === currentCase.isReal;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);

    if (currentIdx + 1 < cases.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      onCompleted(true);
      // Trigger canvas-confetti celebration!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100/80 shadow-sm p-4 sm:p-6 overflow-hidden select-none">
      <div className="flex items-center justify-between mb-4 border-b border-blue-50 pb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Chapter 4</span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">🧠 Interactive Exercise: Real or Fake?</h3>
        </div>
        {!quizFinished && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/50">
            Example {currentIdx + 1} of {cases.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {quizFinished ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center py-6 space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-lg text-white">
              <Award className="w-10 h-10 animate-bounce" />
            </div>
            
            <h4 className="text-base sm:text-lg font-bold text-slate-900">Exercise completed successfully!</h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              You evaluated <span className="font-bold text-blue-600">{score} of {cases.length}</span> examples correctly!
            </p>

            <div className="max-w-md mx-auto p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/50 text-xs text-emerald-850 font-medium">
              🎉 Excellent! You have developed stellar digital source verification skills. Feel free to share your knowledge with family and friends!
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Repeat Exercise
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`${moduleId}-${currentIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              Evaluate the following social media post:
            </p>

            {/* Simulated Social Media Post Card */}
            <Card className="border-slate-200 shadow-xs max-w-lg mx-auto bg-slate-50/50 overflow-hidden">
              {/* Header */}
              <div className="p-3.5 border-b border-slate-100 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-lg shadow-inner">
                    {currentCase.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-800 block leading-tight">{currentCase.sender}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{currentCase.timestamp}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  currentCase.platform === 'WhatsApp' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  currentCase.platform === 'TikTok' ? 'bg-slate-900 text-white' : 'bg-pink-50 text-pink-600 border border-pink-100'
                }`}>
                  {currentCase.platform}
                </span>
              </div>

              {/* Body */}
              <CardContent className="p-4 bg-white space-y-2 text-xs sm:text-sm">
                <p className="font-extrabold text-slate-900">{currentCase.headline}</p>
                <p className="text-slate-600 leading-relaxed italic">"{currentCase.postContent}"</p>
              </CardContent>
            </Card>

            <h4 className="text-xs sm:text-sm font-bold text-slate-800 text-center mt-3">
              {currentCase.question}
            </h4>

            {/* Buttons for option selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {currentCase.options.map((option) => {
                const isSelected = selectedAnswer === option.value;
                const isOptionCorrect = option.value === currentCase.isReal;
                
                let btnStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300";
                
                if (isSelected) {
                  btnStyle = "border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600";
                }

                if (isSubmitted) {
                  if (isOptionCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500/50";
                  } else if (isSelected && !isOptionCorrect) {
                    btnStyle = "border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500/50";
                  } else {
                    btnStyle = "border-slate-100 bg-slate-50/40 text-slate-300 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={option.label}
                    disabled={isSubmitted}
                    onClick={() => handleSelect(option.value)}
                    className={`flex items-center justify-between gap-3 text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span className="leading-tight break-words flex-1">{option.label}</span>
                    {isSubmitted ? (
                      isOptionCorrect ? (
                        <span className="bg-emerald-500 text-white rounded-full p-0.5 shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      ) : isSelected ? (
                        <span className="bg-rose-500 text-white rounded-full p-0.5 shrink-0">
                          <X className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      ) : null
                    ) : (
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-blue-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border max-w-lg mx-auto text-xs leading-relaxed ${
                  selectedAnswer === currentCase.isReal
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-850'
                    : 'bg-rose-50 border-rose-100 text-rose-850'
                }`}
              >
                <div className="flex gap-2 items-start">
                  {selectedAnswer === currentCase.isReal ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block mb-1">
                      {selectedAnswer === currentCase.isReal ? 'Correctly solved!' : 'Not quite right!'}
                    </span>
                    {currentCase.explanation}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions: Submit or Next */}
            <div className="pt-2 flex justify-end max-w-lg mx-auto">
              {!isSubmitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  variant={selectedAnswer !== null ? 'primary' : 'default'}
                  size="sm"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="sm"
                >
                  <span>{currentIdx + 1 === cases.length ? 'Finish Exercise' : 'Next Example'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
