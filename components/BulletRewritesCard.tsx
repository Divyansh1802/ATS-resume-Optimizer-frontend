'use client';

import { Edit3, ArrowRight } from 'lucide-react';

interface BulletRewrite {
  original: string;
  rewritten: string;
  reason: string;
}

export default function BulletRewritesCard({ rewrites }: { rewrites: BulletRewrite[] }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-6 space-y-4 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Edit3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bullet Point Rewrites</h3>
      </div>

      <div className="space-y-4">
        {rewrites.map((rewrite, idx) => (
          <div key={idx} className="border border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50 dark:bg-purple-900 transition-colors duration-200">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Original:</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 line-through opacity-75">{rewrite.original}</p>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Improved:</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white bg-white dark:bg-slate-800 rounded px-3 py-2">
                  {rewrite.rewritten}
                </p>
              </div>

              <div className="pt-2 border-t border-purple-200 dark:border-purple-800">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Why:</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{rewrite.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
