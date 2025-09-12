import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';

interface ErrorStateProps {
  error?: Error;
  onRetry?: () => void;
  message?: string;
  className?: string;
}

export function ErrorState({ 
  error, 
  onRetry, 
  message = 'Something went wrong',
  className = ''
}: ErrorStateProps) {
  const isNetworkError = error?.message?.includes('fetch') || error?.message?.includes('network');
  const isTimeoutError = error?.message?.includes('timeout');

  const getErrorMessage = () => {
    if (isNetworkError) {
      return 'Network connection failed. Please check your internet connection.';
    }
    if (isTimeoutError) {
      return 'Request timed out. Please try again.';
    }
    if (error?.message) {
      return error.message;
    }
    return message;
  };

  const getErrorIcon = () => {
    if (isNetworkError) {
      return <WifiOff className="w-8 h-8 text-red-500" />;
    }
    return <AlertTriangle className="w-8 h-8 text-red-500" />;
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {getErrorIcon()}
      <h3 className="text-lg font-semibold text-white mt-4 mb-2">Error</h3>
      <p className="text-gray-300 mb-6 max-w-md">
        {getErrorMessage()}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}

interface FullScreenErrorProps {
  error?: Error;
  onRetry?: () => void;
  message?: string;
}

export function FullScreenError({ error, onRetry, message }: FullScreenErrorProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <ErrorState error={error} onRetry={onRetry} message={message} />
    </div>
  );
}
