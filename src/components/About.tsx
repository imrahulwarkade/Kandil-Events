import { AboutDesktop } from "./AboutDesktop";
import { AboutMobile } from "./AboutMobile";

/**
 * About: `AboutMobile` (&lt; md) stacked editorial layout; `AboutDesktop` (`md+`) collage + motion.
 */
export function About() {
  return (
    <section id="about" aria-label="About Kandil Events">
      <AboutMobile />
      <AboutDesktop />
    </section>
  );
}
