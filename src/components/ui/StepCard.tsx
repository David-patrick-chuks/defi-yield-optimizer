
import { ReactNode } from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
}

const StepCard = ({ number, title, description, icon }: StepCardProps) => {
  return (
    <div className="relative">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sage-500 flex items-center justify-center text-white font-semibold">
          {number}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
            <span>{title}</span>
            <span className="text-sage-500">{icon}</span>
          </h3>
        </div>
      </div>
      <div className="ml-14">
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
