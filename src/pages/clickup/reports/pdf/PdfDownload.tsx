import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Document from './DocumentRender';

interface DownloadPdfProps {
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

const PdfDownload: React.FC<DownloadPdfProps> = ({ title, author, subject, keywords}) => (
  <div>
    <PDFDownloadLink className='text-dark font-weight-bold' document={<Document title={title} author={author} subject={subject} keywords={keywords}  />} fileName="Report.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download in PDF'
      }
    </PDFDownloadLink>
  </div>
);

export default PdfDownload;
