"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Preloader() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Reach 100% in ~2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-[#2C2A28] px-6"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <Image
            src="/assets/logo-transparent.png"
            alt="Kandil Events"
            width={300}
            height={125}
            priority
            className="h-auto w-[240px] md:w-[300px] object-contain invert brightness-0"
          />
        </motion.div>

        {/* Loading Progress */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-48 overflow-hidden bg-white/10 md:w-64">
            <motion.div
              className="h-full bg-[#D4AF37]"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div className="flex flex-col items-center gap-1">
             <span className="font-serif text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
               Loading Experience
             </span>
             <span className="font-sans text-[9px] tracking-[0.2em] text-white/40 uppercase">
               {percent}%
             </span>
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute top-12 left-12 w-12 h-12 border-t border-l border-[#D4AF37]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute top-12 right-12 w-12 h-12 border-t border-r border-[#D4AF37]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-[#D4AF37]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#D4AF37]"
      />

    </motion.div>
  );
}
