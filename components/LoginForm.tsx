'use client';

import { useState } from 'react';
import { Mail, Loader2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onSuccess: (email: string) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/otp/sender`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      onSuccess(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-2xl p-8 space-y-6 transition-colors duration-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">ATS Optimizer</h1>
        <p className="text-slate-600 dark:text-slate-400">Optimize your resume for ATS systems</p>
      </div>

      {/* Google OAuth Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-slate-700 dark:text-slate-300"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          Send OTP
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
