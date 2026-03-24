"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/src/components/SectionLabel";

const viewport = { once: true, amount: 0.12 as const };

export function About() {
  return (
    <section
      id="about"
      className="px-[60px] py-[120px]"
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 items-center gap-[100px] lg:grid-cols-2">
        <motion.div
          className="relative h-[580px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute right-0 top-0 h-[75%] w-[75%] overflow-hidden rounded-[2px] bg-gradient-to-br from-blush to-gold-light">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <span className="font-serif text-[72px] font-light leading-none text-mocha/15">
                ✦
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-mocha/50">
                Est. Excellence
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-[55%] w-[55%] overflow-hidden rounded-[2px] border-[6px] border-cream bg-gradient-to-br from-sage to-blush">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <span className="font-serif text-[72px] font-light leading-none text-mocha/15">
                K
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-mocha/50">
                Kandil Events
              </span>
            </div>
          </div>
          <div className="absolute bottom-[120px] left-[180px] bg-mocha px-7 py-4 text-[11px] font-light uppercase tracking-[0.15em] text-cream">
            Bespoke Experiences
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionLabel>Our Story</SectionLabel>
          </motion.div>
          <motion.h2
            id="about-heading"
            className="mb-6 font-serif text-[clamp(42px,5vw,68px)] font-light leading-[1.1] text-mocha"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Where Vision
            <br />
            Meets <em className="italic text-rose">Reality</em>
          </motion.h2>
          <motion.p
            className="mb-10 text-[15px] font-light leading-[2] text-mocha/70"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            At Kandil Events, we believe every celebration deserves to be
            extraordinary. Born from a passion for elegance and a dedication to
            flawless execution, we transform your vision into moments that
            linger in memory long after the last guest has departed.
          </motion.p>
          <motion.p
            className="mb-10 text-[15px] font-light leading-[2] text-mocha/70"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            From the first consultation to the final flourish, our team of
            seasoned event architects handles every detail with meticulous care
            and artistry.
          </motion.p>
          <motion.div
            className="mt-10 flex gap-12 border-t border-gold/30 pt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div>
              <span className="block font-serif text-5xl font-light leading-none text-mocha">
                200+
              </span>
              <span className="mt-2 block text-[10px] font-light uppercase tracking-[0.2em] text-gold">
                Events Curated
              </span>
            </div>
            <div>
              <span className="block font-serif text-5xl font-light leading-none text-mocha">
                8+
              </span>
              <span className="mt-2 block text-[10px] font-light uppercase tracking-[0.2em] text-gold">
                Years of Excellence
              </span>
            </div>
            <div>
              <span className="block font-serif text-5xl font-light leading-none text-mocha">
                98%
              </span>
              <span className="mt-2 block text-[10px] font-light uppercase tracking-[0.2em] text-gold">
                Client Satisfaction
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
