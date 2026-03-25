"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/src/components/SectionLabel";
import { testimonials, services } from "@/src/lib/data";
import { StickyCard_001 } from "@/src/components/v1/skiper16";

// Mapping service images to testimonials based on event type
const imageMap: Record<string, string> = {
  "Wedding": services[0].image,
  "Corporate": services[1].image,
  "Birthday": services[2].image,
};

export function Testimonials() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="testimonials"
      ref={container}
      className="relative flex w-full flex-col items-center bg-cream px-[5%]"
      aria-labelledby="testimonials-heading"
    >
      {/* Scrollable Header Placeholder */}
      <div className="flex h-[40vh] w-full flex-col items-center justify-center text-center">
        <SectionLabel className="mb-6">Voices of Trust</SectionLabel>
        <h2
          id="testimonials-heading"
          className="max-w-3xl font-serif text-[clamp(42px,5vw,68px)] font-light leading-[1.1] text-mocha"
        >
          What Our <em className="italic text-rose">Clients</em> Say
        </h2>
      </div>

      <div className="relative w-full max-w-7xl pb-[20vh]">
        {testimonials.map((t, i) => {
          const targetScale = Math.max(
            0.85,
            1 - (testimonials.length - i - 1) * 0.05,
          );
          
          const bgImageKey = Object.keys(imageMap).find((key) => 
            t.eventLabel.includes(key)
          );
          const bgImage = bgImageKey ? imageMap[bgImageKey] : services[0].image;

          return (
            <StickyCard_001
              key={t.id}
              i={i}
              title={t.authorName}
              src={bgImage}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-12 bg-gold/50" />
                    <div className="flex text-gold text-lg" aria-label={`${t.stars} out of 5 stars`}>
                      {"★".repeat(t.stars)}
                    </div>
                  </div>
                  <p className="font-serif text-[22px] md:text-[32px] lg:text-[42px] font-light italic leading-tight text-cream">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-cream/10 pt-6 md:pt-10">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-linear-to-br from-gold/20 to-gold/40 font-serif text-xl md:text-2xl text-gold backdrop-blur-md border border-gold/30">
                      {t.authorInitial}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg md:text-2xl font-light text-cream tracking-wide">
                        {t.authorName}
                      </h4>
                      <p className="mt-1 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                        {t.eventLabel}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block text-right">
                    <SectionLabel className="border-cream/20 text-cream opacity-50">Verified Celebration</SectionLabel>
                  </div>
                </div>
              </div>
            </StickyCard_001>
          );
        })}
      </div>
    </section>
  );
}
