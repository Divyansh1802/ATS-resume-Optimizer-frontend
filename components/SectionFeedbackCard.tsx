'use client';

import { FileText } from 'lucide-react';

interface SectionFeedback {
  section: string;
  present: boolean;
  score: number;
  suggestion: string;
}

export default function SectionFeedbackCard({ sections }: { sections: SectionFeedback[] }) {
  const getScoreColor = (score: number, present: boolean) => {
    if (!present) return 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    if (score >= 80) return 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800';
    if (score >= 60) return 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800';
    return 'bg-orange-50 dark:bg-orange-900 border-orange-200 dark:border-orange-800';
  };

  const getScoreTextColor = (score: number, present: boolean) => {
    if (!present) return 'text-slate-600 dark:text-slate-400';
    if (score >= 80) return 'text-green-700 dark:text-green-400';
    if (score >= 60) return 'text-blue-700 dark:text-blue-400';
    return 'text-orange-700 dark:text-orange-400';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-4 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Section Feedback</h3>
      </div>

      <div className="space-y-3">
        {sections.map((section, idx) => (
          <div key={idx} className={`border rounded-lg p-4 ${getScoreColor(section.score, section.present)} transition-colors duration-200`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900 dark:text-white">{section.section}</h4>
              <div className="flex items-center gap-2">
                {section.present ? (
                  <>
                    <span className="text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                      Present
                    </span>
                    <span className={`text-lg font-bold ${getScoreTextColor(section.score, true)}`}>
                      {section.score}%
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded">
                    Missing
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">{section.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
