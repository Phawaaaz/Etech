import { Stagger, RevealItem } from "@/components/motion/Reveal";

const stats = [
  { value: "12,000+", label: "Active learners" },
  { value: "180+", label: "Topics covered" },
  { value: "4.9/5", label: "Average rating" },
  { value: "~28s", label: "To build a course" },
];

export default function StatsBand() {
  return (
    <section className="border-y py-14">
      <div className="mx-auto max-w-6xl px-6">
        <Stagger className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label} className="text-center">
              <div className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
