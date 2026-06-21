'use client';

import { useState, useRef } from 'react';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';

interface ResumeUploadFormProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (data: any) => void;
  onAnalysisError: () => void;
  isLoading: boolean;
}

const SUPPORTED_EXTENSIONS = ['.pdf', '.docx', '.txt', '.md', '.rtf'];

export default function ResumeUploadForm({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  isLoading,
}: ResumeUploadFormProps) {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileExtension = (filename: string) => {
    return '.' + filename.split('.').pop()?.toLowerCase();
  };

  const validateFile = (file: File) => {
    const ext = getFileExtension(file.name);
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
      setError(`Invalid file format. Supported formats: ${SUPPORTED_EXTENSIONS.join(', ')}`);
      return false;
    }

    const maxSizeInMB = 10;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setResume(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');

    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setResume(file);
    }
  };

  const handleAnalyze = async () => {
    setError('');

    if (!resume) { setError('Please upload a resume'); return; }
    if (!jobDescription.trim()) { setError('Please enter a job description'); return; }

    onAnalysisStart();
    
    let analysisData: any = null;
    let isSuccess = false;

    // Timeout safety configuration (30 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      // 1. Fetch Token Request
      const first_response = await fetch(`${backendUrl}/api/getTokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({}),
        signal: controller.signal,
      });

      if (!first_response.ok) {
        const errBody = await first_response.json().catch(() => null);
        if (first_response.status === 401) throw new Error("Please log in to continue");
        if (first_response.status === 403) throw new Error("Token limit exceeded");
        throw new Error(errBody?.error || `Token validation failed (${first_response.status})`);
      }

      // 2. Analyze Resume Request
      const apiUrl = process.env.NEXT_PUBLIC_API_AI_URL;
      const formData = new FormData();
      formData.append('file', resume);           
      formData.append('job_description', jobDescription);

      const response = await fetch(`${apiUrl}/api/v1/analyzeResume`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => null);
        throw new Error(errBody?.detail || errBody?.error || `Analysis failed (HTTP ${response.status})`);
      }

      analysisData = await response.json();
      isSuccess = true;
    } catch (err: any) {
      console.error('Full error details:', err);
      
      if (err.name === 'AbortError') {
        setError('Request timed out. The server took too long to respond.');
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected network error occurred');
      }
      
      onAnalysisError(); 
    } finally {
      clearTimeout(timeoutId); // Prevent memory leaks
    }

    // 3. Keep state completion logic strictly outside the try/catch block
    if (isSuccess && analysisData) {
      onAnalysisComplete(analysisData);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analyze Your Resume</h2>

      {/* Resume Upload Box */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Resume *</label>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer bg-white dark:bg-slate-900"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {resume ? (
              <span className="text-green-600 dark:text-green-400">✓ {resume.name}</span>
            ) : (
              <>
                Drag and drop your resume or <span className="text-blue-600 dark:text-blue-400">click to browse</span>
              </>
            )}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supported formats: {SUPPORTED_EXTENSIONS.join(', ')}
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_EXTENSIONS.join(',')}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Job Description Input */}
      <div className="space-y-2">
        <label htmlFor="jobDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Job Description *
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
            setError('');
          }}
          placeholder="Paste the job description here..."
          rows={6}
          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors resize-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
        />
      </div>

      {/* Error Output */}
      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Submission Button */}
      <button
        onClick={handleAnalyze}
        disabled={isLoading || !resume || !jobDescription.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors font-medium text-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Resume'
        )}
      </button>

      {/* Buffering Indicator */}
      {isLoading && (
        <div className="mt-6 p-6 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700">
          <div className="space-y-3">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Analyzing your resume...</p>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Parsing resume • Matching keywords • Evaluating formatting...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}