import steps from "../data/howItWorkSteps";
import SectionHeading from "./landing/SectionHeading";
import { Stagger, RevealItem } from "./motion/Reveal";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to a course that fits you"
          subtitle="No syllabus to plan and no content to hunt down. Tell Etech what you want, and start learning."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <RevealItem
                key={step.num}
                className="relative rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <span className="font-display text-sm font-semibold text-muted-foreground/60">
                    {step.num}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
