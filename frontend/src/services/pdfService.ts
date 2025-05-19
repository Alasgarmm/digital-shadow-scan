import PDFDocument from "pdfkit/js/pdfkit.standalone";
import { SearchResult } from "./serpService";

export const generatePDF = async (
  name: string,
  searchResults: SearchResult[],
  riskScore: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const chunks: Uint8Array[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBlob = new Blob(chunks, { type: "application/pdf" });
      resolve(pdfBlob);
    });

    // Add content to PDF
    doc.fontSize(25).text("Digital Shadow Scan Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Scan for: ${name}`);
    doc.moveDown();
    doc.fontSize(14).text(`Risk Score: ${riskScore}`);
    doc.moveDown();

    // Add search results
    doc.fontSize(16).text("Search Results");
    doc.moveDown();

    searchResults.forEach((result, index) => {
      doc.fontSize(12).text(`${index + 1}. ${result.title}`);
      doc.fontSize(10).text(`URL: ${result.url}`);
      doc.fontSize(10).text(`Risk Level: ${result.risk.toUpperCase()}`);
      doc.fontSize(10).text(`Type: ${result.type}`);
      doc.fontSize(10).text(`Snippet: ${result.snippet}`);
      doc.moveDown();
    });

    doc.end();
  });
};