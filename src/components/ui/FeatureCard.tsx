
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  highlight?: boolean;
}

export const FeatureCard = ({ icon, title, description, className, highlight = false }: FeatureCardProps) => {
  return (
    <div className={cn(
      "p-6 flex flex-col items-start rounded-lg shadow-sm transition-all duration-300",
      highlight 
        ? "bg-gradient-to-tr from-blue-50 to-white border-2 border-blue-300" 
        : "bg-white border border-slate-200",
      className
    )}>
      <div className={cn(
        "h-12 w-12 rounded-lg flex items-center justify-center text-white mb-5",
        highlight 
          ? "bg-gradient-to-tr from-blue-600 to-blue-400" 
          : "bg-gradient-to-tr from-blue-500 to-blue-400"
      )}>
        {icon}
      </div>
      <h3 className="text-lg font-medium text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
