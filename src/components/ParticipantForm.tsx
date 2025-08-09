import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Hash, Download, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';

interface ParticipantFormProps {
  onBack: () => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: ''
  });
  const [qrCode, setQrCode] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateQRCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.registrationNumber) return;

    setLoading(true);
    try {
      const qrData = JSON.stringify({
        registrationNumber: formData.registrationNumber,
        name: formData.name,
        event: 'Inferno Verse 2025',
        timestamp: new Date().toISOString()
      });

      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#00FFFF',
          light: '#0F172A'
        }
      });

      setQrCode(qrCodeDataUrl);
      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `inferno-verse-${formData.registrationNumber}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text">
            Participant Registration
          </h1>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!isGenerated ? (
            <motion.div
              className="bg-slate-800/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl mb-6 mx-auto">
                <User className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-xl font-bold text-cyan-400 text-center mb-6">
                Enter Your Details
              </h2>

              <form onSubmit={generateQRCode} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Registration Number
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="Enter registration number"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  {loading ? 'Generating...' : 'Generate QR Code'}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="bg-slate-800/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl mb-6 mx-auto"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-green-400 mb-2">
                QR Code Generated!
              </h2>
              <p className="text-gray-400 mb-6">
                Here is your attendance QR code for <strong>{formData.name}</strong>
              </p>

              <motion.div
                className="bg-white p-6 rounded-2xl mb-6 inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.3 }}
              >
                <img src={qrCode} alt="Attendance QR Code" className="w-64 h-64 mx-auto" />
              </motion.div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-cyan-400 font-semibold mb-3">Details:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Registration:</span>
                    <span className="text-white">{formData.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Event:</span>
                    <span className="text-white">Inferno Verse 2025</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={downloadQRCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Download QR Code</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    setIsGenerated(false);
                    setQrCode('');
                    setFormData({ name: '', registrationNumber: '' });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Generate Another</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantForm;