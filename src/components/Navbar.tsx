"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "@/src/lib/data";
import { useScroll } from "@/src/hooks/useScroll";
import { cn } from "@/src/lib/utils";

const MotionLink = motion.create(Link);

export function Navbar() {
  const scrolled = useScroll(50);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-6 md:px-12 lg:px-[60px] py-6 transition-[background,backdrop-filter,border-color,box-shadow,padding] duration-700",
        scrolled 
          ? "bg-[#FEFAF6]/90 backdrop-blur-[16px] border-b border-[#D4AF37]/20 shadow-lg shadow-black/5 py-4" 
          : "bg-transparent border-b border-transparent py-8 pointer-events-auto"
      )}
    >
      {/* Left Logo */}
      <MotionLink
        href="/"
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
            scrolled ? "h-[45px]" : "h-[65px]" 
          )}
          style={{ width: "auto" }}
          sizes="180px"
        />
      </MotionLink>

      {/* Right Links */}
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
      <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-[5px] focus:outline-none">
        <span className="w-6 h-[1px] block transition-colors bg-[#2C2A28]" />
        <span className="w-6 h-[1px] block transition-colors bg-[#2C2A28]" />
      </button>
    </header>
  );
}
