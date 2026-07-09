import features from "../data/features";
import SectionHeading from "./landing/SectionHeading";
import { Stagger, RevealItem } from "./motion/Reveal";

export default function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What's inside"
          title="Everything a real course needs"
          subtitle="Not a wall of text. Every course comes with the full learning experience built around your topic."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <RevealItem
                key={feat.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(10,10,11,0.25)]"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feat.desc}
                </p>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
