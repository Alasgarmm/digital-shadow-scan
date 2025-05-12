
import React from 'react';
import { BarChart3, Lock, AlertTriangle, FileCheck } from 'lucide-react';

const features = [
  {
    title: 'Risk Score Assessment',
    description: 'Get a clear numerical score that measures your digital exposure risk',
    icon: BarChart3
  },
  {
    title: 'Exposure Summary',
    description: 'AI-generated assessment of where and how your data appears online',
    icon: FileCheck
  },
  {
    title: 'Direct Exposure Links',
    description: 'View actual links where your information has been found',
    icon: AlertTriangle
  },
  {
    title: 'Removal Recommendations',
    description: 'Tailored advice on how to remove or minimize your digital footprint',
    icon: Lock
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Protection Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our scanning tools help you understand and minimize your digital footprint
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl p-6 bg-card border border-border hover:border-neon-purple/50 
                      hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
            >
              <div className="bg-neon-purple/10 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
