"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { SectionLabel } from "@/src/components/SectionLabel";
import { eventTypeOptions } from "@/src/lib/data";
import type { ContactFormValues } from "@/src/types";

const viewport = { once: true, amount: 0.12 as const };

const initial: ContactFormValues = {
  name: "",
  email: "",
  eventType: "",
  eventDate: "",
  message: "",
};

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

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
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="bg-mocha px-[60px] py-[120px] text-cream"
      aria-labelledby="contact-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionLabel className="text-gold">Let&apos;s Connect</SectionLabel>
      </motion.div>
      <motion.h2
        id="contact-heading"
        className="mb-20 font-serif text-[clamp(42px,5vw,68px)] font-light leading-[1.1] text-cream"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        Begin Your
        <br />
        <em className="italic text-rose">Story</em> With Us
      </motion.h2>

      <div className="grid grid-cols-1 items-start gap-[100px] lg:grid-cols-2">
        <div>
          <motion.div
            className="border-t border-gold/30 py-10 first:border-t-0 first:pt-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">
              Email
            </div>
            <div className="font-serif text-[26px] font-light">
              <Link
                href="mailto:kandil.claykala@gmail.com"
                className="text-cream no-underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                kandil.claykala@gmail.com
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="border-t border-gold/30 py-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">
              Phone
            </div>
            <div className="font-serif text-[26px] font-light">
              <Link
                href="tel:+918088258050"
                className="text-cream no-underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                +91 80882 58050
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="border-t border-gold/30 py-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">
              Based In
            </div>
            <div className="font-serif text-[26px] font-light text-cream">
              Bhopal, India
            </div>
          </motion.div>
          <motion.div
            className="border-t border-gold/30 py-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">
              Follow Us
            </div>
            <div className="font-serif text-[26px] font-light">
              <Link
                href="https://instagram.com/kandil.events"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream no-underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                @kandil.events
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.form
          className="flex flex-col gap-6"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-[10px] font-light uppercase tracking-[0.2em] text-cream/50">
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              value={values.name}
              onChange={update("name")}
              className="border-0 border-b border-gold/40 bg-transparent py-4 font-sans text-[15px] font-light text-cream outline-none placeholder:text-cream/25 focus:border-gold"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-[10px] font-light uppercase tracking-[0.2em] text-cream/50">
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={values.email}
              onChange={update("email")}
              className="border-0 border-b border-gold/40 bg-transparent py-4 font-sans text-[15px] font-light text-cream outline-none placeholder:text-cream/25 focus:border-gold"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-event-type" className="text-[10px] font-light uppercase tracking-[0.2em] text-cream/50">
              Event Type
            </label>
            <select
              id="contact-event-type"
              name="eventType"
              value={values.eventType}
              onChange={update("eventType")}
              className="cursor-pointer appearance-none border-0 border-b border-gold/40 bg-transparent py-4 font-sans text-[15px] font-light text-cream outline-none focus:border-gold"
            >
              <option value="">Select event type</option>
              {eventTypeOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-mocha">
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-date" className="text-[10px] font-light uppercase tracking-[0.2em] text-cream/50">
              Event Date
            </label>
            <input
              id="contact-date"
              name="eventDate"
              type="text"
              placeholder="Approximate date"
              value={values.eventDate}
              onChange={update("eventDate")}
              className="border-0 border-b border-gold/40 bg-transparent py-4 font-sans text-[15px] font-light text-cream outline-none placeholder:text-cream/25 focus:border-gold"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-[10px] font-light uppercase tracking-[0.2em] text-cream/50">
              Tell Us About Your Vision
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Describe your dream event..."
              value={values.message}
              onChange={update("message")}
              className="h-[100px] resize-none border-0 border-b border-gold/40 bg-transparent py-4 font-sans text-[15px] font-light text-cream outline-none placeholder:text-cream/25 focus:border-gold"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="relative mt-4 inline-flex max-w-max overflow-hidden border-0 bg-gold px-12 py-5 font-sans text-[11px] font-normal uppercase tracking-[0.25em] text-mocha focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream disabled:opacity-60"
            whileHover="hover"
            initial="rest"
            variants={{ rest: {}, hover: {} }}
          >
            <motion.span
              className="absolute inset-0 bg-cream"
              variants={{
                rest: { x: "-101%" },
                hover: { x: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <span className="relative z-10">
              {status === "loading" ? "Sending…" : "Send Enquiry"}
            </span>
          </motion.button>

          {status === "success" && (
            <p className="text-sm text-gold" role="status">
              Thank you — we&apos;ll be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-rose" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
