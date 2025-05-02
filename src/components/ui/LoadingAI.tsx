
import { cn } from "@/lib/utils";

interface LoadingAIProps {
  text?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingAI = ({ 
  text = "SafeSage AI is analyzing...", 
  size = "medium",
  className 
}: LoadingAIProps) => {
  const sizes = {
    small: {
      container: "text-center",
      spinner: "w-8 h-8 mb-2",
      title: "text-base font-medium text-slate-800 mb-1",
      description: "text-xs text-slate-500 max-w-xs",
      dots: "h-1.5 w-1.5"
    },
    medium: {
      container: "text-center",
      spinner: "w-12 h-12 mb-4",
      title: "text-xl font-medium text-slate-800 mb-2",
      description: "text-sm text-slate-500 max-w-sm",
      dots: "h-2 w-2"
    },
    large: {
      container: "text-center",
      spinner: "w-16 h-16 mb-4",
      title: "text-2xl font-medium text-slate-800 mb-2",
      description: "text-base text-slate-500 max-w-md",
      dots: "h-2.5 w-2.5"
    }
  };

  const currentSize = sizes[size];

  return (
    <div className={cn("flex flex-col items-center justify-center", currentSize.container, className)}>
      <div className={cn("relative mb-4", currentSize.spinner)}>
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-sage-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <h3 className={currentSize.title}>{text}</h3>
      <p className={currentSize.description}>
        We're analyzing token data and generating insights using AI. This may take a moment.
      </p>
      
      <div className="mt-8 flex items-center gap-2">
        <div className={cn(
          "rounded-full bg-sage-500",
          currentSize.dots,
          "animate-[pulse_1s_ease-in-out_infinite]"
        )}></div>
        <div className={cn(
          "rounded-full bg-sage-500",
          currentSize.dots,
          "animate-[pulse_1s_ease-in-out_0.2s_infinite]"
        )}></div>
        <div className={cn(
          "rounded-full bg-sage-500",
          currentSize.dots,
          "animate-[pulse_1s_ease-in-out_0.4s_infinite]"
        )}></div>
      </div>
    </div>
  );
};

export default LoadingAI;
