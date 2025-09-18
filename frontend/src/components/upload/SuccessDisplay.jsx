import React, { useState } from 'react';
import { CheckCircle, Copy, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export default function SuccessDisplay({ upload, onReset }) {
  const [copied, setCopied] = useState(false);

  const copyAccessCode = () => {
    navigator.clipboard.writeText(upload.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Successful!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
            Your document is secure. Share the access code below with your print shop.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-xl border mb-8">
            <p className="text-sm text-gray-500 mb-2">Your One-Time Access Code</p>
            <p className="text-5xl font-mono font-bold text-gray-900 tracking-wider mb-6">
                {upload.accessCode}
            </p>
            <Button onClick={copyAccessCode} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Code'}
            </Button>
        </div>

        <Button onClick={onReset} variant="ghost">
            <RotateCcw className="w-4 h-4 mr-2" />
            Upload Another File
        </Button>
    </div>
  );
}