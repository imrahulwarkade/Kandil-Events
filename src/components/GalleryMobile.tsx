"use client";

import Image from "next/image";
import { galleryItems } from "@/src/lib/data";

/**
 * Below `md`: horizontally scrollable cards + CTA.
 */
export function GalleryMobile() {
  return (
    <div className="flex flex-col md:hidden overflow-hidden">
      <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="relative h-[400px] w-[85vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-mocha/5"
          >
            <Image src={item.imageSrc} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/20 to-transparent p-6">
              <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {item.location}
              </span>
              <p className="whitespace-pre-line font-serif text-[28px] font-light leading-tight text-cream">
                {item.title.split("@").join("\n@")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 mx-auto px-10 border border-cream/10 py-5 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-cream/70 transition-colors hover:bg-cream hover:text-dark"
      >
        View All Portfolio
      </button>
    </div>
  );
}
