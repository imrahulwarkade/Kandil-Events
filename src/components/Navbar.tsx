"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/src/lib/data";
import { useScroll } from "@/src/hooks/useScroll";
import { cn } from "@/src/lib/utils";

const MotionLink = motion.create(Link);

export function Navbar() {
  const scrolled = useScroll(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-110 flex items-center justify-between pr-6 md:px-12 lg:px-[60px] transition-all duration-700",
          scrolled && !isMobileMenuOpen
            ? "bg-[#FEFAF6]/90 backdrop-blur-[16px] border-b border-[#D4AF37]/20 shadow-lg shadow-black/5 py-4" 
            : "bg-transparent border-b border-transparent py-2 pointer-events-auto"
        )}
      >
        {/* Left Logo */}
        <MotionLink
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 no-underline focus-visible:outline-none"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-label="Kandil Events home"
        >
          <Image
            src="/assets/logo-transparent.png"
            alt="Kandil Events"
            width={180}
            height={80}
            priority
            loading="eager"
            className={cn(
              "w-auto object-contain transition-all duration-700 brightness-0 opacity-90",
              scrolled && !isMobileMenuOpen ? "h-[45px]" : "h-[65px]" 
            )}
            style={{ width: "auto" }}
            sizes="180px"
          />
        </MotionLink>

        {/* Right Links Desktop */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex list-none gap-10 lg:gap-14">
            {navLinks.map((link) => (
              <li key={link.href}>
                <MotionLink
                  href={link.href}
                  className={cn(
                    "relative pb-1 text-[11px] font-medium uppercase tracking-[0.25em] no-underline focus-visible:outline-gold transition-colors duration-500",
                    scrolled ? "text-[#2C2A28]" : "text-[#2C2A28]/80 hover:text-[#2C2A28]"
                  )}
                  initial="rest"
                  whileHover="hover"
                  variants={{ rest: {}, hover: {} }}
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37]"
                    variants={{ rest: { width: 0 }, hover: { width: "100%" } }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </MotionLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none focus-visible:outline-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            className={cn(
              "w-6 h-px absolute block transition-colors",
              scrolled || isMobileMenuOpen ? "bg-[#2C2A28]" : "bg-[#2C2A28]/80"
            )}
          />
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            className={cn(
              "w-6 h-px absolute block transition-colors",
              scrolled || isMobileMenuOpen ? "bg-[#2C2A28]" : "bg-[#2C2A28]/80"
            )}
          />
        </button>
      </header>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-modal"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-105 bg-[#FEFAF6] flex flex-col items-center justify-center min-h-dvh px-6 pt-24 pb-12 overflow-y-auto"
          >
            <nav className="w-full flex flex-col items-center gap-10 mt-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase text-[#2C2A28] hover:text-[#D4AF37] transition-colors focus-visible:outline-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-auto pt-16 flex flex-col items-center gap-8 w-full"
            >
              <div className="w-12 h-px bg-[#D4AF37]/50" />
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-medium tracking-[0.25em] uppercase text-[#2C2A28] border border-[#2C2A28] px-10 py-4 hover:bg-[#2C2A28] hover:text-[#FEFAF6] transition-all duration-500 focus-visible:outline-gold"
              >
                Inquire Now
              </Link>
              <div className="flex gap-6 mt-4 opacity-70">
                <Link href="#" className="text-sm font-light hover:text-[#D4AF37] transition-colors">IG</Link>
                <Link href="#" className="text-sm font-light hover:text-[#D4AF37] transition-colors">FB</Link>
                <Link href="#" className="text-sm font-light hover:text-[#D4AF37] transition-colors">PIN</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
