import Image from "next/image";
import { SectionLabel } from "@/src/components/SectionLabel";

/**
 * Mobile About: same structure as desktop — collage + copy column — scaled for narrow viewports.
 */
export function AboutMobile() {
  return (
    <div className="bg-cream md:hidden px-[5%] py-[120px]">
      <div className="grid grid-cols-1 items-center gap-[100px]">
        {/* Same dual-image collage as desktop (scaled height) */}
        <div className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[440px]">
          <div className="absolute right-0 top-0 h-[80%] w-[75%] overflow-hidden rounded-[2px] bg-mocha/5">
            <Image
              src="/assets/about_01.png"
              alt="Luxury event curation by Kandil Events"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-mocha/20 to-transparent opacity-40" />
          </div>

          <div className="absolute bottom-0 left-0 z-10 h-[60%] w-[55%] overflow-hidden rounded-[2px] border-8 border-cream bg-mocha/5 shadow-2xl shadow-mocha/10">
            <Image
              src="/assets/about_02.png"
              alt="Bespoke event details"
              fill
              className="object-cover"
              sizes="55vw"
            />
          </div>

          <div className="absolute bottom-[20%] -right-1 z-20 max-w-[calc(100%-1rem)] bg-mocha px-5 py-4 text-[10px] font-light uppercase leading-snug tracking-[0.25em] text-cream sm:-right-3 sm:px-7 sm:text-[11px]">
            Bespoke Experiences
          </div>
        </div>

        <div>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="mb-6 font-serif text-[clamp(38px,10vw,52px)] font-light leading-[1.1] text-mocha">
            Where Vision
            <br />
            Meets <em className="italic text-rose">Reality</em>
          </h2>
          <p className="mb-10 text-[15px] font-light leading-[2] text-mocha/70">
            At Kandil Events, we believe every celebration deserves to be
            extraordinary. Born from a passion for elegance and a dedication to
            flawless execution, we transform your vision into moments that
            linger in memory long after the last guest has departed.
          </p>
          <p className="mb-10 text-[15px] font-light leading-[2] text-mocha/70">
            From the first consultation to the final flourish, our team of
            seasoned event architects handles every detail with meticulous care
            and artistry.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-gold/30 pt-12 sm:gap-12">
            <div>
              <span className="block font-serif text-4xl font-light leading-none text-mocha tabular-nums sm:text-5xl">
                40+
              </span>
              <span className="mt-2 block text-[9px] font-light uppercase tracking-[0.15em] text-gold sm:text-[10px] sm:tracking-[0.2em]">
                events
              </span>
            </div>
            <div>
              <span className="block font-serif text-4xl font-light leading-none text-mocha tabular-nums sm:text-5xl">
                2+
              </span>
              <span className="mt-2 block text-[9px] font-light uppercase leading-snug tracking-[0.15em] text-gold sm:text-[10px] sm:tracking-[0.2em]">
                yrs experience
              </span>
            </div>
            <div>
              <span className="block font-serif text-4xl font-light leading-none text-mocha tabular-nums sm:text-5xl">
                98%
              </span>
              <span className="mt-2 block text-[9px] font-light uppercase leading-snug tracking-[0.15em] text-gold sm:text-[10px] sm:tracking-[0.2em]">
                customer satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
