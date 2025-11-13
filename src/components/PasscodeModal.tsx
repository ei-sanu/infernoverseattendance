import { AnimatePresence, motion } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import React, { useState } from 'react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passcode: string) => void;
  type: 'participant' | 'volunteer';
}

const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, onClose, onSubmit, type }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPasscode = type === 'participant' ? 'PIV2025' : 'INVE500';

    if (passcode === correctPasscode) {
      onSubmit(passcode);
      setPasscode('');
      setError('');
    } else {
      setError('Invalid passcode. Please try again.');
      setPasscode('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-800 border border-cyan-500/30 rounded-2xl p-8 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${type === 'participant'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className={`text-2xl font-bold text-center mb-2 ${type === 'participant' ? 'text-cyan-400' : 'text-blue-400'
              }`}>
              {type === 'participant' ? 'Participant' : 'Volunteer'} Access
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Enter the passcode to continue
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  autoFocus
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${type === 'participant'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                  }`}
              >
                Continue
              </motion.button>
            </form>

            <p className="text-gray-500 text-xs text-center mt-4">
              {type === 'participant' ? 'Passcode: PIV2025' : 'Passcode: Ask Platform Developer for the Passcode'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasscodeModal;
