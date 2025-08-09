import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, User, Mail, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, login, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text">
                INFERNO VERSE
              </h1>
              <p className="text-xs text-cyan-400/70">2025 Attendance</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-cyan-500/30 transition-all duration-300"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-cyan-400"
                    />
                  ) : (
                    <User className="w-8 h-8 text-cyan-400" />
                  )}
                  <span className="text-cyan-400 hidden lg:block">
                    {currentUser.displayName || 'User'}
                  </span>
                </button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="p-4 border-b border-cyan-500/20">
                        <div className="flex items-center space-x-2 text-cyan-400">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{currentUser.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfile(false);
                        }}
                        className="w-full flex items-center space-x-2 p-4 text-red-400 hover:bg-slate-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={login}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-cyan-400"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-cyan-500/30"
            >
              {currentUser ? (
                <div className="pt-4 space-y-4">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center space-x-2 text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    login();
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 rounded-lg text-white font-semibold mt-4"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;