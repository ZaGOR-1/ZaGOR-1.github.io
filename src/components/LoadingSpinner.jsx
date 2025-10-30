import { memo } from 'react';

const LoadingSpinner = memo(() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 
                    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-400 via-blue-500 to-purple-600 
                        animate-spin-slow blur-sm"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent 
                        border-t-purple-600 border-r-blue-600 animate-spin"></div>
          <div className="absolute inset-2 w-16 h-16 rounded-full bg-white dark:bg-slate-900 
                        flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 gradient-text text-xl font-bold animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
