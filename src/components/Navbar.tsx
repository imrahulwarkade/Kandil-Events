"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/src/lib/data";
import { useScroll } from "@/src/hooks/useScroll";
import { cn } from "@/src/lib/utils";

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
          "fixed left-0 right-0 top-0 z-[110] flex items-center justify-between pr-6 md:px-12 lg:px-[60px] transition-all duration-300",
          "max-md:bg-[#FEFAF6]/95 max-md:backdrop-blur-[16px] max-md:border-b max-md:border-[#D4AF37]/20 max-md:shadow-lg max-md:shadow-black/5",
          scrolled && !isMobileMenuOpen
            ? "md:bg-[#FEFAF6]/90 md:backdrop-blur-[16px] md:border-b md:border-[#D4AF37]/20 md:shadow-lg md:shadow-black/5 py-3 md:py-4" 
            : "md:bg-transparent md:border-transparent py-3 md:py-2 pointer-events-auto"
        )}
      >
        {/* Left Logo */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 no-underline focus-visible:outline-none"
          aria-label="Kandil Events home"
        >
          <Image
            src="/assets/logo-transparent.png"
            alt="Kandil Events"
            width={240}
            height={100}
            priority
            loading="eager"
            className={cn(
              "w-auto object-contain brightness-0 opacity-90 transition-all duration-300",
              scrolled && !isMobileMenuOpen ? "h-[50px] md:h-[60px]" : "h-[70px] md:h-[90px]" 
            )}
            style={{ width: "auto" }}
            sizes="240px"
          />
        </Link>

        {/* Right Links Desktop */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex list-none gap-10 lg:gap-14">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "group relative pb-1 text-[11px] font-medium uppercase tracking-[0.25em] no-underline focus-visible:outline-gold",
                    scrolled ? "text-[#2C2A28]" : "text-[#2C2A28]/80 hover:text-[#2C2A28]"
                  )}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none focus-visible:outline-gold z-[120]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span 
            className={cn(
              "w-6 h-px absolute block",
              scrolled || isMobileMenuOpen ? "bg-[#2C2A28]" : "bg-[#2C2A28]/80",
              isMobileMenuOpen ? "rotate-45" : "-translate-y-1"
            )}
          />
          <span 
            className={cn(
              "w-6 h-px absolute block",
              scrolled || isMobileMenuOpen ? "bg-[#2C2A28]" : "bg-[#2C2A28]/80",
              isMobileMenuOpen ? "-rotate-45" : "translate-y-1"
            )}
          />
        </button>
      </header>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[105] bg-[#FEFAF6] flex flex-col items-center justify-center min-h-dvh px-6 pt-24 pb-12 overflow-y-auto"
        >
          <nav className="w-full flex flex-col items-center gap-10 mt-8">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase text-[#2C2A28] hover:text-[#D4AF37] focus-visible:outline-gold"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-16 flex flex-col items-center gap-8 w-full">
            <div className="w-12 h-px bg-[#D4AF37]/50" />
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-medium tracking-[0.25em] uppercase text-[#2C2A28] border border-[#2C2A28] px-10 py-4 hover:bg-[#2C2A28] hover:text-[#FEFAF6] focus-visible:outline-gold"
            >
              Inquire Now
            </Link>
            <div className="flex gap-6 mt-4 opacity-70">
              <Link href="#" className="text-sm font-light hover:text-[#D4AF37]">IG</Link>
              <Link href="#" className="text-sm font-light hover:text-[#D4AF37]">FB</Link>
              <Link href="#" className="text-sm font-light hover:text-[#D4AF37]">PIN</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
