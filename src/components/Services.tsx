"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/src/components/SectionLabel";
import { services } from "@/src/lib/data";
import type { Service } from "@/src/types";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex min-w-[320px] flex-col overflow-hidden rounded-3xl bg-[#f0f9f6] md:min-w-100">
      {/* Image Container */}
      <div className="relative aspect-4/2 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {/* Badge on Image */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-dark/80">
            {service.badge}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex flex-1 flex-col p-4 pb-10">
        <h3 className="mb-4 font-serif text-[24px] font-bold leading-tight text-dark md:text-[28px]">
          {service.name}
        </h3>
        <p className="mb-8 text-[14px] leading-[1.6] text-dark/70">
          {service.description}
        </p>

        {/* Circular Arrow Button */}
        <Link
          href="/#contact"
          className="absolute bottom-10 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a4d3f] text-white transition-transform hover:scale-110"
        >
          <span className="text-xl -rotate-45">→</span>
        </Link>
      </div>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const scrollContainer = scrollRef.current;

      if (!section || !scrollContainer) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const totalWidth = scrollContainer.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollAmount = totalWidth - windowWidth + 200;

        gsap.to(scrollContainer, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top 80px", // Offset for fixed navbar
            end: () => `+=${scrollAmount}`,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from(".service-card-mobile", {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-cream px-[5%] md:px-[7%]  pb-20  lg:pb-20"
    >
      <div className="container-custom">
        <div className="mb-10 flex flex-col items-start justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-dark/20 px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-dark">
              Our Services
            </span>
            <h2 className="font-serif text-[clamp(40px,6vw,72px)] font-bold leading-none text-dark">
              Bespoke Event <br /> Experiences
            </h2>
          </div>
          
          {/* Decorative Dot */}
          <div className="relative mb-4 hidden h-3 w-3 rounded-full bg-blush opacity-50 lg:block lg:mb-6" />

          <div className="max-w-md">
            <p className="max-w-prose text-base leading-relaxed text-dark/70 lg:text-lg">
              From intimate nikah ceremonies to grand corporate galas—we craft
              events that reflect your unique story with timeless elegance and
              contemporary luxury.
            </p>
          </div>
        </div>

        {/* Desktop Horizontal Scroll */}
        <div className="hidden lg:block">
          <div ref={scrollRef} className="flex gap-8 px-8">
            {services.map((service) => (
              <ServiceCard key={service.num} service={service} />
            ))}
          </div>
        </div>

        {/* Mobile Vertical Stack */}
        <div className="flex flex-col gap-8 px-4 lg:hidden">
          {services.map((service) => (
            <div key={service.num} className="service-card-mobile">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
