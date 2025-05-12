
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import Navbar from '@/components/Navbar';
import How from '@/components/How';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import PricingTable from '@/components/PricingTable';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-neon-purple/10 px-4 py-2 rounded-full text-neon-purple">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Digital Privacy Protection</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Scan your digital past <br className="hidden md:inline" />
              <span className="text-gradient">before someone else does.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Discover if your face, username, or identity appears on adult or suspicious websites. 
              Take control of your digital footprint now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/scan">
                <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium px-8">
                  Start My Scan
                </Button>
              </Link>
              <Link to="#how-it-works">
                <Button variant="outline" size="lg" className="border-neon-purple/50 text-foreground hover:bg-neon-purple/10">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 max-w-4xl mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/40 to-neon-green/40 blur-3xl opacity-20 rounded-3xl"></div>
              <div className="relative bg-card border border-white/10 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Past Scanner Dashboard" 
                  className="w-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <div className="bg-card/80 backdrop-blur-md rounded-xl p-4 inline-flex items-center gap-3">
                    <div className="h-10 w-10 bg-neon-green/20 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-neon-green" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neon-green">Risk Assessment Complete</p>
                      <p className="text-sm font-medium">Your digital footprint is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <How />
      <Features />
      <Testimonials />
      <PricingTable />
      <FAQ />
      
      {/* Footer */}
      <footer className="mt-auto py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-neon-purple" />
              <span className="font-bold">Past Scanner</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Past Scanner. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
