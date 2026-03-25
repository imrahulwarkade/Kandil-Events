import Image from "next/image";

/**
 * Mobile-only hero: stacked image + sheet layout (no WebGL, no fluid effects).
 * Shown below `md` via parent wrapper (`md:hidden`).
 */
export function HeroMobile() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col bg-[#F5F0E8] md:hidden">
      <div className="relative h-[min(46vh,420px)] w-full shrink-0">
        <Image
          src="/assets/background_hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-[#F5F0E8]/20 to-transparent" />
      </div>

      <div className="relative z-10 -mt-10 flex flex-1 flex-col rounded-t-[28px] bg-[#FEFAF6] px-6 pb-12 pt-10 shadow-[0_-12px_40px_rgba(44,42,40,0.08)]">
        <div className="mx-auto mb-8 h-px w-12 bg-[#D4AF37]" aria-hidden />
        <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
          Crafting Unforgettable Moments
        </p>
        <h1 className="mb-6 text-center font-serif text-[2.65rem] font-light leading-[1.08] tracking-tight text-[#2C2A28]">
          Events <span className="italic text-[#D4AF37]">Told</span>
          <br />
          in Gold.
        </h1>
        <p className="mx-auto mb-10 max-w-md text-center text-[15px] font-light leading-[1.65] text-[#2C2A28]/80">
          Kandil Events orchestrates bespoke celebrations — from grand weddings and
          elegant corporate galas to intimate cultural ceremonies. Every detail, a
          masterpiece.
        </p>
        <div className="mt-auto flex w-full flex-col gap-3">
          <button
            type="button"
            className="w-full px-8 py-4 bg-[#D4AF37] text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#b5952f]"
          >
            Begin Your Story
          </button>
          <button
            type="button"
            className="w-full border border-[#2C2A28]/25 bg-transparent px-8 py-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#2C2A28] transition-colors hover:border-[#2C2A28]/50 hover:bg-[#2C2A28]/5"
          >
            View Our Work
          </button>
        </div>
      </div>

      {/* <div className="pointer-events-none flex flex-col items-center gap-3 pb-8 pt-2 text-[10px] uppercase tracking-[0.3em] text-[#2C2A28]/50">
        <span>Scroll to explore</span>
        <div className="h-12 w-px bg-[#2C2A28]/15" />
      </div> */}
    </section>
  );
}
