'use client';

import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  FileText,
  BarChart3,
} from 'lucide-react';
import ATSScoreCard from './ATSScoreCard';
import KeywordAnalysisCard from './KeywordAnalysisCard';
import StrengthsCard from './StrengthsCard';
import WeaknessesCard from './WeaknessesCard';
import SectionFeedbackCard from './SectionFeedbackCard';
import BulletRewritesCard from './BulletRewritesCard';
import FormattingIssuesCard from './FormattingIssuesCard';
import MetaCard from './MetaCard';

interface AnalysisData {
  ats_score: any;
  keyword_analysis: any;
  strengths: any[];
  weaknesses: any[];
  section_feedback: any[];
  bullet_rewrites: any[];
  formatting_issues: any[];
  meta: any;
}

export default function AnalysisResults({ data }: { data: AnalysisData }) {
  const getStatusColor = (passing: boolean) => {
    return passing ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800';
  };

  const getStatusIcon = (passing: boolean) => {
    return passing ? (
      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
    ) : (
      <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Overall Status */}
      <div className={`rounded-lg border p-6 flex items-center gap-4 ${getStatusColor(data.ats_score.passing)} transition-colors duration-200`}>
        {getStatusIcon(data.ats_score.passing)}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {data.ats_score.passing ? '✓ Resume Passes ATS' : '✗ Resume Needs Improvements'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Overall score: {data.ats_score.overall}/100 ({data.ats_score.grade})
          </p>
        </div>
      </div>

      {/* 1. ATS Score */}
      <ATSScoreCard score={data.ats_score} />

      {/* 2. Keyword Analysis */}
      <KeywordAnalysisCard keywords={data.keyword_analysis} />

      {/* 3. Strengths */}
      {data.strengths.length > 0 && <StrengthsCard strengths={data.strengths} />}

      {/* 4. Weaknesses */}
      {data.weaknesses.length > 0 && <WeaknessesCard weaknesses={data.weaknesses} />}

      {/* 5. Section Feedback */}
      {data.section_feedback.length > 0 && <SectionFeedbackCard sections={data.section_feedback} />}

      {/* 6. Bullet Rewrites */}
      {data.bullet_rewrites.length > 0 && <BulletRewritesCard rewrites={data.bullet_rewrites} />}

      {/* 7. Formatting Issues */}
      {data.formatting_issues.length > 0 && (
        <FormattingIssuesCard issues={data.formatting_issues} />
      )}

      {/* 8. Meta Information */}
      <MetaCard meta={data.meta} />
    </div>
  );
}
