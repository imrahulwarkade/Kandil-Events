"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, ExternalLink, ArrowUpRight, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        // reveal animation
        gsap.from(".footer-reveal", {
          y: 60,
          opacity: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        });

        // Parallax for the large 'KANDIL' text
        gsap.fromTo(brandRef.current, 
          { y: 100 },
          {
            y: -100,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );

        // Magnetic back to top
        const btn = backToTopRef.current;
        if (btn) {
          const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
          };
          const onMouseLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
          btn.addEventListener("mousemove", onMouseMove);
          btn.addEventListener("mouseleave", onMouseLeave);
        }
      }, footerRef);
    });

    return () => mm.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative bg-[#0C0A09] pt-32 pb-12 px-[5%] overflow-hidden border-t border-gold/5">
      {/* Background Statement Text */}
      <h2 
        ref={brandRef}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-serif text-[clamp(100px,35vw,600px)] font-bold italic leading-none text-white/1.5 -z-10 tracking-tighter"
      >
        Kandil
      </h2>

      <div className="mx-auto max-w-400">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-20 gap-x-12 mb-32">
          
          {/* Brand & Mission */}
          <div className="footer-reveal lg:col-span-4 max-w-sm">
            <Link href="/" className="inline-block mb-10">
              <Image
                src="/assets/logo-transparent.png"
                alt="Kandil Events"
                width={180}
                height={120}
                className="h-auto w-40 brightness-125 transition-transform hover:scale-105 duration-500"
              />
            </Link>
            <p className="font-serif text-xl leading-relaxed text-cream/70 italic">
              Where luxury meets legacy. We deconstruct the ordinary to curate extraordinary narratives through bespoke event design.
            </p>
          </div>

          <div className="lg:col-span-1" /> {/* Spacer */}

          {/* Navigation */}
          <div className="footer-reveal lg:col-span-2">
            <h4 className="font-serif text-gold text-lg mb-8 italic">The Journal</h4>
            <nav className="flex flex-col gap-5">
              <FooterLink href="/#about">The Studio</FooterLink>
              <FooterLink href="/#services">Services</FooterLink>
              <FooterLink href="/#gallery">Work</FooterLink>
              <FooterLink href="/#contact">Connect</FooterLink>
            </nav>
          </div>

          {/* Connect */}
          <div className="footer-reveal lg:col-span-3">
            <h4 className="font-serif text-gold text-lg mb-8 italic">Studio Contact</h4>
            <div className="flex flex-col gap-8">
              <div className="group cursor-pointer">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold/30 block mb-2">Direct Enquiry</span>
                <a href="tel:+918088258050" className="font-serif text-2xl text-cream transition-colors group-hover:text-gold">+91 80882 58050</a>
              </div>
              <div className="group cursor-pointer">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold/30 block mb-2">Electronic Mail</span>
                <a href="mailto:kandil.claykala@gmail.com" className="font-serif text-2xl text-cream transition-colors group-hover:text-gold uppercase tracking-tight">hello@kandilevents.com</a>
              </div>
            </div>
          </div>

          {/* Interaction: Back to Top */}
          <div className="footer-reveal lg:col-span-2 justify-end items-start md:items-center hidden md:flex">
            <button 
              ref={backToTopRef}
              onClick={scrollToTop}
              className="relative group h-24 w-24 rounded-full border border-gold/20 flex items-center justify-center transition-colors hover:border-gold hover:bg-gold/5"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-8 h-8 text-gold transition-transform group-hover:-translate-y-1" />
              <div className="absolute inset-0 rounded-full border border-gold/40 scale-75 opacity-0 transition-all group-hover:scale-110 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Bottom Bar Socials & Copyright */}
        <div className="footer-reveal border-t border-gold/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex justify-between flex-wrap md:gap-10 gap-5">
            <SocialLink icon={<Instagram className="w-5 h-5" />} href="https://instagram.com/kandil.events" label="Instagram" />
            <SocialLink icon={<MessageCircle className="w-5 h-5" />} href="https://wa.me/918088258050" label="WhatsApp" />
            <SocialLink icon={<ExternalLink className="w-5 h-5" />} href="#" label="Pinterest" />
          </div>

          <div className="flex gap-12 items-center">
             <Link href="#" className="text-[10px] uppercase tracking-[0.2em] text-cream/30 hover:text-gold transition-colors">Privacy Disclosure</Link>
             <Link href="#" className="text-[10px] uppercase tracking-[0.2em] text-cream/30 hover:text-gold transition-colors">Terms of Use</Link>
             <p className="text-[10px] uppercase tracking-[0.3em] text-cream/20">
              © {new Date().getFullYear()} Kandil Events Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="group relative inline-flex items-center gap-2 font-serif text-2xl text-cream/60 transition-all hover:text-cream"
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-1 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full" />
      </span>
      <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-gold" />
    </Link>
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 text-cream/40 transition-colors hover:text-gold"
    >
      <div className="transition-transform group-hover:scale-110 duration-500">
        {icon}
      </div>
      <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium">{label}</span>
    </a>
  );
}
