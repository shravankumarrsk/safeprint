import React, { useState, useCallback } from "react";
import { fileAPI } from "../services/api";
import { Upload as UploadIcon, FileText, Image, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import FileDropzone from "../components/upload/FileDropzone";
import UploadProgress from "../components/upload/UploadProgress";
import SuccessDisplay from "../components/upload/SuccessDisplay";
import { Button } from "../components/ui/Button";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [completedUpload, setCompletedUpload] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.size > 20971520) { // 20MB
      setError('File is too large. Max size is 20MB.');
      setFile(null);
      return;
    }
    setError('');
    setFile(selectedFile);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleFileSelect(acceptedFiles[0]);
    }
  }, []);

  const removeFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fileAPI.uploadFile(formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      setCompletedUpload(response);
    } catch (err) {
      setError(err.response?.data?.msg || 'Upload failed. Please try again.');
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setCompletedUpload(null);
    setError('');
  };

  if (completedUpload) {
    return <SuccessDisplay upload={completedUpload} onReset={resetUpload} />;
  }
  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Upload Your Document
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share a file securely. It will be deleted after printing.
            </p>
        </div>
        
        <AnimatePresence mode="wait">
          {!uploading ? (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FileDropzone onDrop={onDrop} />

              {file && (
                <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Selected File</h3>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {file.type === "application/pdf" ? (
                        <FileText className="w-8 h-8 text-red-500" />
                      ) : (
                        <Image className="w-8 h-8 text-blue-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={removeFile} className="text-gray-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  
                  <Button
                    onClick={handleUpload}
                    className="w-full mt-6"
                    disabled={!file}
                  >
                    <UploadIcon className="w-5 h-5 mr-2" />
                    Upload File
                  </Button>
                </div>
              )}

              {error && (
                <div className="mt-4 text-center text-red-600 font-medium">
                  {error}
                </div>
              )}
            </motion.div>
          ) : (
            <UploadProgress file={file} progress={uploadProgress} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}