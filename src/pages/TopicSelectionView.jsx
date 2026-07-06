import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateButton from "../components/GenerateButton";
import { useEtech } from "../context/EtechContext";
import { mockGenerate } from "../services/mockApi";

export default function TopicSelectionView() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const { wizardData, updateWizard, setResult, setLoading } = useEtech();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim() || !level) return;
    updateWizard({ topic, level });
    setLoading(true);
    navigate("/result");
    const res = await mockGenerate({ ...wizardData, topic, level });
    setResult(res);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-3xl px-4">
      <div className="w-full bg-white text-black px-6 py-4 rounded-full flex items-center shadow-lg mb-10 border border-gray-100">
        <label className="text-xl font-bold mr-3 select-none text-zinc-700">Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Quantum Physics, French Revolution..."
          className="w-full bg-transparent text-xl font-medium focus:outline-none text-zinc-900 placeholder-zinc-400"
        />
      </div>

      <div className="w-full bg-white text-black px-6 py-4 rounded-full flex items-center relative shadow-lg mb-12 border border-gray-100">
        <label className="text-xl font-bold mr-3 select-none text-zinc-700">Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full bg-transparent text-xl font-medium focus:outline-none cursor-pointer pr-10 appearance-none text-zinc-900"
        >
          <option value="" disabled hidden>Select difficulty level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <div className="absolute right-6 pointer-events-none text-2xl font-black text-zinc-600">
          &#9660;
        </div>
      </div>

      <GenerateButton disabled={!topic.trim() || !level} type="submit" />
    </form>
  );
}
