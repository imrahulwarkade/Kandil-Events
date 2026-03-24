import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-8 bg-dark px-[60px] py-12 md:flex-row">
      <div className="flex items-center gap-3 font-serif text-lg font-light uppercase tracking-[0.25em] text-gold">
        <Image
          src="/assets/logo-transparent.png"
          alt="Kandil Events"
          width={180}
          height={120}
          loading="lazy"
          className="h-[120px] w-auto object-contain"
          style={{ width: "auto" }}
          sizes="180px"
        />
      </div>
      <p className="text-center text-[11px] font-light tracking-[0.15em] text-cream/30">
        © {new Date().getFullYear()} Kandil Events. All rights reserved.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <Link
          href="https://instagram.com/kandil.events"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-gold focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Instagram
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
          Pinterest
        </span>
        <Link
          href="https://wa.me/918088258050"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-gold focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          WhatsApp
        </Link>
      </div>
    </footer>
  );
}
