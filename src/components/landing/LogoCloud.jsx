import Reveal from "@/components/motion/Reveal";

const companies = ["Google", "Stripe", "Notion", "Airbnb", "Figma", "Linear"];

export default function LogoCloud() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center text-sm text-muted-foreground">
          Professionals from leading teams learn on Etech
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {companies.map((c) => (
            <span
              key={c}
              className="font-display text-xl font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/60"
            >
              {c}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
