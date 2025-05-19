import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, ArrowLeft, FileDown, RefreshCw, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { searchPerson, SearchResult, exampleSearchResults } from "@/services/serpService";
import { generatePDF } from "@/services/pdfService";

const getRiskColor = (score: number) => {
  if (score < 30) return "text-success bg-success/20";
  if (score < 70) return "text-warning bg-warning/20";
  return "text-destructive bg-destructive/20";
};

const calculateRiskScore = (results: SearchResult[]): number => {
  const highRiskCount = results.filter(r => r.risk === "high").length;
  const mediumRiskCount = results.filter(r => r.risk === "medium").length;
  return Math.min(100, (highRiskCount * 30) + (mediumRiskCount * 15));
};

const ScanResult = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // In a real app, you would get the name from the location state or query params
        const name = "John Doe"; // Replace with actual name
        const results = await searchPerson(name);
        // setSearchResults(results);
        setSearchResults(exampleSearchResults);
        setRiskScore(calculateRiskScore(exampleSearchResults));
      } catch (error) {
        toast.error("Failed to fetch scan results");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleDownload = async () => {
    try {
      const name = "John Doe"; // Replace with actual name
      const pdfBlob = await generatePDF(name, searchResults, riskScore);

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `digital-shadow-scan-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded successfully");
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    }
  };

  const handleRescan = () => {
    setIsLoading(true);
    // Re-fetch results
    const fetchResults = async () => {
      try {
        const name = "John Doe"; // Replace with actual name
        const results = await searchPerson(name);
        setSearchResults(results);
        setRiskScore(calculateRiskScore(results));
      } catch (error) {
        toast.error("Failed to fetch scan results");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Scanning your digital footprint...</p>
        </div>
      </div>
    );
  }

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
                <div className={`text-3xl font-bold rounded-full h-14 w-14 flex items-center justify-center ${getRiskColor(riskScore)}`}>
                  {riskScore}
                </div>
              </div>
              <Progress value={riskScore} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low Risk</span>
                <span>Medium Risk</span>
                <span>High Risk</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Search Results */}
            <div>
              <h2 className="text-lg font-medium mb-3">Search Results</h2>
              <div className="space-y-3">
                {searchResults.map((result, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <LinkIcon className="h-4 w-4 text-muted-foreground mt-1 mr-3 shrink-0" />
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{result.snippet}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={
                                result.risk === "high" ? "border-destructive text-destructive" :
                                result.risk === "medium" ? "border-warning text-warning" :
                                "border-muted text-muted-foreground"
                              }
                            >
                              {result.risk === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {result.risk} risk
                            </Badge>
                            <span className="text-xs text-muted-foreground">{result.type}</span>
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
