import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Star,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1];
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay: i * 0.06 },
  }),
};

const modules = [
  { name: "What machine learning really is", time: "12 min", done: true },
  { name: "Supervised vs. unsupervised", time: "18 min", done: true },
  { name: "Training your first model", time: "25 min", done: false },
  { name: "Evaluating & avoiding overfitting", time: "20 min", locked: true },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");

  const handleStart = () => {
    if (topic.trim()) {
      sessionStorage.setItem("pending_topic", topic.trim());
    }
    navigate("/create-course");
  };

  return (
    <section className="relative overflow-hidden pt-[96px] pb-[120px]">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div initial="hidden" animate="show">

          <motion.h1
            variants={rise}
            custom={1}
            className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.03] tracking-tight text-foreground sm:text-6xl"
          >
            Learn anything, properly.
          </motion.h1>

          <motion.p
            variants={rise}
            custom={2}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Etech transforms any topic into a complete, structured course with lessons, diagrams, quizzes, and hands-on projects tailored to your knowledge level and learning schedule.
          </motion.p>

          <motion.div
            variants={rise}
            custom={3}
            className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row"
          >
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="e.g. Financial modeling"
              className="h-[52px] w-full rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground placeholder-muted-foreground/70 outline-none transition-all focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/10"
            />
            <button
              onClick={handleStart}
              className="group inline-flex h-[52px] w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-250 hover:bg-primary/95 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:w-auto cursor-pointer"
            >
              Start free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          <motion.div
            variants={rise}
            custom={4}
            className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {["#2563eb", "#111114", "#6b6b73", "#93b4f5"].map((c) => (
                <span
                  key={c}
                  className="size-6 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-foreground text-foreground" />
              <span className="font-medium text-foreground">4.9</span>
            </span>
            <span className="text-muted-foreground/70">·</span>
            <span>12,000+ learners</span>
          </motion.div>
        </motion.div>
      </div>

      {/* product preview */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.3 }}
        className="mx-auto mt-14 max-w-3xl px-6"
      >
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-3">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="mx-auto rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
              etech.app/course
            </span>
          </div>
          <div className="p-6 text-left sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-brand">
                  <Sparkles className="size-3.5" /> Generated in 28s
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Machine Learning Foundations
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Beginner · 8 modules · ~2 hours
                </p>
              </div>
              <span className="hidden rounded-lg bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground sm:block">
                50% complete
              </span>
            </div>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-1/2 rounded-full bg-brand" />
            </div>

            <ul className="mt-5 flex flex-col gap-1">
              {modules.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary/60"
                >
                  <span
                    className={
                      m.done
                        ? "text-brand"
                        : m.locked
                          ? "text-muted-foreground/50"
                          : "text-foreground"
                    }
                  >
                    {m.done ? (
                      <CheckCircle2 className="size-5" />
                    ) : m.locked ? (
                      <Lock className="size-5" />
                    ) : (
                      <BookOpen className="size-5" />
                    )}
                  </span>
                  <span
                    className={`flex-1 text-sm ${m.locked ? "text-muted-foreground" : "font-medium text-foreground"}`}
                  >
                    {m.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{m.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
