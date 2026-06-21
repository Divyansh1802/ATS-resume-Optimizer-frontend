'use client';

import { BarChart3 } from 'lucide-react';

interface ATSScoreProps {
  score: {
    overall: number;
    grade: string;
    passing: boolean;
    breakdown: {
      keyword_match: number;
      formatting: number;
      section_completeness: number;
      quantification: number;
      readability: number;
    };
  };
}

const ScoreBar = ({ label, value }: { label: string; value: number }) => {
  const getColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">{value}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className={`${getColor(value)} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function ATSScoreCard({ score }: ATSScoreProps) {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900';
    if (grade.startsWith('B')) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900';
    if (grade.startsWith('C')) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-6 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">ATS Score Breakdown</h3>
      </div>

      {/* Overall Score */}
      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Overall Score</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{score.overall}/100</p>
        </div>
        <div className={`text-5xl font-bold rounded-lg px-6 py-4 ${getGradeColor(score.grade)} transition-colors duration-200`}>
          {score.grade}
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-900 dark:text-white">Score Breakdown</h4>
        <ScoreBar label="Keyword Match" value={score.breakdown.keyword_match} />
        <ScoreBar label="Formatting" value={score.breakdown.formatting} />
        <ScoreBar label="Section Completeness" value={score.breakdown.section_completeness} />
        <ScoreBar label="Quantification" value={score.breakdown.quantification} />
        <ScoreBar label="Readability" value={score.breakdown.readability} />
      </div>
    </div>
  );
}
