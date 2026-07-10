import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GenerateButton from "@/components/ui/GenerateButton";

export default function TopicSelectionView() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { format, prompt } = location.state || {};

  useEffect(() => {
    if (!format || !prompt) {
      navigate("/dashboard", { replace: true });
    }
  }, [format, prompt, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || !level) return;
    navigate("/result", { state: { format, prompt, topic, level } });
  };

  if (!format || !prompt) return null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-3xl px-4">
      <div className="w-full bg-card text-foreground h-[52px] px-6 rounded-full flex items-center shadow-sm border border-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all mb-8">
        <label className="text-base font-bold mr-3 select-none text-muted-foreground shrink-0">Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Quantum Physics, French Revolution..."
          className="w-full bg-transparent text-base font-semibold focus:outline-none placeholder-muted-foreground/60 text-foreground"
        />
      </div>

      <div className="w-full bg-card text-foreground h-[52px] px-6 rounded-full flex items-center relative shadow-sm border border-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all mb-10">
        <label className="text-base font-bold mr-3 select-none text-muted-foreground shrink-0">Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full bg-transparent text-base font-semibold focus:outline-none cursor-pointer pr-10 appearance-none text-foreground"
        >
          <option value="" disabled hidden>Select difficulty level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <div className="absolute right-6 pointer-events-none text-lg font-black text-zinc-400">
          &#9660;
        </div>
      </div>

      <GenerateButton disabled={!topic.trim() || !level} />
    </form>
  );
}
