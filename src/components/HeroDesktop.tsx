"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroFluid = dynamic(() => import("./HeroFluid"), { ssr: false, loading: () => (
  <div className="absolute inset-0 bg-[#2C2A28]" />
) });

/**
 * Desktop hero (`md` and up): full-bleed image + centered editorial copy.
 * Hidden on small screens via parent (`hidden md:block`).
 */
export function HeroDesktop() {
  return (
    <section className="relative hidden h-dvh w-full flex-col items-center overflow-hidden md:flex">
      <div className="pointer-events-auto absolute inset-0 z-0">
        <HeroFluid />
      </div>

      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-[#FEFAF6]/85 via-transparent to-[#FEFAF6]/65" />

      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-start px-6 pt-[12vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex w-full max-w-5xl flex-col items-center justify-center p-4 drop-shadow-2xl"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="mb-8 text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37] drop-shadow-lg sm:text-[11px]"
          >
            Crafting Unforgettable Moments
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mb-10 font-serif text-6xl font-light leading-none tracking-tight text-[#2C2A28] drop-shadow-sm md:text-8xl lg:text-[110px]"
          >
            Events <span className="italic text-[#D4AF37]">Told</span> <br />
            in Gold.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mx-auto mb-0 max-w-xl text-sm font-light leading-[1.8] text-[#2C2A28]/80 drop-shadow-sm md:text-2xl md:font-medium"
          >
            Kandil Events orchestrates bespoke celebrations — from grand weddings and
            elegant corporate galas to intimate cultural ceremonies. Every detail, a
            masterpiece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="pointer-events-auto md:mt-8 flex w-full flex-col gap-6 sm:mt-0 sm:w-auto sm:flex-row"
          >
            <button
              type="button"
              className="w-full px-10 py-[18px] bg-[#D4AF37] text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b5952f] hover:shadow-xl hover:shadow-[#D4AF37]/30 sm:w-auto"
            >
              Begin Your Story
            </button>
            <button
              type="button"
              className="w-full border border-[#2C2A28]/30 bg-transparent px-10 py-[18px] text-[10px] font-medium uppercase tracking-[0.2em] text-[#2C2A28] transition-all duration-300 hover:-translate-y-1 hover:border-[#2C2A28] hover:bg-[#2C2A28]/5 sm:w-auto"
            >
              View Our Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#2C2A28]/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      >
        <span>Scroll to explore</span>
        <div className="relative h-16 w-px overflow-hidden bg-[#2C2A28]/20">
          <motion.div
            className="absolute left-0 top-0 h-1/2 w-full bg-[#D4AF37]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
