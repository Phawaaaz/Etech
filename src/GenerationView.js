import { useState } from "react";
import arrowRightIcon from "./assets/arrow-right.svg"; // Make sure to export/import your arrow asset

export default function GenerationView({ onBack }) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    console.log("Triggering generation engine with prompt:", prompt);
    // Add your backend API connection string or pipeline invocation here
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4 animate-fadeIn">
      <button
        onClick={onBack}
        className="text-gray-400 text-sm hover:text-white mb-6 transition-colors"
      >
        ← Change Option
      </button>

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
            className="w-full bg-[#5C5E62] text-white placeholder-black/60 px-6 py-4 rounded-full text-lg font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-400 pr-14 transition-all"
          />
          <button
            type="submit"
            className="absolute right-5 p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <img src={arrowRightIcon} alt="Send" className="w-5 h-5 invert" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!prompt.trim()}
          className={`px-10 py-3 rounded-full font-bold text-lg border border-transparent transition-all duration-300
            ${
              !prompt.trim()
                ? "bg-black/40 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 cursor-pointer"
            }`}
        >
          Generate
        </button>
      </form>
    </div>
  );
}
