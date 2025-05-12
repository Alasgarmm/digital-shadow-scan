
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full border-b border-white/10 backdrop-blur-md bg-background/80 fixed top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Shield className="h-6 w-6 text-neon-purple" />
          <span className="hidden sm:inline">Past Scanner</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition">
            Home
          </Link>
          <Link to="/scan" className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition">
            Start Scan
          </Link>
          <Link to="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition">
            How It Works
          </Link>
          <Link to="#pricing" className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition">
            Pricing
          </Link>
          <Link to="#faq" className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition">
            FAQ
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/scan">
            <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/20 hover:text-neon-purple">
              Start My Scan
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
