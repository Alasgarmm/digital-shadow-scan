
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: "One-Time Scan",
    price: "€49",
    description: "Perfect for a quick check of your digital footprint",
    features: [
      "1 complete scan",
      "Upload up to 3 photos",
      "Check multiple usernames",
      "Full report with recommendations",
      "30 days access to results"
    ],
    buttonText: "Start My Scan",
    buttonLink: "/scan",
    highlighted: false
  },
  {
    name: "Rescan Bundle",
    price: "€79",
    description: "For ongoing protection and tracking changes over time",
    features: [
      "3 complete scans",
      "Upload up to 5 photos per scan",
      "Check unlimited usernames",
      "Detailed comparison between scans",
      "90 days access to results",
      "Priority processing"
    ],
    buttonText: "Choose Bundle",
    buttonLink: "/scan",
    highlighted: true
  }
];

const PricingTable = () => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the scan option that suits your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 bg-card border ${plan.highlighted ? 'border-neon-purple animate-pulse-border' : 'border-border'} 
                        ${plan.highlighted ? 'shadow-lg shadow-neon-purple/20' : ''} relative`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-purple text-white text-sm font-medium py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-neon-green mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to={plan.buttonLink}>
                <Button 
                  className={`w-full ${plan.highlighted ? 'bg-neon-purple hover:bg-neon-purple/90' : 'bg-secondary hover:bg-secondary/90'}`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
