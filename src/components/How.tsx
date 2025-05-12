
import React from 'react';
import { Upload, Scan, FileText } from 'lucide-react';

const steps = [
  {
    title: 'Upload Your Data',
    description: 'Provide your name, usernames, and up to 3 photos for identification',
    icon: Upload
  },
  {
    title: 'AI Scan',
    description: 'Our advanced algorithms search across public databases and websites',
    icon: Scan
  },
  {
    title: 'Detailed Report',
    description: 'Receive a comprehensive risk analysis with recommendations',
    icon: FileText
  }
];

const How = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced scanning technology makes it easy to understand your digital exposure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="rounded-xl p-6 bg-card border border-border hover:border-neon-purple/50 
                        hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
            >
              <div className="bg-secondary/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <step.icon className="h-8 w-8 text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              <div className="mt-6 flex justify-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neon-purple/20 text-neon-purple font-bold">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How;
