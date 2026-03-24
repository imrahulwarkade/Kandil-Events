import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

const MotionLink = motion.create(Link);

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonPrimary({ href, children, className }: Props) {
  return (
    <MotionLink
      href={href}
      className={cn(
        "relative inline-block overflow-hidden bg-mocha px-10 py-4 text-[11px] font-light uppercase tracking-[0.2em] text-cream",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        className,
      )}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{ rest: {}, hover: {} }}
    >
      <motion.span
        className="absolute inset-0 bg-gold"
        variants={{
          rest: { x: "-101%" },
          hover: { x: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </MotionLink>
  );
}
