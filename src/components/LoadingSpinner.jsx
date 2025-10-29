const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-blue-600 dark:text-blue-400 text-lg font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
