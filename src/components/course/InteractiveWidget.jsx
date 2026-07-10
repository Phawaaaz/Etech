import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, Wand2 } from "lucide-react";

const prompts = ["Python basics", "Intro to Calculus", "Accounting 101"];

const selectClass =
  "w-full appearance-none rounded-xl border border-border bg-background px-3.5 py-2.5 pr-9 text-sm font-medium text-foreground outline-none transition-colors hover:border-muted-foreground/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="pl-0.5 text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative">
        {children}
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </label>
  );
}

export default function InteractiveWidget() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const submit = () => topic.trim() && navigate("/select-topic");

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-[0_1px_0_rgba(20,17,14,0.03),0_18px_40px_-24px_rgba(20,17,14,0.25)]">
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-4">
        <span className="grid size-7 place-items-center rounded-md bg-accent text-primary">
          <Wand2 className="size-4" strokeWidth={2} />
        </span>
        <span className="text-sm font-semibold text-foreground">Course generator</span>
        <span className="ml-auto text-xs font-medium text-muted-foreground">~30s</span>
      </div>

      <div className="relative mb-4 flex items-center">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="What do you want to learn?"
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 pr-14 text-sm font-medium text-foreground placeholder-muted-foreground/70 outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15"
        />
        <button
          onClick={submit}
          aria-label="Generate course"
          className="absolute right-2 grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-[#164630] active:translate-y-px"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <Field label="Level">
          <select className={selectClass}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </Field>
        <Field label="Duration">
          <select className={selectClass}>
            <option>30–45 mins</option>
            <option>1–2 hours</option>
            <option>Full course</option>
          </select>
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Try:</span>
        {prompts.map((text) => (
          <button
            key={text}
            onClick={() => setTopic(text)}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
