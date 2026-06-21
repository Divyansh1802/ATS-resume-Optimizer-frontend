'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Imported the official Next.js router
import ResumeUploadForm from '@/components/ResumeUploadForm';
import AnalysisResults from '@/components/AnalysisResults';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LogOut } from 'lucide-react';

interface AnalysisData {
  ats_score: {
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
  keyword_analysis: {
    matched: string[];
    missing: string[];
    overused: string[];
    match_percentage: number;
  };
  strengths: Array<{
    section: string;
    title: string;
    detail: string;
    impact: string;
  }>;
  weaknesses: Array<{
    section: string;
    title: string;
    detail: string;
    severity: string;
    fix: string;
  }>;
  section_feedback: Array<{
    section: string;
    present: boolean;
    score: number;
    suggestion: string;
  }>;
  bullet_rewrites: Array<{
    original: string;
    rewritten: string;
    reason: string;
  }>;
  formatting_issues: Array<{
    issue: string;
    severity: string;
    fix: string;
  }>;
  meta: {
    word_count: number;
    page_count: number;
    file_name: string;
    analyzed_at: string;
    job_description_provided: boolean;
  };
}

export default function HomePage() {
  const router = useRouter(); 
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisStart = () => {
    setIsLoading(true);
  };

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setIsLoading(false);
  };

  const handleAnalysisError = () => {
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      const response = await fetch(`${apiUrl}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        
        router.refresh();
        
        router.push('/login'); 
      } else {
        console.error('Server side logout failed verification:', response.status);
      }
    } catch (err) {
      console.error('Logout network action failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="bg-slate-50 dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ATS Optimizer</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Optimize your resume for ATS systems</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysisData ? (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-lg p-8 transition-colors duration-200">
            
            <ResumeUploadForm 
              isLoading={isLoading}
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setAnalysisData(null)}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-medium"
            >
              ← Analyze Another Resume
            </button>
            <AnalysisResults data={analysisData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 dark:text-slate-500 text-center py-6 mt-12 transition-colors duration-200">
        <p className="text-sm">
          Powered by <span className="text-white font-semibold">Divyansh Upadhyay</span>
        </p>
      </footer>
    </div>
  );
}