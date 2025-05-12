
import React from 'react';
import { FeatureCard } from '@/components/ui/FeatureCard';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

interface FeatureSectionProps {
  features: Feature[];
}

const FeatureSection = ({ features }: FeatureSectionProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-6">Key Features</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            highlight={feature.highlight}
            className={feature.highlight ? "border-blue-300" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
