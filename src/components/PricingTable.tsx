
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

// B2C: Individual pricing tiers
const b2cPricingPlans = [
  {
    name: "Pay-Per-Scan",
    price: "$7",
    description: "Perfect for a quick check of your digital footprint",
    features: [
      "1 complete scan",
      "Full profile match + links",
      "Username verification",
      "Risk assessment",
      "PDF report"
    ],
    addon: "Optional add-on: facial scan match ($5 extra)",
    buttonText: "Start My Scan",
    buttonLink: "/scan",
    highlighted: false
  },
  {
    name: "Personal Basic",
    price: "$19",
    period: "/mo",
    description: "For ongoing protection and tracking changes over time",
    features: [
      "15 scans per month",
      "User match confidence rating",
      "Username + alias scanning",
      "Monthly activity report",
      "Email support"
    ],
    buttonText: "Choose Plan",
    buttonLink: "/scan",
    highlighted: true
  },
  {
    name: "Personal Pro",
    price: "$49",
    period: "/mo",
    description: "For professionals and power users who need comprehensive monitoring",
    features: [
      "60 scans per month",
      "Auto alerts for digital footprint changes",
      "Reverse image scanning",
      "Export reports (PDF)",
      "Priority support"
    ],
    buttonText: "Go Pro",
    buttonLink: "/scan",
    highlighted: false
  }
];

// B2B: Professional pricing tiers
const b2bPricingPlans = [
  {
    name: "Startup",
    price: "$199",
    period: "/mo",
    description: "For small teams and growing businesses",
    features: [
      "500 scans",
      "Team access (up to 3 users)",
      "Dashboard + usage analytics",
      "Email support",
      "Bulk upload"
    ],
    buttonText: "Contact Sales",
    buttonLink: "#contact",
    highlighted: false
  },
  {
    name: "Growth",
    price: "$499",
    period: "/mo",
    description: "For established businesses with advanced needs",
    features: [
      "2,000 scans",
      "API access",
      "Team management",
      "Scan scheduling automation",
      "Priority support"
    ],
    buttonText: "Contact Sales",
    buttonLink: "#contact",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific requirements",
    features: [
      "Unlimited scans",
      "Full API + white-label dashboard",
      "SOC2 compliance support",
      "Dedicated account manager",
      "Custom integrations"
    ],
    buttonText: "Contact Sales",
    buttonLink: "#contact",
    highlighted: false
  }
];

const PricingTable = () => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that suits your needs
          </p>
        </div>
        
        <Tabs defaultValue="individual" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="individual" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {b2cPricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-8 bg-card border ${plan.highlighted ? 'border-neon-purple animate-pulse-border' : 'border-border'} 
                            ${plan.highlighted ? 'shadow-lg shadow-neon-purple/20' : ''} relative h-full flex flex-col`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-purple text-white text-sm font-medium py-1 px-4 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6 flex items-end">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-neon-green mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.addon && (
                      <li className="mt-2 pt-2 border-t border-border">
                        <Badge variant="outline" className="text-neon-purple border-neon-purple/30 bg-neon-purple/5">
                          {plan.addon}
                        </Badge>
                      </li>
                    )}
                  </ul>
                  <Link to={plan.buttonLink} className="mt-auto">
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-neon-purple hover:bg-neon-purple/90' : 'bg-secondary hover:bg-secondary/90'}`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="business" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {b2bPricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-8 bg-card border ${plan.highlighted ? 'border-neon-purple animate-pulse-border' : 'border-border'} 
                            ${plan.highlighted ? 'shadow-lg shadow-neon-purple/20' : ''} relative h-full flex flex-col`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-purple text-white text-sm font-medium py-1 px-4 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6 flex items-end">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-neon-green mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.buttonLink} className="mt-auto">
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-neon-purple hover:bg-neon-purple/90' : 'bg-secondary hover:bg-secondary/90'}`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your organization?
          </p>
          <Link to="#contact">
            <Button variant="outline" className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10">
              Contact our sales team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
