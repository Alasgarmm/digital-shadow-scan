
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Is this legal?",
    answer: "Vault Past uses advanced AI and proprietary scanning logic to analyze billions of data points across images, profiles, and online mentions — including places you'd never think to check. Our system finds connections that typical search engines miss, giving you a clear, expert-level view of your digital exposure."
  },
  {
    question: "Do you store my data?",
    answer: "We temporarily store your provided information to perform the scan. Photos and personal data are encrypted and automatically deleted 30 days after your scan (90 days for bundle customers). We never share your data with third parties."
  },
  {
    question: "How accurate are the results?",
    answer: "Our scan is highly accurate but not perfect. We use advanced AI and image recognition to find matches, but some results may be false positives or we may miss some instances. We recommend reviewing the detailed report carefully."
  },
  {
    question: "How long does a scan take?",
    answer: "A typical scan is completed within 24-48 hours. The exact time depends on the complexity of your scan (number of photos, usernames, etc.) and current processing load."
  },
  {
    question: "What if I find my content on inappropriate sites?",
    answer: "Your report includes removal recommendations for each identified site. Many platforms have content removal processes for unauthorized use of your likeness or identity. For more complex cases, we provide guidance on legal options."
  },
  {
    question: "Can I use this to scan someone else?",
    answer: "No. Vault Past is designed for personal use only. Scanning others without their explicit consent may be illegal in many jurisdictions and violates our Terms of Service."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Common questions about our digital footprint scanning service
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-medium py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
