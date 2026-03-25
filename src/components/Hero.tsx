import { HeroDesktop } from "./HeroDesktop";
import { HeroMobile } from "./HeroMobile";

/**
 * Responsive split: `HeroMobile` (&lt; md) and `HeroDesktop` (md+).
 * No WebGL / HeroFluid — backgrounds use static imagery only.
 */
export function Hero() {
  return (
    <>
      <HeroMobile />
      <HeroDesktop />
    </>
  );
}
