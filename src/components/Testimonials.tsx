"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/src/components/SectionLabel";
import { testimonials } from "@/src/lib/data";

const viewport = { once: true, amount: 0.12 as const };

const delays = [0, 0.1, 0.2];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-cream px-[60px] py-[120px]"
      aria-labelledby="testimonials-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionLabel>Voices of Trust</SectionLabel>
      </motion.div>
      <motion.h2
        id="testimonials-heading"
        className="mb-20 font-serif text-[clamp(42px,5vw,68px)] font-light leading-[1.1] text-mocha"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        What Our <em className="italic text-rose">Clients</em> Say
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.article
            key={t.id}
            className="relative border border-gold/30 bg-white/50 p-10 px-10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{
              duration: 0.8,
              delay: delays[i] ?? 0,
              ease: "easeOut",
            }}
            whileHover={{
              borderColor: "rgba(201, 169, 110, 1)",
              y: -4,
            }}
          >
            <div
              className="mb-4 text-xs tracking-[0.15em] text-gold"
              aria-label={`${t.stars} out of 5 stars`}
            >
              {"★".repeat(t.stars)}
            </div>
            <div className="mb-6 font-serif text-[80px] leading-[0.6] text-gold-light">
              &ldquo;
            </div>
            <p className="mb-8 font-serif text-[19px] font-normal italic leading-[1.7] text-mocha">
              {t.quote}
            </p>
            <div className="flex items-center gap-4 border-t border-gold/30 pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blush to-gold-light font-serif text-lg text-mocha">
                {t.authorInitial}
              </div>
              <div>
                <div className="text-[13px] font-normal tracking-wide text-mocha">
                  {t.authorName}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-gold">
                  {t.eventLabel}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
