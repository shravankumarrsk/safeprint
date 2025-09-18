import React, { useState } from "react";
import { fileAPI } from "../services/api";
import { Shield, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import FileViewer from "../components/access/FileViewer";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function AccessPage() {
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [printJob, setPrintJob] = useState(null);
  const [error, setError] = useState("");

  const handleAccessFile = async () => {
    if (!accessCode.trim()) {
      setError("Please enter an access code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const job = await fileAPI.accessFile(accessCode);
      setPrintJob(job);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to access file. Please check the code and try again.");
      console.error("Access error:", err);
    } finally {
        setLoading(false);
    }
  };

  const resetAccess = () => {
    setPrintJob(null);
    setAccessCode("");
    setError("");
  };

  if (printJob) {
    return <FileViewer printJob={printJob} onBack={resetAccess} />;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Access Print File
            </h1>
            <p className="text-xl text-gray-600">
              Enter the access code to view and print the file.
            </p>
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-xl border">
            <div className="space-y-6">
              <div>
                <Input
                  placeholder="Enter access code (e.g., ABC123XYZ)"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="text-lg text-center font-mono tracking-wider"
                  maxLength={10}
                />
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center space-x-2 text-red-600"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </div>

              <Button
                onClick={handleAccessFile}
                disabled={loading || !accessCode.trim()}
                className="w-full"
              >
                {loading ? "Accessing..." : "Access File"}
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}