'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

interface OTPFormProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function OTPForm({ email, onSuccess, onBack }: OTPFormProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp) {
      setError('OTP is required');
      return;
    }

    if (otp.length < 6) {
      setError('OTP must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      const response = await fetch(`${apiUrl}/api/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();

      if (data === true || data.success === true) {
        // Wait a moment to ensure cookie is set before redirecting
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-2xl p-8 space-y-6 transition-colors duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Verify OTP</h1>
        <p className="text-slate-600 dark:text-slate-400">
          We&apos;ve sent a code to <span className="font-medium text-slate-900 dark:text-white">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerifyOTP} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            One-Time Password
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError('');
            }}
            placeholder="Enter 6-digit OTP"
            maxLength={10}
            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-center text-2xl tracking-widest placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !otp}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          Verify OTP
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Didn&apos;t receive the code?{' '}
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Resend</button>
      </p>
    </div>
  );
}
