'use client';

import { useState, Suspense } from 'react';
import LoginForm from '@/components/LoginForm';
import OTPForm from '@/components/OTPForm';
import { ThemeToggle } from '@/components/ThemeToggle';

function ThemeToggleWrapper() {
  return (
    <Suspense fallback={null}>
      <ThemeToggle />
    </Suspense>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (userEmail: string) => {
    setEmail(userEmail);
    setStep('otp');
  };

  const handleOTPSuccess = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-4 transition-colors duration-200">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggleWrapper />
      </div>

      <div className="w-full max-w-md">
        {step === 'email' ? (
          <LoginForm onSuccess={handleEmailSubmit} />
        ) : (
          <OTPForm email={email} onSuccess={handleOTPSuccess} onBack={() => setStep('email')} />
        )}
      </div>
    </div>
  );
}
