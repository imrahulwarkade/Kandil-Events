"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// WebGL Liquid engine for background
const HeroFluid = dynamic(() => import("./HeroFluid"), { ssr: false, loading: () => (
  <div className="absolute inset-0 bg-[#2C2A28]" />
) });

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Pure DOM listener, safely sets mounted on Client
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); 
    // Wait an animation frame so state updates cleanly after first paint without triggering pure React errors
    requestAnimationFrame(() => setMounted(true));
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#2C2A28] flex flex-col items-center">
      {/* Background Context Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {mounted && (
          <AnimatePresence>
            {!isMobile ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="w-full h-full">
                <HeroFluid />
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/background_hero.png')" }} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Cream Theme Vignette - Placed *between* the WebGL canvas and the text */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#FEFAF6]/60 via-transparent to-[#FEFAF6]/40" />

      {/* Editorial Top-Center Content Layer - Stripped of the glass card! */}
      <div className="relative z-10 flex flex-col items-center justify-start w-full h-full px-6 pt-[22vh] text-center pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="w-full max-w-5xl flex flex-col items-center justify-center p-4 drop-shadow-2xl"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-[10px] sm:text-[11px] tracking-[0.4em] text-[#D4AF37] uppercase mb-8 font-medium drop-shadow-lg"
          >
            Crafting Unforgettable Moments
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-[110px] font-serif font-light text-[#2C2A28] tracking-tight leading-[1] mb-10 drop-shadow-sm"
          >
            Events <span className="italic text-[#D4AF37]">Told</span> <br />
            in Gold.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="max-w-xl mx-auto text-sm md:text-[17px] text-[#2C2A28]/80  font-light leading-[1.8] drop-shadow-sm"
          >
            Kandil Events orchestrates bespoke celebrations — from grand weddings
            and elegant corporate galas to intimate cultural ceremonies. Every
            detail, a masterpiece.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 pointer-events-auto w-full sm:w-auto"
          >
            <button className="px-10 py-[18px] bg-[#D4AF37] text-white text-[10px] tracking-[0.2em] font-medium uppercase transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/30 w-full sm:w-auto">
              Begin Your Story
            </button>
            <button className="px-10 py-[18px] bg-transparent border border-[#2C2A28]/30 text-[#2C2A28] text-[10px] tracking-[0.2em] font-medium uppercase transition-all duration-300 hover:border-[#2C2A28] hover:bg-[#2C2A28]/5 hover:-translate-y-1 w-full sm:w-auto">
              View Our Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#2C2A28]/60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      >
        <span>Scroll to explore</span>
        <div className="relative w-[1px] h-16 overflow-hidden bg-[#2C2A28]/20">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#D4AF37]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
