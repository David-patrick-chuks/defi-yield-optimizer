
import { cn } from "@/lib/utils";

interface LoadingAIProps {
  text?: string;
}

const LoadingAI = ({ text = "SafeSage AI is analyzing..." }: LoadingAIProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-sage-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <h3 className="text-xl font-medium text-slate-800 mb-2">{text}</h3>
      <p className="text-slate-500 max-w-sm">
        We're analyzing token data and generating insights using AI. This may take a moment.
      </p>
      
      <div className="mt-8 flex items-center gap-2">
        <div className={cn(
          "h-2 w-2 rounded-full bg-sage-500",
          "animate-[pulse_1s_ease-in-out_infinite]"
        )}></div>
        <div className={cn(
          "h-2 w-2 rounded-full bg-sage-500",
          "animate-[pulse_1s_ease-in-out_0.2s_infinite]"
        )}></div>
        <div className={cn(
          "h-2 w-2 rounded-full bg-sage-500",
          "animate-[pulse_1s_ease-in-out_0.4s_infinite]"
        )}></div>
      </div>
    </div>
  );
};

export default LoadingAI;
