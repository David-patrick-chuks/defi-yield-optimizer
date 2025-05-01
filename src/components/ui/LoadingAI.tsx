
import { CircleArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoadingAI = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-full border-t-4 border-sage-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <CircleArrowDown className="h-8 w-8 text-slate-400" />
        </div>
      </div>
      <h3 className="mt-6 text-lg font-medium text-slate-800">AI Processing</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-xs text-center">
        SafeSage AI is analyzing your portfolio and generating risk assessments.
        This may take a few moments...
      </p>
      <div className="mt-8 w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-slate-400 rounded-full animate-shimmer shimmer-effect" style={{ width: '70%' }}></div>
      </div>
    </div>
  );
};

export default LoadingAI;
