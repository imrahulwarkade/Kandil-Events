import { SectionLabel } from "@/src/components/SectionLabel";

/**
 * Shared gallery section header (title + optional desktop blurb).
 */
export function GalleryIntro() {
  return (
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
      <div className="hidden max-w-xs text-right md:block">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Selected Work</p>
        <p className="text-[11px] font-light uppercase leading-relaxed tracking-widest text-cream/50">
          A journey through our most <br /> distinguished celebrations.
        </p>
      </div>
    </div>
  );
}
