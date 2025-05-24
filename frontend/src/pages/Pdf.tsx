// PDFReport.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },

  // Header styles
  header: {
    backgroundColor: '#1e3a8a',
    padding: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#e2e8f0',
  },

  // Content container
  content: {
    paddingHorizontal: 30,
    paddingBottom: 60,
  },

  // Report title
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 20,
    textAlign: 'center',
    paddingBottom: 10,
    borderBottom: '2 solid #e2e8f0',
  },

  // Date section
  dateSection: {
    backgroundColor: '#f8fafc',
    padding: 15,
    marginBottom: 25,
    borderRadius: 5,
    border: '1 solid #e2e8f0',
  },
  dateText: {
    fontSize: 11,
    color: '#475569',
    textAlign: 'center',
  },

  // Section styles
  section: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#ffffff',
    border: '1 solid #e2e8f0',
    borderRadius: 5,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 12,
    paddingBottom: 5,
    borderBottom: '1 solid #cbd5e1',
  },

  // Text styles
  text: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
    marginBottom: 8,
  },

  boldText: {
    fontWeight: 'bold',
    color: '#1f2937',
  },

  // Narrative section
  narrativeSection: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    marginBottom: 25,
    border: '1 solid #0ea5e9',
    borderRadius: 5,
  },

  narrativeText: {
    fontSize: 11,
    color: '#0f172a',
    lineHeight: 1.5,
    textAlign: 'justify',
  },

  // Aliases section
  aliasItem: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 4,
    paddingLeft: 10,
  },

  noAliasText: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
  },

  // Image section
  imageSection: {
    backgroundColor: '#fefefe',
    padding: 15,
    marginBottom: 20,
    border: '2 solid #e5e7eb',
    borderRadius: 8,
  },

  imageTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 15,
    backgroundColor: '#ecfdf5',
    padding: 8,
    borderRadius: 4,
    textAlign: 'center',
  },

  // Feature and match items
  listItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 3,
    paddingLeft: 15,
    lineHeight: 1.3,
  },

  matchItem: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 4,
    paddingLeft: 15,
    lineHeight: 1.4,
  },

  // Privacy risk section
  privacyRiskSection: {
    backgroundColor: '#fef2f2',
    padding: 10,
    marginTop: 10,
    border: '1 solid #fca5a5',
    borderRadius: 4,
  },

  privacyRiskTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },

  privacyRiskItem: {
    fontSize: 10,
    color: '#7f1d1d',
    marginBottom: 3,
    paddingLeft: 10,
  },

  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8fafc',
    padding: 15,
    borderTop: '2 solid #e2e8f0',
  },

  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 8,
    color: '#64748b',
  },

  footerBold: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
  },

  supportEmail: {
    fontSize: 8,
    color: '#1e3a8a',
  },
});

const PDFReport = ({ data }: { data: any }) => {
  const currentDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PastScanner</Text>
          <Text style={styles.headerSubtitle}>Advanced Digital Forensics & Privacy Analysis</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Report Title */}
          <Text style={styles.reportTitle}>Past Scanner Analysis Report</Text>

          {/* Date Section */}
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>Report Generated: {currentDate}</Text>
          </View>

          {/* Narrative Report Section */}
          <View style={styles.narrativeSection}>
            <Text style={styles.sectionTitle}>Executive Summary</Text>
            <Text style={styles.narrativeText}>{data.narrativeReport}</Text>
          </View>

          {/* Aliases Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Associated Aliases</Text>
            {data.aliases.length === 0 ? (
              <Text style={styles.noAliasText}>No aliases were identified during the analysis</Text>
            ) : (
              data.aliases.map((alias: string, index: number) => (
                <Text key={index} style={styles.aliasItem}>• {alias}</Text>
              ))
            )}
          </View>

          {/* Images Analysis */}
          {data.images.map((img: any, i: number) => (
            <View key={i} style={styles.imageSection}>
              <Text style={styles.imageTitle}>📷 Image Analysis: {img.filename}</Text>

              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>Detected Features</Text>
                {img.detectedFeatures.map((feature: string, index: number) => (
                  <Text key={index} style={styles.listItem}>▪ {feature}</Text>
                ))}
              </View>

              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>Reverse Image Search Results</Text>
                {img.reverseImageSearchMatches.length === 0 ? (
                  <Text style={styles.noAliasText}>No matching images found in our database</Text>
                ) : (
                  img.reverseImageSearchMatches.map((match: any, index: number) => (
                    <Text key={index} style={styles.matchItem}>
                      🔗 {match.url} (Confidence: {match.matchConfidence}){'\n'}
                      📝 {match.description}
                    </Text>
                  ))
                )}
              </View>

              <View style={styles.privacyRiskSection}>
                <Text style={styles.privacyRiskTitle}>🔒 Privacy Risk Assessment</Text>
                <Text style={styles.privacyRiskItem}>
                  Traceability Level: {img.privacyRisk.traceabilityRisk}
                </Text>
                <Text style={styles.privacyRiskItem}>
                  Analysis Notes: {img.privacyRisk.notes}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View>
              <Text style={styles.footerBold}>PastScanner © 2024-2025</Text>
              <Text style={styles.footerText}>All rights reserved. Confidential & Proprietary.</Text>
            </View>
            <View>
              <Text style={styles.footerText}>Support & Inquiries:</Text>
              <Text style={styles.supportEmail}>info.violamed@gmail.com</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReport;