import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Scan, QrCode } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  onParticipantClick: () => void;
  onVolunteerClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onParticipantClick, onVolunteerClick }) => {
  const { currentUser, login } = useAuth();

  const handleCardClick = (type: 'participant' | 'volunteer') => {
    if (!currentUser) {
      login();
      return;
    }

    if (type === 'participant') {
      onParticipantClick();
    } else {
      onVolunteerClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100, 0],
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

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text mb-4"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            INFERNO VERSE
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-cyan-400/80 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            2025 Hackathon
          </motion.p>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Advanced Attendance Tracking System
          </motion.p>
        </motion.div>

        {/* Cards Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Participant Card */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick('participant')}
            >
              <div className="bg-slate-800/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">Participants</h3>
                  <p className="text-gray-300 mb-6">
                    Register and generate your unique QR code for attendance tracking. 
                    Enter your details and get instant access to your personalized attendance code.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <QrCode className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm text-gray-400">Generate QR Code</span>
                    </div>
                    <motion.div
                      className="text-cyan-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>

                {/* Glowing effect */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
              </div>
            </motion.div>

            {/* Volunteer Card */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick('volunteer')}
            >
              <div className="bg-slate-800/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-lg group-hover:shadow-blue-500/20 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Volunteers</h3>
                  <p className="text-gray-300 mb-6">
                    Scan participant QR codes and mark attendance efficiently. 
                    Access the camera-based scanner to track attendees in real-time.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Scan className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-400">Scan QR Codes</span>
                    </div>
                    <motion.div
                      className="text-blue-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>

                {/* Glowing effect */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Authentication Status */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {!currentUser && (
            <p className="text-gray-400 text-sm">
              <span className="text-cyan-400">●</span> Please sign in to access attendance features
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;