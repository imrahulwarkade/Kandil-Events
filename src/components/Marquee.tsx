"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const marqueeText = "Crafting Unforgettable Luxury Experiences ✦ Beyond Imagination ✦ ";

interface MarqueeRowProps {
  direction?: "left" | "right";
  speed?: number;
  opacity?: number;
  className?: string;
  text: string;
}

function MarqueeRow({
  direction = "left",
  speed = 40,
  opacity = 1,
  className = "",
  text,
}: MarqueeRowProps) {
  const items = Array(6).fill(text);

  return (
    <div className={`flex overflow-hidden py-3 ${className}`} style={{ opacity }}>
      <motion.div
        className="flex whitespace-nowrap"
        initial={{ x: "-33.33%" }}
        animate={{ x: direction === "left" ? ["-33.33%", "-66.66%"] : ["-33.33%", "0%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Triple the content to allow seamless start from center in either direction */}
        {[0, 1, 2].map((blockIndex) => (
          <div key={blockIndex} className="flex gap-8 px-4">
            {items.map((t, i) => (
              <span
                key={`${blockIndex}-${i}`}
                className="text-3xl md:text-5xl font-black capitalize tracking-tight text-mocha select-none"
              >
                {t}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="py-20 bg-gold-light/20 flex flex-col gap-4 items-center overflow-hidden">
        <p className="text-4xl font-bold text-mocha opacity-50">{marqueeText}</p>
        <p className="text-6xl font-bold text-mocha">{marqueeText}</p>
        <p className="text-4xl font-bold text-mocha opacity-30">{marqueeText}</p>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-gold-light/5 hidden md:block">
      {/* Rotated Container */}
      <div className="relative scale-110 origin-center py-20 flex flex-col gap-1 items-center">
        {/* Top Row - Faded/Ghost */}
        <MarqueeRow 
          text={marqueeText} 
          direction="right" 
          speed={500} 
          opacity={0.08} 
        />
        {/* Bottom Row - Bold/Main */}
        <MarqueeRow 
          text={marqueeText} 
          direction="left" 
          speed={400} 
          opacity={1} 
          className="z-10"
        />
      </div>

      {/* Rotating Badge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Link 
          href="#contact" 
          className="pointer-events-auto relative group"
        >
          <motion.div
            className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-mocha flex items-center justify-center text-gold relative overflow-hidden shadow-2xl border border-gold/20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* SVG Circular Text */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-3 scale-110">
              <path
                id="circlePath"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="none"
              />
              <text className="text-[9px] uppercase font-black tracking-[0.25em] fill-gold-light/90">
                <textPath xlinkHref="#circlePath">
                  LET'S TALK EVENTS ✦ LET'S TALK EVENTS ✦ 
                </textPath>
              </text>
            </svg>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <div className="w-1 h-1 rounded-full bg-gold-light mb-1" />
              <motion.span 
                className="text-xl font-light"
                animate={{ y: [0, -3, 0], x: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ↘
              </motion.span>
            </div>
          </motion.div>
          
          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-full bg-gold/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </Link>
      </div>
    </section>
  );
}
