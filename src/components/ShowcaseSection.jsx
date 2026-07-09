import { motion } from "framer-motion";
import {
  Check,
  CalendarClock,
  Target,
  Briefcase,
  Network,
  ClipboardCheck,
  RefreshCw,
} from "lucide-react";
import { Eyebrow } from "./landing/SectionHeading";
import Reveal from "./motion/Reveal";

const ease = [0.16, 1, 0.3, 1];

function Bullets({ items }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <span className="text-[15px] text-foreground/80">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function VisualCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="rounded-2xl border border-border bg-card p-6 shadow-[0_2px_4px_rgba(10,10,11,0.02),0_20px_50px_-30px_rgba(10,10,11,0.25)]"
    >
      {children}
    </motion.div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6">
        {/* Row 1 — built for working adults */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Made for professionals</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2.4rem] sm:leading-[1.1]">
              Built for how busy adults actually learn
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              No filler, no 40-hour marathons. Just the path from where you are
              to what you need — sized to the time you have.
            </p>
            <Bullets
              items={[
                "Set your level and time — from 30 minutes to a full course",
                "Practical, job-relevant projects instead of busywork",
                "Pick up exactly where you left off, on any device",
              ]}
            />
          </Reveal>

          <VisualCard>
            <div className="flex flex-col gap-3">
              {[
                { icon: CalendarClock, label: "Fits your schedule", meta: "3× 40 min / week" },
                { icon: Target, label: "Goal-oriented", meta: "Job-ready in 3 weeks" },
                { icon: Briefcase, label: "Real projects", meta: "Portfolio-ready" },
              ].map(({ icon: Icon, label, meta }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-xl border border-border px-4 py-3.5"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-secondary text-foreground">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">{meta}</span>
                </div>
              ))}
            </div>
          </VisualCard>
        </div>

        {/* Row 2 — understand, don't memorize */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <VisualCard>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Network, label: "Concept maps", tint: true },
                { icon: ClipboardCheck, label: "Instant quizzes" },
                { icon: RefreshCw, label: "Spaced review" },
                { icon: Target, label: "Checkpoints", tint: true },
              ].map(({ icon: Icon, label, tint }) => (
                <div
                  key={label}
                  className={`flex flex-col gap-3 rounded-xl border border-border p-4 ${tint ? "bg-accent/60" : ""}`}
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="size-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </VisualCard>

          <Reveal className="lg:order-first">
            <Eyebrow>Retention, not cramming</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2.4rem] sm:leading-[1.1]">
              Understand it — don't just memorize it
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every course is built to make ideas stick: visual explanations,
              quick checks for understanding, and review that brings concepts
              back right before you'd forget them.
            </p>
            <Bullets
              items={[
                "Diagrams that turn abstract ideas into something you can see",
                "Short quizzes after each concept, not just at the end",
                "Spaced review scheduled around how memory actually works",
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
