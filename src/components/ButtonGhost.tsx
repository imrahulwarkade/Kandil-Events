import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

const MotionLink = motion.create(Link);

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonGhost({ href, children, className }: Props) {
  return (
    <MotionLink
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-light uppercase tracking-[0.2em] text-mocha",
        "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        className,
      )}
      initial="rest"
      whileHover="hover"
      variants={{ rest: {}, hover: {} }}
    >
      {children}
      <motion.span
        aria-hidden
        className="inline-block"
        variants={{
          rest: { x: 0 },
          hover: { x: 6 },
        }}
        transition={{ duration: 0.3 }}
      >
        →
      </motion.span>
    </MotionLink>
  );
}
