import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GenerateButton from "../components/GenerateButton";

export default function TopicSelectionView() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer);
            return 100;
          }

          const diff = Math.floor(Math.random() * 12) + 6;
          return Math.min(oldProgress + diff, 100);
        });
      }, 180);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading]);

  useEffect(() => {
    if (progress === 100) {
      console.log("Generation process completed. Ready to redirect.");

      // Once complete, route to your final generation output screen here:
      navigate("/course-index");
    }
  }, [progress, navigate]);

  const handleFinalGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim() || !level) return;

    console.log("Initializing generation context pipeline data:", {
      topic,
      level,
    });
    // Fires the dynamic layout interface overlay element on the spot
    setIsLoading(true);
  };

  return (
    <>
      <form
        onSubmit={handleFinalGenerate}
        className="flex flex-col items-center w-full max-w-3xl px-4"
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

        <GenerateButton disabled={!topic.trim() || !level} />
      </form>

      {isLoading && (
        <div className="fixed inset-0 bg-[#040814] flex flex-col items-center justify-center font-sans p-6 z-50">
          <div className="w-full max-w-2xl flex flex-col items-center">
            <h1 className="text-6xl md:text-7xl font-black tracking-widest text-white mb-16 select-none">
              E-A.I
            </h1>

            <p className="text-gray-300 text-lg font-medium mb-4 tracking-wider select-none">
              Loading...
            </p>

            <div className="w-full flex items-center gap-6">
              <div className="flex-1 border-2 border-white rounded-md p-1 h-12 flex items-center overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="bg-white h-full rounded-sm transition-all duration-300 ease-out"
                />
              </div>

              <span className="text-xl md:text-2xl font-black text-white min-w-[3.5rem] text-left tabular-nums tracking-wider">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
