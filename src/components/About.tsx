"use client";

import NumberFlow from "@number-flow/react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import Image from "next/image";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/src/components/SectionLabel";

const viewport = { once: true, amount: 0.12 as const };

function AnimatedAboutStats({
  className,
  ...motionProps
}: ComponentProps<typeof motion.div>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const count40 = useMotionValue(0);
  const count2 = useMotionValue(0);
  const count98 = useMotionValue(0);
  const [display40, setDisplay40] = useState(0);
  const [display2, setDisplay2] = useState(0);
  const [display98, setDisplay98] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const opts = {
      duration: 1.1,
      ease: "easeOut" as const,
    };

    const a40 = animate(count40, 40, {
      ...opts,
      onUpdate: (latest) => setDisplay40(Math.round(latest)),
    });
    const a2 = animate(count2, 2, {
      ...opts,
      delay: 0.08,
      onUpdate: (latest) => setDisplay2(Math.round(latest)),
    });
    const a98 = animate(count98, 98, {
      ...opts,
      delay: 0.16,
      onUpdate: (latest) => setDisplay98(Math.round(latest)),
    });

    return () => {
      a40.stop();
      a2.stop();
      a98.stop();
    };
  }, [inView, count40, count2, count98]);

  return (
    <motion.div ref={ref} className={className} {...motionProps}>
      <div>
        <span className="block font-serif text-5xl font-light leading-none text-mocha tabular-nums">
          <NumberFlow value={display40} suffix="+" />
        </span>
        <span className="mt-2 block text-[10px] font-light uppercase tracking-[0.2em] text-gold">
          events
        </span>
      </div>
      <div>
        <span className="block font-serif text-5xl font-light leading-none text-mocha tabular-nums">
          <NumberFlow value={display2} suffix="+" />
        </span>
        <span className="mt-2 block text-[10px] font-light uppercase tracking-[0.2em] text-gold">
          yrs experience
        </span>
      </div>
      <div>
        <span className="block font-serif text-5xl font-light leading-none text-mocha tabular-nums">
          <NumberFlow value={display98} suffix="%" />
        </span>
        <span className="mt-2 block text-[10px] font-light uppercase tracking-[0.2em] text-gold">
          customer satisfaction
        </span>
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="px-[5%] md:px-[7%] py-[120px]"
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 items-center gap-[100px] lg:grid-cols-2">
        <motion.div
          className="relative h-[620px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Image - Top Right */}
          <div className="absolute right-0 top-0 h-[80%] w-[75%] overflow-hidden rounded-[2px] bg-mocha/5">
            <Image
              src="/assets/about_01.png"
              alt="Luxury event curation by Kandil Events"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-linear-to-t from-mocha/20 to-transparent opacity-40" />
          </div>

          {/* Secondary Image - Bottom Left */}
          <div className="absolute bottom-0 left-0 z-10 h-[60%] w-[55%] overflow-hidden rounded-[2px] border-8 border-cream bg-mocha/5 shadow-2xl shadow-mocha/10">
            <Image
              src="/assets/about_02.png"
              alt="Bespoke event details"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* Floating Label */}
          <div className="absolute bottom-[20%] -right-5 z-20 hidden bg-mocha px-8 py-5 text-[11px] font-light uppercase tracking-[0.25em] text-cream lg:block">
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
          <AnimatedAboutStats
            className="mt-10 flex gap-12 border-t border-gold/30 pt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
}
