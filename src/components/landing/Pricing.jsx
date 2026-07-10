import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to start learning.",
    cta: "Start free",
    featured: false,
    features: [
      "3 generated courses / month",
      "Lessons, quizzes and diagrams",
      "Progress tracking",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    desc: "For serious, continuous upskilling.",
    cta: "Start 7-day trial",
    featured: true,
    features: [
      "Unlimited courses",
      "Hands-on projects & certificates",
      "Spaced review scheduling",
      "Priority course generation",
    ],
  },
  {
    name: "Team",
    price: "$9",
    period: "per seat / month",
    desc: "Keep your whole team learning.",
    cta: "Contact sales",
    featured: false,
    features: [
      "Everything in Pro",
      "Shared course library",
      "Team analytics dashboard",
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="border-t border-border bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing that scales with you"
          subtitle="Start free. Upgrade when you're ready to go deeper. Cancel anytime."
        />

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <RevealItem
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-7 ${
                plan.featured
                  ? "border-primary shadow-[0_20px_50px_-28px_rgba(10,10,11,0.35)]"
                  : "border-border"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <button
                onClick={() => navigate("/sign-up")}
                className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-medium transition-colors ${
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
