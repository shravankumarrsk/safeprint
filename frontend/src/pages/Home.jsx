import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Eye, Shield, Lock, Clock, Trash2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl transform hover:scale-110 transition-transform duration-300">
            <Shield className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Secure Document Sharing, Simplified.
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            The safest way to share documents for printing. Your files are encrypted, 
            accessible only with a unique one-time code, and automatically deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Upload className="w-5 h-5 mr-3" />
              Upload a Document
            </Link>
            
            <Link
              to="/access"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Eye className="w-5 h-5 mr-3" />
              Access a File
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Why SafePrint?</h2>
            <p className="text-lg text-gray-500 mt-2">Privacy is not an option. It's a guarantee.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">One-Time Access Codes</h3>
            <p className="text-gray-600 leading-relaxed">
              Each upload generates a unique, single-use code. Once used or expired, it's gone forever.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">24-Hour Expiry</h3>
            <p className="text-gray-600 leading-relaxed">
              Files are only available for 24 hours. No forgotten documents left on a server.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatic Deletion</h3>
            <p className="text-gray-600 leading-relaxed">
              After printing is marked complete, the file is instantly and permanently deleted from our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}