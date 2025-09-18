import React, { useState } from 'react';
import { fileAPI } from '../../services/api';
import { ArrowLeft, Printer, Trash2, Clock, Download, FileText } from 'lucide-react';
import { Button } from '../ui/Button';

export default function FileViewer({ printJob, onBack }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePrintComplete = async () => {
    const confirmed = window.confirm(
      "Are you sure you have finished printing? This will permanently delete the file."
    );
    if (confirmed) {
      setIsDeleting(true);
      try {
        await fileAPI.markAsPrinted(printJob.id);
        alert('File has been securely deleted.');
        onBack(); // Go back to the access page
      } catch (err) {
        alert('Failed to delete the file. Please try again.');
        console.error('Deletion error:', err);
        setIsDeleting(false);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold">{printJob.originalFilename}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div><p className="text-gray-500">File Size</p><p className="font-medium">{formatFileSize(printJob.fileSize)}</p></div>
            <div><p className="text-gray-500">File Type</p><p className="font-medium">{printJob.fileType}</p></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <a href__={printJob.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Printer className="w-5 h-5 mr-2" />
                    Open and Print
                </a>
              </Button>
              <Button onClick={handlePrintComplete} disabled={isDeleting} variant="destructive" className="flex-1">
                <Trash2 className="w-5 h-5 mr-2" />
                {isDeleting ? 'Deleting...' : 'Printing Complete (Delete File)'}
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}