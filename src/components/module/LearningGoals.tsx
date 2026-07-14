import React from 'react';
import { Target, Shield, Brain } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { learningGoals } from '../../data';

interface LearningGoalsProps {
  goals?: typeof learningGoals;
}

export default function LearningGoals({ goals = learningGoals }: LearningGoalsProps) {
  const iconMap: { [key: string]: any } = {
    Target,
    Shield,
    Brain
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {goals.map((goal, index) => {
        const IconComponent = iconMap[goal.icon] || Target;
        return (
          <Card key={index} className="hover:shadow-md hover:border-blue-200/80 transition-all duration-250">
            <CardContent className="p-4 sm:p-5 flex items-start gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  {goal.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
