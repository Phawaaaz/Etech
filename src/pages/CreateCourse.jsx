import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import GenerateButton from "@/components/ui/GenerateButton";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState(""); // Unified custom topic/title input
  const [level, setLevel] = useState("");
  
  // Loading states
  const [discovering, setDiscovering] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  useEffect(() => {
    const pending = sessionStorage.getItem("pending_topic");
    if (pending) {
      setTopic(pending);
      setSubject(pending);
      sessionStorage.removeItem("pending_topic");
    }
  }, []);

  // Recommendations data
  const [recommendations, setRecommendations] = useState(null);

  const handleDiscover = async (e) => {
    e?.preventDefault();
    if (!subject.trim() || !level) return;

    setDiscovering(true);
    setRecommendations(null);

    try {
      const data = await apiFetch("/courses/discover", {
        method: "POST",
        body: JSON.stringify({ subject, level }),
      });
      if (data.success) {
        setRecommendations(data.data.courses);
      }
    } catch (err) {
      alert(err.message || "Failed to discover course recommendations.");
    } finally {
      setDiscovering(false);
    }
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!subject.trim() || !topic.trim() || !level) return;

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
            className="absolute inset-0 border-4 border-primary rounded-full animate-spin"
            style={{ borderTopColor: "transparent", animationDuration: "1.5s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-primary">{genProgress}%</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-zinc-950 mb-2 animate-pulse">Designing Curriculum</h2>
        <p className="text-zinc-500 text-lg font-medium max-w-md italic">
          Building sections, lessons structure, learning objectives, and custom worked examples...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl px-4 flex flex-col items-center select-text">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center text-zinc-950">
        Create New Course
      </h1>

      {/* Main Form */}
      <form onSubmit={handleGenerate} className="w-full max-w-3xl flex flex-col items-center mb-10 gap-6">
        <div className="w-full bg-card text-foreground px-6 py-5 rounded-3xl flex flex-col gap-5 shadow-sm border border-border">
          
          {/* Subject Input */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2 border-b border-border/60 pb-4">
            <label className="text-lg font-bold text-muted-foreground shrink-0 md:w-32 text-left">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Computer Science, World History, Finance..."
              className="w-full bg-transparent text-lg font-semibold focus:outline-none placeholder-zinc-400 text-foreground"
              required
            />
          </div>

          {/* Specific Course Title Input */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2 border-b border-border/60 pb-4">
            <label className="text-lg font-bold text-muted-foreground shrink-0 md:w-32 text-left">Course Title:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Intro to React Hooks, Rise of French Empire..."
              className="w-full bg-transparent text-lg font-semibold focus:outline-none placeholder-zinc-400 text-foreground"
              required
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2 relative">
            <label className="text-lg font-bold text-muted-foreground shrink-0 md:w-32 text-left">Level:</label>
            <div className="flex-1 w-full relative flex items-center">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-transparent text-lg font-semibold focus:outline-none cursor-pointer pr-10 appearance-none text-foreground"
                required
              >
                <option value="" disabled hidden>Select difficulty level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <div className="absolute right-2 pointer-events-none text-xl font-black text-zinc-400">
                &#9660;
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
          {/* Main Action Button */}
          <GenerateButton
            disabled={!subject.trim() || !topic.trim() || !level}
            label="Generate Course"
          />

          {/* Recommendation Helper Trigger */}
          <button
            type="button"
            onClick={handleDiscover}
            disabled={!subject.trim() || !level || discovering}
            className={`h-[52px] px-8 rounded-full font-bold text-lg border transition-all duration-250 select-none cursor-pointer
              ${
                !subject.trim() || !level || discovering
                  ? "bg-muted text-muted-foreground/60 border-transparent cursor-not-allowed"
                  : "border-border text-foreground hover:bg-zinc-50 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              }`}
          >
            {discovering ? "Suggesting..." : "Suggest Course Titles"}
          </button>
        </div>
      </form>

      {/* Recommended Topics list */}
      {recommendations && (
        <div className="w-full flex flex-col items-center bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm mb-12 animate-fade-in-up">
          <h3 className="text-2xl font-black text-foreground mb-6 w-full text-left">
            Recommended AI Suggestions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setTopic(rec.title);
                  // Highlight card response
                }}
                className={`p-5 rounded-2xl border cursor-pointer text-left transition-all duration-300 relative group overflow-hidden ${
                  topic === rec.title
                    ? "bg-primary/5 border-primary scale-[1.01] shadow-sm"
                    : "bg-card hover:bg-zinc-50 border-border hover:scale-[1.01] hover:shadow-sm"
                }`}
              >
                {/* Decorative corner glow */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/5 rounded-full blur-lg group-hover:bg-primary/10 transition-colors pointer-events-none" />

                <div className="flex justify-between items-center gap-2 mb-2 relative z-10">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="h-6 w-6 shrink-0 rounded-lg bg-zinc-900 text-white font-extrabold text-xs flex items-center justify-center select-none">
                      {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-foreground text-base md:text-lg truncate ml-1">
                      {rec.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded shrink-0 select-none">
                    {rec.estimatedHours}h
                  </span>
                </div>
                <p className="text-zinc-550 text-sm leading-relaxed mb-3 relative z-10">
                  {rec.description}
                </p>
                {rec.tags && rec.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 relative z-10">
                    {rec.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-3xs md:text-2xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted text-muted-foreground select-none">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
