import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-32 h-32 border-4 border-cyan-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 w-24 h-24 border-4 border-blue-500/50 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Core */}
        <motion.div
          className="absolute inset-8 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-white font-bold text-xs">IV</div>
        </motion.div>
        
        {/* Glowing particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: `${40 + i * 10}px 0`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-1/3">
        <motion.h2
          className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          INFERNO VERSE
        </motion.h2>
        <motion.p
          className="text-cyan-400 text-center mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;