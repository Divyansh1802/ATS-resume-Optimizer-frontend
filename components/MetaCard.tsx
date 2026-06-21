'use client';

import { Info, Calendar, Files, BookMarked } from 'lucide-react';

interface Meta {
  word_count: number;
  page_count: number;
  file_name: string;
  analyzed_at: string;
  job_description_provided: boolean;
}

export default function MetaCard({ meta }: { meta: Meta }) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-4 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Info className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analysis Details</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Word Count */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-2 mb-1">
            <BookMarked className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Word Count</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{meta.word_count}</p>
        </div>

        {/* Page Count */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-2 mb-1">
            <Files className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Pages</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{meta.page_count}</p>
        </div>

        {/* Job Description */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Job Description</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {meta.job_description_provided ? '✓' : '✗'}
          </p>
        </div>
      </div>

      {/* File Name and Analyzed Date */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2 transition-colors duration-200">
        <div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">File Name</p>
          <p className="text-sm text-slate-900 dark:text-white break-all">{meta.file_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Analyzed At</p>
            <p className="text-sm text-slate-900 dark:text-white">{formatDate(meta.analyzed_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
