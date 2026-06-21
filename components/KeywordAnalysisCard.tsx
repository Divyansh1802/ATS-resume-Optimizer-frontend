'use client';

import { Tag, AlertTriangle, TrendingUp } from 'lucide-react';

interface KeywordAnalysisProps {
  keywords: {
    matched: string[];
    missing: string[];
    overused: string[];
    match_percentage: number;
  };
}

export default function KeywordAnalysisCard({ keywords }: KeywordAnalysisProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-6 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Tag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Keyword Analysis</h3>
      </div>

      {/* Match Percentage */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg transition-colors duration-200">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Keyword Match Rate</p>
        <div className="flex items-center gap-2">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{keywords.match_percentage}%</div>
          <p className="text-sm text-slate-600 dark:text-slate-400">of job keywords found in resume</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Matched Keywords */}
        <div className="space-y-2">
          <h4 className="font-semibold text-green-700 dark:text-green-400 text-sm">✓ Matched Keywords ({keywords.matched.length})</h4>
          <div className="space-y-1">
            {keywords.matched.slice(0, 6).map((keyword, idx) => (
              <div key={idx} className="px-3 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-400 rounded text-sm">
                {keyword}
              </div>
            ))}
            {keywords.matched.length > 6 && (
              <p className="text-xs text-slate-600 dark:text-slate-400 px-2">
                +{keywords.matched.length - 6} more
              </p>
            )}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="space-y-2">
          <h4 className="font-semibold text-red-700 dark:text-red-400 text-sm">✗ Missing Keywords ({keywords.missing.length})</h4>
          <div className="space-y-1">
            {keywords.missing.slice(0, 6).map((keyword, idx) => (
              <div key={idx} className="px-3 py-1 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-400 rounded text-sm">
                {keyword}
              </div>
            ))}
            {keywords.missing.length > 6 && (
              <p className="text-xs text-slate-600 dark:text-slate-400 px-2">
                +{keywords.missing.length - 6} more
              </p>
            )}
          </div>
        </div>

        {/* Overused Keywords */}
        <div className="space-y-2">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 text-sm">⚠ Overused Keywords ({keywords.overused.length})</h4>
          <div className="space-y-1">
            {keywords.overused.slice(0, 6).map((keyword, idx) => (
              <div key={idx} className="px-3 py-1 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-400 rounded text-sm">
                {keyword}
              </div>
            ))}
            {keywords.overused.length > 6 && (
              <p className="text-xs text-slate-600 dark:text-slate-400 px-2">
                +{keywords.overused.length - 6} more
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
