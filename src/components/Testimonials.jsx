import { Star } from "lucide-react";
import SectionHeading from "./landing/SectionHeading";
import { Stagger, RevealItem } from "./motion/Reveal";

const testimonials = [
  {
    quote:
      "I needed to understand financial modeling for a new role. Etech built a course around exactly that in seconds — and it stuck.",
    name: "Amara Okafor",
    role: "Product Manager, fintech",
    initials: "AO",
    color: "#2563eb",
  },
  {
    quote:
      "The quizzes and projects are what set it apart. It's the first time online learning felt built for someone with a full-time job.",
    name: "Daniel Reyes",
    role: "Backend Engineer",
    initials: "DR",
    color: "#111114",
  },
  {
    quote:
      "I've generated courses on everything from statistics to public speaking. The structure is genuinely better than most paid courses.",
    name: "Priya Sharma",
    role: "Data Analyst",
    initials: "PS",
    color: "#6b6b73",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Loved by learners"
          title="Professionals who stopped putting off learning"
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-0.5 text-foreground">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-foreground" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/85">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span
                  className="grid size-9 place-items-center rounded-full text-xs font-semibold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
