'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  
  const { theme, toggleTheme } = context;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-all duration-200 ${
          theme === 'light'
            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
        }`}
        title="Toggle light mode"
        aria-label="Light mode"
      >
        <Sun className="w-5 h-5" />
      </button>

      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-700 text-blue-300 hover:bg-slate-600'
            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
        }`}
        title="Toggle dark mode"
        aria-label="Dark mode"
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  );
}
