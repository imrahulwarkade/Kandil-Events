"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionLabel } from "@/src/components/SectionLabel";
import { galleryFilters, galleryItems } from "@/src/lib/data";
import { cn } from "@/src/lib/utils";
import type { LocationId } from "@/src/types";

type FilterId = "all" | LocationId;

const viewport = { once: true, amount: 0.12 as const };

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = galleryItems.filter((item) => {
    const passesFilter =
      activeFilter === "all" || item.location === activeFilter;
    const passesExpand = !item.extra || isExpanded;
    return passesFilter && passesExpand;
  });

  return (
    <section
      id="gallery"
      className="px-[60px] py-[120px]"
      aria-labelledby="gallery-heading"
    >
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionLabel>Past Moments</SectionLabel>
          </motion.div>
          <motion.h2
            id="gallery-heading"
            className="font-serif text-[clamp(42px,5vw,68px)] font-light leading-[1.1] text-mocha"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Our <em className="italic text-rose">Gallery</em>
          </motion.h2>
        </div>
        <motion.button
          type="button"
          className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-[11px] font-light uppercase tracking-[0.2em] text-mocha focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          onClick={() => setIsExpanded((e) => !e)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ x: 4 }}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show Less" : "View Full Portfolio"}
        </motion.button>
      </div>

      <motion.div
        className="mb-12 flex gap-8 overflow-x-auto border-b border-gold/20 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        role="tablist"
        aria-label="Filter by venue"
      >
        {galleryFilters.map((f) => (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === f.id}
            className={cn(
              "relative whitespace-nowrap border-0 bg-transparent pb-2 font-sans text-[11px] font-light uppercase tracking-[0.2em] transition-opacity duration-300",
              activeFilter === f.id
                ? "text-gold opacity-100"
                : "text-mocha opacity-40",
            )}
            onClick={() => setActiveFilter(f.id)}
            whileHover={{ opacity: 1 }}
          >
            {f.label}
            <motion.span
              className="absolute bottom-0 left-0 h-px bg-gold"
              initial={false}
              animate={{
                width: activeFilter === f.id ? "100%" : "0%",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className={cn(
          "grid gap-5 transition-all duration-300 ease-in-out",
          isExpanded
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[300px_280px]",
        )}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative min-h-[280px] overflow-hidden",
                !isExpanded &&
                  index === 0 &&
                  visibleItems.length > 0 &&
                  "md:row-span-2",
                !isExpanded &&
                  index === 0 &&
                  visibleItems.length === 1 &&
                  "md:col-span-full",
              )}
            >
              <GalleryTile item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function GalleryTile({
  item,
}: {
  item: (typeof galleryItems)[number];
}) {
  return (
    <motion.div
      className="group relative h-full min-h-[280px] w-full overflow-hidden"
      whileHover="hover"
      initial="rest"
      variants={{ rest: {}, hover: {} }}
    >
      <motion.div
        className="relative h-full w-full"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.04 },
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(42,26,24,0.7)] to-transparent p-8"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-serif text-[22px] font-light text-cream">
          {item.title}
        </p>
      </motion.div>
    </motion.div>
  );
}
