import { cn } from "@/src/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function SectionLabel({ children, className, id }: Props) {
  return (
    <p
      id={id}
      className={cn(
        "mb-6 flex items-center gap-4 text-[10px] font-normal uppercase tracking-[0.35em] text-gold",
        className,
      )}
    >
      <span className="h-px w-[30px] bg-gold" aria-hidden />
      {children}
    </p>
  );
}
