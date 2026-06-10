import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TopicSelectionView() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const handleFinalGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim() || !level) return;

    console.log("Handing parameters over to AI pipeline engine...", {
      topic,
      level,
    });
    navigate("/loading");
  };

  return (
    <form
      onSubmit={handleFinalGenerate}
      className="flex flex-col items-center w-full max-w-2xl px-4 text-zinc-900"
    >
      <div className="w-full bg-white text-black px-6 py-4 rounded-full flex items-center shadow-lg mb-20">
        <label className="text-xl font-bold mr-3 select-none">Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-transparent text-xl font-medium focus:outline-none"
        />
      </div>
      <div className="w-full bg-white text-black px-6 py-4 rounded-full flex items-center relative shadow-lg mb-20">
        <label className="text-xl font-bold mr-3 select-none">Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full bg-transparent text-xl font-medium focus:outline-none cursor-pointer pr-10 appearance-none"
        >
          <option value="" disabled hidden></option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <div className="absolute right-6 pointer-events-none text-2xl font-black">
          &#9660;
        </div>
      </div>

      <button
        type="submit"
        disabled={!topic.trim() || !level}
        className={`px-12 py-3 rounded-full font-bold text-xl border border-transparent transition-all duration-300
            ${
              !topic.trim() || !level
                ? "bg-black text-zinc-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-zinc-900 shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:scale-105 cursor-pointer"
            }`}
      >
        Generate
      </button>
    </form>
  );
}
