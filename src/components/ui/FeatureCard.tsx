
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "ai-card p-6 flex flex-col items-start",
      className
    )}>
      <div className="h-12 w-12 rounded-lg bg-gradient-to-tr from-sage-500 to-sage-400 
                      flex items-center justify-center text-white mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
