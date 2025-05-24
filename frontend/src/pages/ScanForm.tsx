import React, { useState } from 'react';
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
import { useForm } from '../context/FormContext.tsx';

const SCAN_PRICE = 699;

const ScanForm = () => {
  const {  setFormData,formData } = useForm();

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

    // File size validation (optional - adjust as needed)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error(`Some files are too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB per file`);
      return;
    }

    console.log("Submitting form with data:", {
      name,
      email,
      aliases,
      files,
      consent,
    });

    setIsSubmitting(true);

    try {
      // Convert files to base64
      const convertFilesToBase64 = async (files: File[]): Promise<any[]> => {
        const promises = files.map((file, index) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              resolve({
                id: `file_${index}_${Date.now()}`, // Unique identifier
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                data: reader.result // This will be the base64 string
              });
            };

            reader.onerror = () => {
              reject(new Error(`Failed to read file: ${file.name}`));
            };

            reader.readAsDataURL(file); // Converts to base64 with data URL prefix
          });
        });

        return Promise.all(promises);
      };

      // Show loading message for file conversion
      toast.info("Processing files...");

      // Convert files to base64
      const filesData = await convertFilesToBase64(files);

      // Prepare form data for storage
      const formDataToStore = {
        name,
        email,
        aliases: aliases.split('\n').filter(alias => alias.trim() !== ''), // Split and filter empty lines
        consent,
        files: filesData,
        timestamp: new Date().toISOString(),
        scanPrice: SCAN_PRICE
      };

      // Store form data in localStorage before redirect
      try {
        localStorage.setItem('scanFormData', JSON.stringify(formDataToStore));
        console.log("Form data stored in localStorage:", formDataToStore);
      } catch (storageError) {
        console.error("Failed to store data in localStorage:", storageError);
        toast.error("Failed to save form data. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Insert into Supabase
      const { error: supabaseError } = await supabase.from('scan_requests').insert({
        name,
        email,
        aliases,
        amount: SCAN_PRICE,
      });

      if (supabaseError) {
        throw supabaseError;
      }

      // Set form data in context as well (for immediate use if needed)
      setFormData({
        name,
        email,
        aliases: aliases.split('\n').filter(alias => alias.trim() !== ''),
        consent,
        files,
      });

      console.log("Form data set in context:", formData);

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create payment session');
      }

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error('No session ID received from payment service');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      toast.info("Redirecting to payment...");

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }

    } catch (err) {
      console.error("Error in submission:", err);

      // Clear stored data if there was an error after storage
      localStorage.removeItem('scanFormData');

      // More specific error messages
      if (err instanceof Error) {
        if (err.message.includes('Failed to read file')) {
          toast.error("Error processing files. Please try with different images.");
        } else if (err.message.includes('payment')) {
          toast.error("Payment setup failed. Please try again.");
        } else if (err.message.includes('Stripe')) {
          toast.error("Payment service unavailable. Please try again later.");
        } else {
          toast.error(`Submission failed: ${err.message}`);
        }
      } else {
        toast.error("There was a problem with your submission. Please try again.");
      }

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
