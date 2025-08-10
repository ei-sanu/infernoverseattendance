import { motion, useAnimationControls } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4"
    >
      <div className="relative w-full max-w-[400px] aspect-square flex flex-col items-center justify-center">
        {/* Glowing background */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-cyan-400/10 blur-2xl rounded-full"
        />

        {/* Main content container */}
        <div className="relative text-center z-10 mb-8">
          {/* Title Container */}
          <div className="flex flex-col items-center space-y-2 mb-12">
            {/* INFERNO text */}
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                textShadow: [
                  "0 0 5px #00ffff",
                  "0 0 15px #00ffff",
                  "0 0 5px #00ffff"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-3xl md:text-5xl font-light text-cyan-50"
              style={{
                letterSpacing: '0.3em',
              }}
            >
              INFERNO
            </motion.h1>

            {/* VERSE text */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                textShadow: [
                  "0 0 5px #00ffff",
                  "0 0 15px #00ffff",
                  "0 0 5px #00ffff"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
              className="text-3xl md:text-5xl font-light text-cyan-50"
              style={{
                letterSpacing: '0.3em',
              }}
            >
              VERSE
            </motion.h1>
          </div>

          {/* Compass - increased size */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0"
              style={{
                border: '2px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '50%',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.2) inset'
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Percentage circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <motion.circle
                cx="50%"
                cy="50%"
                r="47%"
                stroke="rgba(6, 182, 212, 0.4)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="calc(300% * 3.1416 / 100)"
                initial={{ strokeDashoffset: "calc(300% * 3.1416)" }}
                animate={{ strokeDashoffset: `calc(300% * 3.1416 * ${(100 - percentage) / 100})` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Compass directions with improved visibility */}
            <div className="absolute inset-0 text-cyan-400/80 text-sm md:text-base font-light tracking-wider">
              <motion.div
                className="absolute top-2 left-1/2 -translate-x-1/2"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                N
              </motion.div>
              <motion.div
                className="absolute right-2 top-1/2 -translate-y-1/2"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                E
              </motion.div>
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                S
              </motion.div>
              <motion.div
                className="absolute left-2 top-1/2 -translate-y-1/2"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                W
              </motion.div>
            </div>

            {/* Inner circle with enhanced gradient */}
            <motion.div
              className="absolute inset-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 70%, transparent 100%)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.1) inset'
              }}
            />

            {/* Enhanced compass arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative w-full h-1"
              >
                {/* Arrow head - North */}
                <motion.div className="absolute left-1/2 -translate-x-1/2 w-4 h-16 md:h-20">
                  <div
                    className="w-full h-full"
                    style={{
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      background: 'linear-gradient(to top, rgba(6, 182, 212, 0.6), #ef4444)',
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                    }}
                  />
                </motion.div>
                {/* Arrow head - South */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-16 md:h-20"
                  style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      background: 'linear-gradient(to top, rgba(6, 182, 212, 0.6), #06b6d4)',
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Center dot with percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative flex items-center justify-center w-12 h-12 bg-slate-900 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}
              >
                <motion.span
                  className="text-cyan-400 text-sm font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {percentage}%
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Loading text with dots animation */}
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mt-12 text-cyan-400/80 text-sm md:text-base tracking-[0.3em] font-light"
          >
            LOADING
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
