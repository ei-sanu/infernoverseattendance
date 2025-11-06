import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IV</span>
              </div>
              <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text">
                INFERNO VERSE
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced attendance tracking system for hackathons with cyberpunk aesthetics and modern technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-cyan-400 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Participant Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Volunteer Portal
                </a>
              </li>
              <li>
                {/* contact info */}
                <a href="https://infernoverse.vercel.app/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-cyan-400 font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {[

                { icon: Linkedin, href: 'https://www.linkedin.com/company/inferno-org/' },
                { icon: Instagram, href: 'https://www.instagram.com/infernoofficial8?igsh=dXdhcWh0cjJlMTB4' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyan-500/30 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Inferno Verse. All rights reserved. Built with cutting-edge technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
