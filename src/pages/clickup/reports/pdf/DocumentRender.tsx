import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

interface MyDocumentProps {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  
}

const DocumentRender: React.FC<MyDocumentProps> = ({ title, author, subject, keywords}) => (
  <Document title={title} author={author} subject={subject} keywords={keywords}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>hello nicee to meet you </Text>
      </View>
    </Page>
  </Document>
);

export default DocumentRender;
