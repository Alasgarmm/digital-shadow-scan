import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import FileUpload from '@/components/FileUpload';
import { toast } from "@/components/ui/sonner";
import { stripePromise } from "@/integrations/stripe/client";
import { supabase } from '../integrations/supabase/client.ts';

const SCAN_PRICE = 699; // $6.99 in cents

const ScanForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [aliases, setAliases] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !aliases || files.length === 0 || !consent) {
      toast.error("Please fill in all fields and provide at least one image");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
        const {error: supabaseError} = await supabase.from('scan_requests').insert({
        name,
        email,
        aliases,
        amount: SCAN_PRICE,
      });

      if (supabaseError) {
        throw supabaseError;
      }

      // Create a payment session
      const response = await fetch('http://localhost:3001/api/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          aliases,
          amount: SCAN_PRICE,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }

    } catch (err) {
      console.error("Error in submission:", err);
      toast.error("There was a problem with your submission");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header */}
      <header className="w-full border-b border-white/10 backdrop-blur-md bg-background/80">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Shield className="h-6 w-6 text-neon-purple" />
            <span>Vault Past</span>
          </Link>
        </div>
      </header>

      <div className="container max-w-3xl mx-auto px-4 py-16">
        <Link to="/" className="flex items-center text-sm text-muted-foreground mb-8 hover:text-neon-purple transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Start Your Digital Scan</h1>
          <p className="text-muted-foreground">
            Provide the information below to scan your digital footprint across the web.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="aliases">Usernames/Aliases</Label>
                <Textarea
                  id="aliases"
                  placeholder="Enter usernames or aliases, one per line"
                  value={aliases}
                  onChange={(e) => setAliases(e.target.value)}
                  required
                  className="mt-1 min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  List all online usernames, nicknames, or aliases that you've used
                </p>
              </div>

              <div>
                <Label className="mb-2 block">Upload Photos</Label>
                <FileUpload
                  onChange={(files) => setFiles(files)}
                  maxFiles={3}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  required
                />
                <Label htmlFor="consent" className="text-sm">
                  I consent to a digital scan of publicly available data using my inputs
                </Label>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-neon-purple hover:bg-neon-purple/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Start My Scan'
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By clicking "Start My Scan", you agree to our
                <Link to="#" className="text-neon-purple mx-1">Terms of Service</Link>
                and
                <Link to="#" className="text-neon-purple mx-1">Privacy Policy</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="bg-secondary/20 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-neon-purple mr-3 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Your data is secure</p>
              <p className="text-muted-foreground">
                We encrypt all uploads and automatically delete your data after 30 days.
                We never share your personal information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanForm;
