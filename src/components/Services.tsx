"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/src/components/SectionLabel";
import { services } from "@/src/lib/data";
import type { Service } from "@/src/types";

const MotionLink = motion.create(Link);

const viewport = { once: true, amount: 0.12 as const };

const delays = [0, 0.1, 0.2, 0.3];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: 0.8,
        delay: delays[index] ?? 0,
        ease: "easeOut",
      }}
    >
      <motion.article
        className="relative overflow-hidden bg-mocha p-14 px-10"
        initial="rest"
        whileHover="hover"
        variants={{ rest: {}, hover: {} }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-mocha/50"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
        />
        <div className="relative z-[2]">
          <span className="absolute right-8 top-8 font-serif text-sm tracking-[0.15em] text-gold/30">
            {service.num}
          </span>
          <span className="mb-8 block text-4xl">{service.icon}</span>
          <h3 className="mb-4 font-serif text-[28px] font-light leading-tight text-cream">
            {service.name}
          </h3>
          <p className="mb-8 text-[13px] font-light leading-[1.8] text-cream/50">
            {service.description}
          </p>
          <MotionLink
            href="/#contact"
            className="relative inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold no-underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            initial="rest"
            whileHover="hover"
            variants={{ rest: {}, hover: {} }}
          >
            Enquire
            <motion.span
              variants={{
                rest: { x: 0 },
                hover: { x: 4 },
              }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </MotionLink>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="bg-mocha px-[60px] py-[120px]"
      aria-labelledby="services-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionLabel className="text-gold">What We Offer</SectionLabel>
      </motion.div>
      <motion.h2
        id="services-heading"
        className="mb-0 font-serif text-[clamp(42px,5vw,68px)] font-light leading-[1.1] text-cream"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        Our <em className="italic text-rose">Signature</em>
        <br />
        Services
      </motion.h2>

      <div className="mt-20 grid grid-cols-1 gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.num} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
