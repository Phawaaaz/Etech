import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";

const faqs = [
  {
    q: "How does Etech create a course?",
    a: "You describe a topic, your level and how much time you have. Etech structures a full course — lessons, diagrams, quizzes and projects — in around 30 seconds, then you can start learning right away.",
  },
  {
    q: "Is it actually good for professional topics?",
    a: "Yes. Etech is built for adults upskilling for work — from financial modeling to system design to public speaking. Courses focus on practical, job-relevant outcomes rather than filler.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Absolutely. Set a duration from 30 minutes to a full multi-week course, learn on any device, and pick up exactly where you left off. Spaced review helps you retain what you learn.",
  },
  {
    q: "Do I need to pay to start?",
    a: "No. The Free plan lets you generate courses and use lessons, quizzes and progress tracking. Upgrade to Pro only when you want unlimited courses, projects and certificates.",
  },
  {
    q: "Can I use Etech with my team?",
    a: "Yes. The Team plan adds a shared course library and analytics so you can keep everyone learning and see progress across the group.",
  },
];

function Item({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-foreground">{faq.q}</span>
        <Plus
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12">
          {faqs.map((faq, i) => (
            <Item
              key={faq.q}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
