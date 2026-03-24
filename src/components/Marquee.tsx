"use client";

import { motion, useReducedMotion } from "framer-motion";
import { marqueePhrases } from "@/src/lib/data";

export function Marquee() {
  const reduce = useReducedMotion();
  const items = [...marqueePhrases, ...marqueePhrases];

  return (
    <div
      className="overflow-hidden border-y border-gold/40 bg-gold-light py-10"
      aria-hidden
    >
      {reduce ? (
        <div className="flex flex-wrap justify-center gap-20 px-8">
          {marqueePhrases.map((phrase) => (
            <span
              key={phrase}
              className="flex items-center gap-20 font-serif text-[22px] font-light italic text-mocha/50"
            >
              {phrase}
              <span className="text-xs text-gold">✦</span>
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max gap-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((phrase, i) => (
            <span
              key={`${phrase}-${i}`}
              className="flex items-center gap-20 whitespace-nowrap font-serif text-[22px] font-light italic text-mocha/50"
            >
              {phrase}
              <span className="text-xs text-gold">✦</span>
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
