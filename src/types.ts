import React from 'react';

export interface Module {
  id: number;
  number: number;
  title: string;
  status: 'active' | 'available' | 'locked';
  duration: string;
  level: string;
  rating: number;
  reviews: number;
  description: string;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export interface LearningGoal {
  icon: string;
  title: string;
  description: string;
}
