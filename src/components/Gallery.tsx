"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionLabel } from "@/src/components/SectionLabel";
import { galleryItems } from "@/src/lib/data";
import { cn } from "@/src/lib/utils";

const springConfig = { type: "spring", stiffness: 300, damping: 35 };

export function Gallery() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section
      id="gallery"
      className="bg-mocha px-[5%] py-20 md:px-[7%] lg:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl text-cream">
          <SectionLabel className="mb-6 border-cream/20 text-cream">Portfolio</SectionLabel>
          <h2
            id="gallery-heading"
            className="font-serif text-[clamp(42px,6vw,84px)] font-bold leading-none"
          >
            Curated <em className="italic text-gold">Experiences</em>
          </h2>
        </div>
        <div className="max-w-xs text-right md:block hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">
            Selected Work
          </p>
          <p className="text-[11px] font-light leading-relaxed text-cream/50 uppercase tracking-widest">
            A journey through our most <br /> distinguished celebrations.
          </p>
        </div>
      </div>

      {/* Desktop Accordion */}
      <div className="hidden h-175 w-full gap-1 md:flex">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            onMouseEnter={() => setExpandedIndex(index)}
            className={cn(
              "relative cursor-pointer overflow-hidden bg-cream/5 transition-all duration-500",
              expandedIndex === index ? "flex-[5]" : "flex-1"
            )}
            transition={springConfig}
          >
            {/* Background Image Container */}
            <motion.div className="absolute inset-0 h-full w-full" layout>
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className={cn(
                  "object-cover transition-all duration-1000",
                  expandedIndex === index ? "opacity-100 scale-100 blur-0" : "opacity-30 scale-110 blur-sm brightness-50"
                )}
                sizes="(max-width: 1200px) 80vw, 50vw"
              />
              <div className={cn(
                "absolute inset-0 transition-opacity duration-700",
                expandedIndex === index 
                  ? "bg-linear-to-t from-mocha via-transparent to-transparent opacity-80" 
                  : "bg-mocha/40 opacity-100"
              )} />
            </motion.div>

            {/* Vertical Label (Collapsed State) */}
            <AnimatePresence>
              {expandedIndex !== index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <p className="whitespace-nowrap font-sans text-[12px] font-bold tracking-[0.4em] text-cream/40 uppercase [writing-mode:vertical-rl] rotate-180">
                    {item.title}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Content (Active State) */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-end p-12 lg:p-16"
                >
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-6">
                      <span className="h-px w-20 bg-gold/50" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">
                        {item.location}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="max-w-xl font-serif text-[42px] font-bold leading-tight text-cream lg:text-[54px]">
                        {item.title.split("@").join("\n@")}
                      </h3>
                      <p className="max-w-md text-[13px] font-light leading-relaxed tracking-wider text-cream/70">
                        Seamlessly weaving together tradition and contemporary luxury to create a truly unforgettable atmosphere for our distinguished guests.
                      </p>
                    </div>
                    <motion.div 
                      className="group flex w-fit items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
                      whileHover={{ x: 10 }}
                    >
                      View Project Details
                      <span className="h-px w-8 bg-gold transition-all group-hover:w-16" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Mobile Stack */}
      <div className="flex flex-col gap-6 md:hidden">
        {galleryItems.slice(0, 5).map((item) => (
          <motion.div 
            key={item.id} 
            className="relative h-[300px] w-full overflow-hidden rounded-lg bg-mocha/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gold">
                {item.location}
              </span>
              <p className="font-serif text-[24px] font-light text-cream leading-tight">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
        <button className="mt-4 w-full border border-cream/10 py-5 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-cream/70 hover:bg-cream hover:text-dark transition-colors">
          View All Portfolio
        </button>
      </div>
    </section>
  );
}
