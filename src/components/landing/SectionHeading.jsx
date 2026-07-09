import { cn } from "@/lib/utils";
import Reveal from "../motion/Reveal";

export function Eyebrow({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2.6rem] sm:leading-[1.08]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </Reveal>
  );
}
