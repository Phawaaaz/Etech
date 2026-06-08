import { useState } from "react";
import GenerateButton from "../components/GenerateButton";

export default function TopicSelectionView() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");

  return (
    <form className="flex flex-col items-center w-full max-w-3xl px-4">
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

      <GenerateButton disabled={!topic.trim() || !level} />
    </form>
  );
}
