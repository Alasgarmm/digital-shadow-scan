
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface NavbarProps {
  scrollToSection?: (id: string) => void;
}

const Navbar = ({ scrollToSection }: NavbarProps) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (scrollToSection) {
      scrollToSection(id);
    }
  };

  return (
    <header className="w-full border-b border-white/10 backdrop-blur-md bg-background/80 fixed top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Shield className="h-6 w-6 text-neon-purple" />
          <span className="hidden sm:inline">Vault Past</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition">
            Home
          </Link>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
          >
            How It Works
          </a>
          <a 
            href="#pricing" 
            className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition"
            onClick={(e) => handleNavClick(e, 'pricing')}
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition"
            onClick={(e) => handleNavClick(e, 'faq')}
          >
            FAQ
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium text-foreground/80 hover:text-neon-purple transition"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Contact
          </a>
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
