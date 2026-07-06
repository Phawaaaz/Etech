import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import GenerateButton from "../components/GenerateButton";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  
  // Loading states
  const [discovering, setDiscovering] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  // Recommendations data
  const [recommendations, setRecommendations] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [customTopic, setCustomTopic] = useState("");

  const handleDiscover = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !level) return;

    setDiscovering(true);
    setRecommendations(null);
    setSelectedTopic(null);

    try {
      const data = await apiFetch("/courses/discover", {
        method: "POST",
        body: JSON.stringify({ subject, level }),
      });
      if (data.success) {
        setRecommendations(data.data.courses);
      }
    } catch (err) {
      alert(err.message || "Failed to discover courses. Please try again.");
    } finally {
      setDiscovering(false);
    }
  };

  const handleGenerate = async () => {
    const topic = selectedTopic === "custom" ? customTopic : selectedTopic;
    if (!topic || !topic.trim()) return;

    setGenerating(true);
    setGenProgress(10);
    
    // Simulate active generation progress bar
    const interval = setInterval(() => {
      setGenProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 600);

    try {
      const data = await apiFetch("/courses/generate", {
        method: "POST",
        body: JSON.stringify({ subject, topic, level }),
      });
      clearInterval(interval);
      setGenProgress(100);
      
      if (data.success && data.data.course) {
        navigate(`/course-index/${data.data.course.id}`);
      }
    } catch (err) {
      clearInterval(interval);
      alert(err.message || "Failed to generate course index.");
      setGenerating(false);
    }
  };

  if (generating) {
    return (
      <div className="w-full max-w-3xl flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <div className="relative w-40 h-40 mb-8">
          <div className="absolute inset-0 border-4 border-zinc-200 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-indigo-600 rounded-full animate-spin"
            style={{ borderTopColor: "transparent", animationDuration: "1.5s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-indigo-600">{genProgress}%</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-zinc-800 mb-2 animate-pulse">Designing Curriculum</h2>
        <p className="text-zinc-500 text-lg font-medium max-w-md italic">
          Building sections, lessons structure, learning objectives, and custom worked examples...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center text-zinc-900 dark:text-white">
        Create New Course
      </h1>

      {/* Discovery Form */}
      <form onSubmit={handleDiscover} className="w-full max-w-3xl flex flex-col items-center mb-10">
        <div className="w-full bg-white dark:bg-zinc-800 text-black dark:text-white px-6 py-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center shadow-lg border border-zinc-200 dark:border-zinc-700 mb-6">
          <div className="flex-1 w-full flex items-center">
            <label className="text-lg font-bold mr-3 text-zinc-600 dark:text-zinc-350 shrink-0">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. World History, Quantum Physics, Finance..."
              className="w-full bg-transparent text-lg font-semibold focus:outline-none placeholder-zinc-400"
            />
          </div>
          <div className="h-px md:h-8 w-full md:w-px bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex-1 w-full flex items-center relative">
            <label className="text-lg font-bold mr-3 text-zinc-600 dark:text-zinc-350 shrink-0">Level:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-transparent text-lg font-semibold focus:outline-none cursor-pointer pr-10 appearance-none text-zinc-900 dark:text-white"
            >
              <option value="" disabled hidden>Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <div className="absolute right-2 pointer-events-none text-xl font-black text-zinc-400">
              &#9660;
            </div>
          </div>
        </div>

        <GenerateButton disabled={!subject.trim() || !level || discovering} label={discovering ? "Finding..." : "Recommend Topics"} />
      </form>

      {/* Recommended Topics */}
      {recommendations && (
        <div className="w-full flex flex-col items-center bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 rounded-3xl p-6 md:p-8 shadow-xl mb-12">
          <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 w-full text-left">
            Choose a Course Title
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTopic(rec.title)}
                className={`p-5 rounded-2xl border cursor-pointer text-left transition-all ${
                  selectedTopic === rec.title
                    ? "bg-indigo-50/80 border-indigo-500 dark:bg-indigo-950/20 dark:border-indigo-500 scale-[1.01]"
                    : "bg-white dark:bg-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:scale-[1.01]"
                }`}
              >
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <span className="h-6 w-6 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-extrabold text-zinc-900 dark:text-white text-base md:text-lg flex-1 truncate ml-1">
                    {rec.title}
                  </h4>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400 px-2 py-0.5 rounded">
                    {rec.estimatedHours}h
                  </span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-3">
                  {rec.description}
                </p>
                {rec.tags && rec.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {rec.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-3xs md:text-2xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-450">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Custom Option */}
            <div
              onClick={() => setSelectedTopic("custom")}
              className={`p-5 rounded-2xl border cursor-pointer text-left transition-all col-span-1 md:col-span-2 ${
                selectedTopic === "custom"
                  ? "bg-indigo-50/80 border-indigo-500 dark:bg-indigo-950/20 dark:border-indigo-500"
                  : "bg-white dark:bg-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="h-6 w-6 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center">
                  C
                </span>
                <h4 className="font-extrabold text-zinc-900 dark:text-white text-lg">
                  Or enter your own custom topic
                </h4>
              </div>
              {selectedTopic === "custom" && (
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Enter custom course topic..."
                  className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2 mt-3 focus:outline-none text-zinc-900 dark:text-white font-semibold shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedTopic || (selectedTopic === "custom" && !customTopic.trim())}
            className={`px-12 py-3.5 rounded-full font-bold text-xl transition-all shadow-md active:scale-95 ${
              !selectedTopic || (selectedTopic === "custom" && !customTopic.trim())
                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105"
            }`}
          >
            Generate Course Index
          </button>
        </div>
      )}
    </div>
  );
}
