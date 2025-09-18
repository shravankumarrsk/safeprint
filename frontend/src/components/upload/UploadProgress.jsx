import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image } from 'lucide-react';
import { Button } from '../ui/Button';

export default function FileDropzone({ onDrop }) {
  const onDropCallback = useCallback(onDrop, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-12 text-center border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer ${
        isDragActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <input {...getInputProps()} />
      <div className="mb-6">
        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
        }`}>
          <Upload className="w-10 h-10" />
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isDragActive ? 'Drop file here' : 'Upload your document'}
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Drag and drop your file here, or click to browse. We support PDF, JPG, and PNG.
        </p>
      </div>
      <Button type="button">Browse Files</Button>
    </div>
  );
}