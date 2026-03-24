import dynamic from "next/dynamic";
import { About } from "@/src/components/About";
import { Contact } from "@/src/components/Contact";
import { Cursor } from "@/src/components/Cursor";
import { Footer } from "@/src/components/Footer";
import { Hero } from "@/src/components/Hero";
import { Marquee } from "@/src/components/Marquee";
import { Navbar } from "@/src/components/Navbar";
import { Services } from "@/src/components/Services";

const Gallery = dynamic(
  () => import("@/src/components/Gallery").then((m) => ({ default: m.Gallery })),
  {
    loading: () => (
      <div
        className="min-h-[320px] bg-cream px-[60px] py-[120px]"
        aria-hidden
      />
    ),
  },
);

const Testimonials = dynamic(
  () =>
    import("@/src/components/Testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  {
    loading: () => (
      <div
        className="min-h-[320px] bg-cream px-[60px] py-[120px]"
        aria-hidden
      />
    ),
  },
);

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
