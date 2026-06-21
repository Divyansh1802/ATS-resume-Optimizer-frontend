'use client';

import { Wrench, AlertCircle } from 'lucide-react';

interface FormattingIssue {
  issue: string;
  severity: string;
  fix: string;
}

export default function FormattingIssuesCard({ issues }: { issues: FormattingIssue[] }) {
  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900';
    if (severity === 'medium') return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900';
    return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900';
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === 'high') return 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200';
    if (severity === 'medium') return 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200';
    return 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-4 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Wrench className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Formatting Issues</h3>
      </div>

      <div className="space-y-3">
        {issues.map((issue, idx) => (
          <div key={idx} className={`border rounded-lg p-4 ${getSeverityColor(issue.severity)} transition-colors duration-200`}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-1 flex-shrink-0 dark:text-white" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{issue.issue}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityBadge(issue.severity)}`}>
                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{issue.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
