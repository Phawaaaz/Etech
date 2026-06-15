import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InteractiveWidget() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  return (
    <div className="lg:col-span-7 flex justify-center relative top-40">
      <div className=" border border-purple-950/40 w-full max-w-xl p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col items-center gap-4 text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">
            What do you want to learn
          </h3>
          <p className="text-gray-400 text-sm">
            Describe your topic and get your lesson
          </p>
        </div>

        <div className="relative w-full flex items-center mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g. React for Beginners, 1 hour"
            className="w-full bg-white text-black placeholder-zinc-400 font-medium rounded-full px-5 py-3.5 pr-14 outline-none text-base shadow-inner"
          />
          <button
            onClick={() => topic.trim() && navigate("/select-topic")}
            className="absolute right-2 p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
          >
            ➔
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 pl-2 font-semibold">
              Level:
            </label>
            <select className="bg-black border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white font-medium outline-none">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 pl-2 font-semibold">
              Duration:
            </label>
            <select className="bg-black border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white font-medium outline-none">
              <option>30-45mins</option>
              <option>1-2 Hours</option>
              <option>Full Course</option>
            </select>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs text-gray-400">
          <span className="font-medium">Popular prompts:</span>
          {[
            "Python Basics",
            "Intro to Calculus",
            "Accounting for Beginners",
          ].map((text) => (
            <button
              key={text}
              onClick={() => setTopic(text)}
              className="bg-black/60 border border-zinc-800 hover:border-zinc-500 hover:text-white transition-all px-3 py-1 rounded-full font-medium"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
