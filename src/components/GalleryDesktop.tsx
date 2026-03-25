"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { galleryItems } from "@/src/lib/data";
import { cn } from "@/src/lib/utils";

const springConfig = { type: "spring" as const, stiffness: 300, damping: 35 };

/**
 * `md` and up: horizontal accordion gallery.
 */
export function GalleryDesktop() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="hidden h-175 w-full gap-1 md:flex">
      {galleryItems.map((item, index) => (
        <motion.div
          key={item.id}
          layout
          onMouseEnter={() => setExpandedIndex(index)}
          className={cn(
            "relative cursor-pointer overflow-hidden bg-cream/5 transition-all duration-500",
            expandedIndex === index ? "flex-[5]" : "flex-1",
          )}
          transition={springConfig}
        >
          <motion.div className="absolute inset-0 h-full w-full" layout>
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              className={cn(
                "object-cover transition-all duration-1000",
                expandedIndex === index
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-110 opacity-30 blur-sm brightness-50",
              )}
              sizes="(max-width: 1200px) 80vw, 50vw"
            />
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                expandedIndex === index
                  ? "bg-linear-to-t from-mocha via-transparent to-transparent opacity-80"
                  : "bg-mocha/40 opacity-100",
              )}
            />
          </motion.div>

          <AnimatePresence>
            {expandedIndex !== index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <p className="rotate-180 whitespace-nowrap font-sans text-[12px] font-bold uppercase tracking-[0.4em] text-cream/40 [writing-mode:vertical-rl]">
                  {item.title}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

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
                      Seamlessly weaving together tradition and contemporary luxury to create a truly
                      unforgettable atmosphere for our distinguished guests.
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
  );
}
