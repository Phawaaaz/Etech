import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateButton from "../components/GenerateButton";
import { useEtech } from "../context/EtechContext";

export default function GenerationView() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const { wizardData, updateWizard } = useEtech();
  const format = wizardData.format;

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    updateWizard({ prompt });
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
            placeholder={format ? `Message E-A.I to generate ${format}...` : "Message E-A.I"}
            className="w-full bg-[#5C5E62] text-white placeholder-white/60 px-6 py-4 rounded-full text-xl font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-400 pr-16 transition-all shadow-md"
          />
        </div>
        <GenerateButton disabled={!prompt.trim()} />
      </form>
    </div>
  );
}
