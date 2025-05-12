
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GenerateStrategyPromptProps {
  onGenerate: () => void;
}

const GenerateStrategyPrompt = ({ onGenerate }: GenerateStrategyPromptProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
          <Bot size={32} className="text-white" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-semibold mb-2">Generate Yield Strategy</h2>
          <p className="text-slate-600 mb-6">
            Our AI agent will analyze your portfolio and current market conditions to recommend optimal yield strategies.
          </p>
          <Button 
            onClick={onGenerate} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Generate Strategy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateStrategyPrompt;
