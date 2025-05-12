
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, ArrowLeft, FileDown, RefreshCw, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

// Mock data for the scan results
const mockResult = {
  riskScore: 65,
  summary: "Our analysis identified several potential privacy concerns. Your photos were found on 3 adult-oriented websites and 2 data aggregation platforms. Your username appears on numerous forums and social media platforms, some with questionable content. We recommend taking action to remove unauthorized uses of your likeness.",
  matchedUrls: [
    { url: "example-adult-site.com/profiles/user123", risk: "high", type: "Adult Content" },
    { url: "data-scraper.com/person/johndoe", risk: "medium", type: "Data Aggregator" },
    { url: "suspicious-forum.net/threads/87654", risk: "medium", type: "Forum Post" },
    { url: "image-host.com/gallery/user456", risk: "low", type: "Image Hosting" },
    { url: "social-network.com/user789", risk: "low", type: "Social Media" }
  ]
};

const getRiskColor = (score: number) => {
  if (score < 30) return "text-success bg-success/20";
  if (score < 70) return "text-warning bg-warning/20";
  return "text-destructive bg-destructive/20";
};

const ScanResult = () => {
  const handleDownload = () => {
    toast.success("Downloading your report...");
    // In a real app, this would trigger a download of a generated PDF
  };

  const handleRescan = () => {
    toast.success("Rescan requested. You will be notified when complete.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header */}
      <header className="w-full border-b border-white/10 backdrop-blur-md bg-background/80">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Shield className="h-6 w-6 text-neon-purple" />
            <span>Past Scanner</span>
          </Link>
        </div>
      </header>
      
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="flex items-center text-sm text-muted-foreground mb-8 hover:text-neon-purple transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>
        
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-neon-purple/5 p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-neon-purple mr-2" />
                <h1 className="text-xl font-bold">Your Report is Ready</h1>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Scan completed on {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
                onClick={handleDownload}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRescan}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Rescan
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Risk Score */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Risk Score</h2>
                <div className={`text-3xl font-bold rounded-full h-14 w-14 flex items-center justify-center ${getRiskColor(mockResult.riskScore)}`}>
                  {mockResult.riskScore}
                </div>
              </div>
              <Progress value={mockResult.riskScore} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low Risk</span>
                <span>Medium Risk</span>
                <span>High Risk</span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* AI Summary */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-3">AI Summary</h2>
              <div className="bg-secondary/20 rounded-lg p-4">
                <p>{mockResult.summary}</p>
              </div>
            </div>
            
            {/* Matched URLs */}
            <div>
              <h2 className="text-lg font-medium mb-3">Top Matched URLs</h2>
              <div className="space-y-3">
                {mockResult.matchedUrls.map((match, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <LinkIcon className="h-4 w-4 text-muted-foreground mt-1 mr-3 shrink-0" />
                        <div>
                          <p className="font-medium">{match.url}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={
                                match.risk === "high" ? "border-destructive text-destructive" :
                                match.risk === "medium" ? "border-warning text-warning" :
                                "border-muted text-muted-foreground"
                              }
                            >
                              {match.risk === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {match.risk} risk
                            </Badge>
                            <span className="text-xs text-muted-foreground">{match.type}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-neon-purple hover:bg-neon-purple/10 shrink-0">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 p-4 border border-neon-purple/30 bg-neon-purple/5 rounded-lg">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-neon-purple mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Recommendations</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your scan results, we recommend taking action to remove your unauthorized content.
                    For high-risk items, consider using our removal templates or seeking legal advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to keep monitoring your digital footprint?
          </p>
          <Link to="/">
            <Button className="bg-neon-purple hover:bg-neon-purple/90">
              Get the Rescan Bundle
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;
