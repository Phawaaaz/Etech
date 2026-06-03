import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GenerationView() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;

    body.style.backgroundColor = "#FFFFFF";

    return () => {
      body.style.backgroundColor = "";
    };
  }, []);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    console.log("Triggering generation engine with prompt:", prompt);
    navigate("/select-topic");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl px-4 text-zinc-900">
      <form
        onSubmit={handleGenerate}
        className="w-full flex flex-col items-center gap-8"
      >
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Message E-A.I"
            className="w-full bg-[#5C5E62] text-zinc-900 placeholder-black/60 px-6 py-4 rounded-full text-xl font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-400 pr-16 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={!prompt.trim()}
          className={`px-12 py-3 rounded-full font-bold text-xl border border-transparent transition-all duration-300
            ${
              !prompt.trim()
                ? "bg-black text-zinc-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-zinc-900 shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:scale-105 cursor-pointer"
            }`}
        >
          Generate
        </button>
      </form>
    </div>
  );
}
