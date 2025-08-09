import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, SwitchCamera, CheckCircle, AlertCircle, Scan, User } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeScannerState } from 'html5-qrcode';
import { useAuth } from '../contexts/AuthContext';
import { markAttendance, AttendanceRecord, testConnection } from '../lib/supabase';

interface VolunteerScannerProps {
  onBack: () => void;
}

const VolunteerScanner: React.FC<VolunteerScannerProps> = ({ onBack }) => {
  const { currentUser } = useAuth();
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [scannedData, setScannedData] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkConnection();
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const checkConnection = async () => {
    try {
      const isConnected = await testConnection();
      setConnectionStatus(isConnected ? 'connected' : 'error');
      if (!isConnected) {
        setMessage({
          type: 'error',
          text: 'Database connection failed. Please check your Supabase configuration.'
        });
      }
    } catch (error) {
      setConnectionStatus('error');
      setMessage({
        type: 'error',
        text: 'Unable to connect to database. Please try again later.'
      });
    }
  };

  const startScanner = () => {
    if (scannerRef.current && !scanner) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-scanner",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 1,
        },
        false
      );

      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
      setScanner(html5QrcodeScanner);
      setIsScanning(true);
    }
  };

  const stopScanner = () => {
    if (scanner && scanner.getState() !== Html5QrcodeScannerState.NOT_STARTED) {
      scanner.clear().catch(console.error);
      setScanner(null);
      setIsScanning(false);
    }
  };

  const onScanSuccess = (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText);
      if (data.registrationNumber && data.name) {
        setScannedData(data);
        setMessage({ type: 'success', text: 'QR Code scanned successfully!' });
        stopScanner();
      } else {
        setMessage({ type: 'error', text: 'Invalid QR code format' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Invalid QR code data' });
    }
  };

  const onScanFailure = (error: string) => {
    // Ignore scan failures to avoid spam
    console.log('Scan failed:', error);
  };

  const handleMarkAttendance = async () => {
    if (!scannedData || !currentUser) return;

    if (connectionStatus !== 'connected') {
      setMessage({
        type: 'error',
        text: 'Database not connected. Please refresh the page and try again.'
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const attendanceRecord: AttendanceRecord = {
        registration_number: scannedData.registrationNumber,
        participant_name: scannedData.name,
        marked_by_volunteer: currentUser.displayName || currentUser.email || 'Unknown Volunteer',
        event_name: 'Inferno Verse 2025'
      };

      console.log('Marking attendance for:', attendanceRecord);
      await markAttendance(attendanceRecord);
      setMessage({ type: 'success', text: 'Attendance marked successfully!' });

      // Reset after 3 seconds
      setTimeout(() => {
        setScannedData(null);
        setMessage(null);
        startScanner();
      }, 3000);
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to mark attendance. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setMessage(null);
    startScanner();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text">
            Volunteer Scanner
          </h1>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Connection Status */}
          {connectionStatus === 'checking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 rounded-lg border border-yellow-500/50 bg-yellow-900/50 text-yellow-400"
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                <span>Checking database connection...</span>
              </div>
            </motion.div>
          )}

          {connectionStatus === 'connected' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 rounded-lg border border-green-500/50 bg-green-900/50 text-green-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Database connected successfully</span>
              </div>
            </motion.div>
          )}

          {/* Message Display */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-lg border ${message.type === 'success'
                    ? 'bg-green-900/50 border-green-500/50 text-green-400'
                    : 'bg-red-900/50 border-red-500/50 text-red-400'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{message.text}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {scannedData ? (
            <motion.div
              className="bg-slate-800/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mb-6 mx-auto">
                <User className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-green-400 text-center mb-6">
                Participant Found!
              </h2>

              <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <p className="text-white font-semibold text-lg">{scannedData.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Registration:</span>
                    <p className="text-white font-semibold text-lg">{scannedData.registrationNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Event:</span>
                    <p className="text-blue-400 font-semibold">{scannedData.event || 'Inferno Verse 2025'}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Marked by:</span>
                    <p className="text-purple-400 font-semibold">
                      {currentUser?.displayName || currentUser?.email || 'You'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleMarkAttendance}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className={`flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${connectionStatus !== 'connected' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{loading ? 'Marking...' : 'Mark Attendance'}</span>
                </motion.button>

                <motion.button
                  onClick={resetScanner}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  <Scan className="w-4 h-4" />
                  <span>Scan Another</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="bg-slate-800/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-6 mx-auto">
                <Camera className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-xl font-bold text-blue-400 text-center mb-6">
                Scan Participant QR Code
              </h2>

              <div className="scanner-container">
                <div
                  id="qr-scanner"
                  ref={scannerRef}
                  className="bg-slate-900 rounded-lg overflow-hidden border-2 border-dashed border-blue-500/50"
                />
              </div>

              {isScanning && (
                <motion.div
                  className="text-center mt-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-blue-400 text-sm">
                    Position the QR code within the scanning area
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        #qr-scanner {
          width: 100% !important;
        }
        #qr-scanner > div {
          border: none !important;
        }
        #qr-scanner video {
          border-radius: 0.5rem;
        }
        #qr-scanner__dashboard {
          background: rgba(15, 23, 42, 0.8) !important;
          border-radius: 0.5rem;
          margin-top: 1rem;
        }
        #qr-scanner__dashboard_section {
          color: #00FFFF !important;
        }
        #qr-scanner__dashboard_section button {
          background: linear-gradient(to right, #2563eb, #7c3aed) !important;
          border: none !important;
          border-radius: 0.5rem !important;
          color: white !important;
          font-weight: 600 !important;
        }
        #qr-scanner__dashboard_section select {
          background: rgba(51, 65, 85, 0.8) !important;
          border: 1px solid rgba(0, 255, 255, 0.3) !important;
          border-radius: 0.5rem !important;
          color: #00FFFF !important;
        }
      `}</style>
    </div>
  );
};

export default VolunteerScanner;
