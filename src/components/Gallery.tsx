import { GalleryDesktop } from "./GalleryDesktop";
import { GalleryIntro } from "./GalleryIntro";
import { GalleryMobile } from "./GalleryMobile";

/**
 * Gallery: `GalleryMobile` (&lt; md) stacked cards; `GalleryDesktop` (`md+`) accordion.
 */
export function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-mocha px-[5%] py-20 md:px-[7%] lg:py-32"
      aria-labelledby="gallery-heading"
    >
      <GalleryIntro />
      <GalleryDesktop />
      <GalleryMobile />
    </section>
  );
}
