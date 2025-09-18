import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Upload, Eye, Lock } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const createPageUrl = (page) => `/${page.toLowerCase()}`;
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SafePrint
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Secure Document Sharing</p>
              </div>
            </Link>
            
            <nav className="hidden sm:flex space-x-8">
              <Link
                to={createPageUrl("Upload")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(createPageUrl("Upload"))
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Upload className="w-4 h-4" />
                <span className="font-medium">Upload</span>
              </Link>
              
              <Link
                to={createPageUrl("Access")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(createPageUrl("Access"))
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium">Access File</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative">
        {children}
      </main>

      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Documents are encrypted and auto-deleted
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Built with privacy and security in mind
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}