import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingState({ 
  message = 'Loading...', 
  size = 'md',
  className = ''
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span className="text-white/70">{message}</span>
    </div>
  );
}

interface FullScreenLoadingProps {
  message?: string;
}

export function FullScreenLoading({ message = 'Loading articles...' }: FullScreenLoadingProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoadingState message={message} size="lg" />
    </div>
  );
}
