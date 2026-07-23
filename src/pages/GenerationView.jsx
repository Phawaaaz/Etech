import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GenerateButton from "@/components/ui/GenerateButton";

export default function GenerationView() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const format = location.state?.format;

  useEffect(() => {
    if (!format) {
      navigate("/dashboard", { replace: true });
    }
  }, [format, navigate]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    navigate("/select-topic", { state: { format, prompt } });
  };

  if (!format) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-3xl px-4 text-foreground">
      <form
        onSubmit={handleGenerate}
        className="w-full flex flex-col items-center gap-8"
      >
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Message E-A.I to generate ${format}...`}
            className="w-full bg-card border border-border text-foreground placeholder-muted-foreground/60 px-6 py-4.5 rounded-full text-xl font-semibold tracking-wide focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 pr-16 transition-all shadow-sm"
          />
        </div>
        <GenerateButton disabled={!prompt.trim()} />
      </form>
    </div>
  );
}
