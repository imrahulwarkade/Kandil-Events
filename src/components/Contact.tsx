"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/src/components/SectionLabel";
import { eventTypeOptions } from "@/src/lib/data";
import type { ContactFormValues } from "@/src/types";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

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

gsap.registerPlugin(ScrollTrigger);

const initial: ContactFormValues = {
  name: "",
  email: "",
  eventType: "",
  eventDate: "",
  message: "",
};

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger to account for dynamic content above (Gallery, etc.)
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        // Entrance Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        // Left Column Reveal (Text titles reveal from -100% left)
        tl.from(".contact-reveal-left", {
          x: -200,
          opacity: 0,
          duration: 2,
          stagger: 0.5,
          ease: "power2.out",
        });

        // Right Column Reveal (Form reveals from the right)
        tl.from(".contact-reveal-right", {
          x: 200,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
        }, "<0.5");

        // Magnetic Button Effect
        const button = buttonRef.current;
        if (button) {
          const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            gsap.to(button, {
              x: x * 0.2,
              y: y * 0.2,
              duration: 0.4,
              ease: "power2.out",
            });
          };
          const onMouseLeave = () => {
            gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
          };
          button.addEventListener("mousemove", onMouseMove);
          button.addEventListener("mouseleave", onMouseLeave);
          return () => {
            button.removeEventListener("mousemove", onMouseMove);
            button.removeEventListener("mouseleave", onMouseLeave);
          };
        }
      }, sectionRef);
    });

    return () => {
      mm.revert();
      clearTimeout(timer);
    };
  }, []);

  const update =
    (field: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(initial);
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-mocha px-[5%] py-24 md:px-[7%] lg:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left Column: Info */}
        <div ref={infoRef} className="flex flex-col justify-center">
          <SectionLabel className="mb-8 text-gold border-gold/20 contact-reveal-left">Let&apos;s Connect</SectionLabel>
          <h2
            id="contact-heading"
            className="mb-12 font-serif text-[clamp(42px,6vw,84px)] font-bold leading-[1.05] text-cream contact-reveal-left"
          >
            Start Your <br />
            <em className="italic text-gold">Celebration</em>
          </h2>
          
          <div className="space-y-8 contact-reveal-left">
            <ContactLink
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              href="mailto:kandil.claykala@gmail.com"
              value="kandil.claykala@gmail.com"
            />
            <ContactLink
              icon={<Phone className="w-5 h-5" />}
              label="Phone"
              href="tel:+918088258050"
              value="+91 80882 58050"
            />
            <ContactItem
              icon={<MapPin className="w-5 h-5" />}
              label="Location"
              value="Bhopal, India"
            />
            <ContactLink
              icon={<Instagram className="w-5 h-5" />}
              label="Instagram"
              href="https://instagram.com/kandil.events"
              value="@kandil.events"
            />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="relative">
          <motion.div 
            className="rounded-3xl border border-gold/10 bg-cream/5 p-8 md:p-12 backdrop-blur-md contact-reveal-right"
          >
            <form ref={formRef} className="flex flex-col gap-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingInput
                  id="name"
                  label="Name"
                  value={values.name}
                  onChange={update("name")}
                  required
                />
                <FloatingInput
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold/60">
                    Event Type
                  </label>
                  <select
                    value={values.eventType}
                    onChange={update("eventType")}
                    className="bg-transparent border-b border-gold/20 py-3 text-cream outline-none focus:border-gold transition-colors font-light appearance-none"
                    required
                  >
                    <option value="" className="bg-mocha">How can we help?</option>
                    {eventTypeOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-mocha">{opt}</option>
                    ))}
                  </select>
                </div>
                <FloatingInput
                  id="date"
                  label="Event Date"
                  placeholder="e.g. Oct 2024"
                  value={values.eventDate}
                  onChange={update("eventDate")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold/60">
                  Your Vision
                </label>
                <textarea
                  rows={4}
                  value={values.message}
                  onChange={update("message")}
                  placeholder="Tell us about the dream event you're planning..."
                  className="bg-transparent border-b border-gold/20 py-3 text-cream outline-none focus:border-gold transition-colors font-light placeholder:text-cream/20 resize-none"
                />
              </div>

              <div className="mt-4 flex flex-col items-center gap-6">
                <motion.button
                  ref={buttonRef}
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex items-center justify-center gap-4 w-full md:w-auto bg-gold px-16 py-6 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-mocha overflow-hidden disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">
                    {status === "loading" ? "Crafting..." : "Send Request"}
                  </span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                  <motion.div 
                    className="absolute inset-0 bg-cream"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: "power2.out" }}
                  />
                </motion.button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[13px] text-gold font-light tracking-wide text-center"
                    >
                      Bespoke request received. We&apos;ll be in touch soon.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[13px] text-rose font-light tracking-wide text-center"
                    >
                      Connection error. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
          {/* Decorative Background Element */}
          <div className="absolute -z-10 -right-20 -top-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -z-10 -left-20 -bottom-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, href, value }: { icon: React.ReactNode; label: string; href: string; value: string }) {
  return (
    <Link href={href} className="group flex items-center gap-6 no-underline">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 text-gold transition-colors group-hover:bg-gold group-hover:text-mocha">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold/50 mb-1">{label}</p>
        <p className="font-serif text-xl md:text-2xl text-cream transition-colors group-hover:text-gold">{value}</p>
      </div>
    </Link>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 text-gold">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold/50 mb-1">{label}</p>
        <p className="font-serif text-xl md:text-2xl text-cream">{value}</p>
      </div>
    </div>
  );
}

function FloatingInput({ id, label, value, onChange, type = "text", required = false, placeholder = "" }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-widest text-gold/60">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-transparent border-b border-gold/20 py-3 text-cream outline-none focus:border-gold transition-colors font-light placeholder:text-cream/20"
      />
    </div>
  );
}
