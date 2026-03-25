"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface StickyCardProps {
  i: number;
  title: string;
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  children?: React.ReactNode;
}

export const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
  children,
}: StickyCardProps) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center pt-10 md:pt-20"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 30}px)`,
        }}
        className="relative min-h-[26rem] h-auto sm:h-auto md:h-124 w-full max-w-[1000px] overflow-hidden rounded-3xl bg-mocha shadow-2xl flex flex-col"
      >
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover opacity-20 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-linear-to-b from-dark/20 via-dark/80 to-dark" />
        </div>
        
        <div className="relative h-full w-full px-6 py-8 sm:px-10 sm:py-12 md:px-16 md:py-16 flex-1 flex flex-col">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
