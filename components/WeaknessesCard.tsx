'use client';

import { AlertTriangle, Lightbulb } from 'lucide-react';

interface Weakness {
  section: string;
  title: string;
  detail: string;
  severity: string;
  fix: string;
}

export default function WeaknessesCard({ weaknesses }: { weaknesses: Weakness[] }) {
  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200';
    if (severity === 'medium') return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
    return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === 'high') return 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200';
    if (severity === 'medium') return 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200';
    return 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-4 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Weaknesses</h3>
      </div>

      <div className="space-y-3">
        {weaknesses.map((weakness, idx) => (
          <div key={idx} className={`border rounded-lg p-4 ${getSeverityColor(weakness.severity)} transition-colors duration-200`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold dark:text-white">{weakness.title}</h4>
              <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityBadge(weakness.severity)}`}>
                {weakness.severity.charAt(0).toUpperCase() + weakness.severity.slice(1)} Severity
              </span>
            </div>
            <p className="text-sm mb-3 dark:text-gray-200">{weakness.detail}</p>
            <div className="flex items-start gap-2 p-2 bg-white dark:bg-slate-800 bg-opacity-60 rounded">
              <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 dark:text-yellow-400" />
              <div>
                <p className="text-xs font-semibold mb-1 dark:text-slate-300">Suggested Fix:</p>
                <p className="text-sm dark:text-slate-400">{weakness.fix}</p>
              </div>
            </div>
            <p className="text-xs mt-2 opacity-75 dark:text-slate-400">Section: {weakness.section}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
