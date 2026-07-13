import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16 sm:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-primary-foreground sm:text-[2.6rem] sm:leading-[1.1]">
            Start learning anything, today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-foreground/70">
            Generate your first course in under a minute. No credit card, no
            commitment — just start.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/sign-up")}
              className="group inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get started free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl border border-primary-foreground/20 px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Log in
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
