'use client';

import { CheckCircle, Star } from 'lucide-react';

interface Strength {
  section: string;
  title: string;
  detail: string;
  impact: string;
}

export default function StrengthsCard({ strengths }: { strengths: Strength[] }) {
  const getImpactColor = (impact: string) => {
    if (impact === 'high') return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    if (impact === 'medium') return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
  };

  const getImpactLabel = (impact: string) => {
    if (impact === 'high') return 'High Impact';
    if (impact === 'medium') return 'Medium Impact';
    return 'Low Impact';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-4 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Strengths</h3>
      </div>

      <div className="space-y-3">
        {strengths.map((strength, idx) => (
          <div key={idx} className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900 transition-colors duration-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{strength.title}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getImpactColor(strength.impact)}`}>
                    {getImpactLabel(strength.impact)}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{strength.detail}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Section: {strength.section}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
