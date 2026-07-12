import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import OptionButton from "@/components/ui/OptionButton";
import formatOptions from "../data/formatOptions";
import avatar from "@/assets/avatar.svg";



export default function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Quick generator states
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [quickTopic, setQuickTopic] = useState("");
  const [quickLevel, setQuickLevel] = useState("");

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchCoursesAndProfile();
  }, []);

  const fetchCoursesAndProfile = async () => {
    try {
      setLoading(true);
      const [coursesRes, profileRes] = await Promise.allSettled([
        apiFetch("/courses"),
        apiFetch("/users/me"),
      ]);

      if (coursesRes.status === "fulfilled" && coursesRes.value.success) {
        setCourses(coursesRes.value.data.courses);
      }
      if (profileRes.status === "fulfilled" && profileRes.value.success) {
        setUserProfile(profileRes.value.data);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this course and all its progress?")) return;

    try {
      const data = await apiFetch(`/courses/${id}`, { method: "DELETE" });
      if (data.success) {
        setCourses((prev) => prev.filter((c) => c._id !== id));
        // Refresh user profile stats
        const profileRes = await apiFetch("/users/me");
        if (profileRes.success) {
          setUserProfile(profileRes.data);
        }
      }
    } catch (err) {
      alert(err.message || "Failed to delete course.");
    }
  };

  const handleQuickGenerateSubmit = (e) => {
    e.preventDefault();
    if (!selectedFormat || !quickTopic.trim() || !quickLevel) return;
    
    navigate("/result", {
      state: {
        format: selectedFormat,
        prompt: quickTopic,
        topic: quickTopic,
        level: quickLevel,
      },
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 flex flex-col pb-16 font-sans select-text">
      
      {/* Top Profile Header */}
      <div className="flex justify-between items-center mb-6 mt-4 select-none">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block">
            {currentDate}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div 
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full border-2 border-border overflow-hidden bg-muted cursor-pointer shrink-0 hover:border-primary/50 transition-all duration-200"
            title="Profile"
          >
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Bento Grid Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Bento Welcome Card */}
        <div className="col-span-1 md:col-span-2 bg-zinc-950 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
          {/* Glowing backdrops */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 text-left">
            <span className="text-3xs uppercase tracking-widest text-zinc-400 font-extrabold select-none">
              {currentDate}
            </span>
            {loading ? (
              <div className="h-8 w-48 bg-zinc-800 rounded-xl animate-pulse mt-3" />
            ) : (
              <h1 className="text-3xl font-black text-white mt-3 leading-tight select-none">
                Welcome Back, {userProfile?.user?.name || "Learner"} 👋
              </h1>
            )}
            <p className="text-zinc-350 text-sm mt-2 max-w-md font-medium leading-relaxed">
              Ready to master a new skill? Design custom multi-section courses or generate targeted bite-sized lessons instantly.
            </p>
          </div>

          <div className="text-3xs italic text-zinc-400 border-l-2 border-primary/45 pl-3 mt-6 select-none text-left relative z-10">
            "The beautiful thing about learning is that no one can take it away from you."
          </div>
        </div>

        {/* Bento Stats Card */}
        <div className="col-span-1 bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="text-left relative z-10 w-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground select-none">
              Learning Analytics
            </h3>
            
            <div className="flex gap-8 mt-6">
              <div>
                {loading ? (
                  <div className="h-10 w-16 bg-muted rounded-xl animate-pulse mt-2" />
                ) : (
                  <span className="block text-4xl font-black text-zinc-950 dark:text-white">
                    {userProfile?.stats?.totalCourses ?? courses.length}
                  </span>
                )}
                <span className="text-3xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mt-1 select-none">
                  Courses Built
                </span>
              </div>
              <div className="w-px bg-border/60" />
              <div>
                {loading ? (
                  <div className="h-10 w-16 bg-muted rounded-xl animate-pulse mt-2" />
                ) : (
                  <span className="block text-4xl font-black text-primary dark:text-blue-400">
                    {userProfile?.stats?.sectionsCompleted ?? 0}
                  </span>
                )}
                <span className="text-3xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mt-1 select-none">
                  Modules Done
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="mt-6 text-xs font-bold text-primary flex items-center gap-1 group/btn select-none hover:underline cursor-pointer relative z-10 text-left"
          >
            Manage Account Profile
            <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>

      {/* Action Row */}
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-border text-left select-none">
        <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Your Generated Courses</h3>
        <button
          onClick={() => navigate("/create-course")}
          className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Create New Course
        </button>
      </div>

      {/* Courses List Section */}
      <div className="mb-14 text-left">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-52 bg-muted rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-10 text-center flex flex-col items-center max-w-xl mx-auto shadow-sm">
            <div className="h-16 w-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">No courses generated yet</h4>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed max-w-sm">
              Use our course architect to discover titles and build structured learning indexes tailored to your skill level.
            </p>
            <button
              onClick={() => navigate("/create-course")}
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-6 py-2.5 rounded-full text-sm hover:-translate-y-0.5 active:translate-y-0 duration-250 transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/course-index/${course._id}`)}
                className="bg-card border border-border rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md hover:border-primary/25 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-52 relative group overflow-hidden"
              >
                {/* Decorative corner glow */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/15 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest bg-primary/5 font-extrabold text-primary px-2.5 py-1 rounded-md">
                      {course.level}
                    </span>
                    <button
                      onClick={(e) => handleDeleteCourse(course._id, e)}
                      className="text-zinc-400 hover:text-red-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 p-1.5 rounded-full transition-all duration-200 z-20 cursor-pointer hover:scale-110 active:scale-95"
                      title="Delete Course"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <h4 className="font-extrabold text-zinc-950 dark:text-white text-lg md:text-xl line-clamp-2 leading-snug">
                    {course.topic}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mt-1">
                    Subject: {course.subject}
                  </p>
                </div>

                <div className="border-t border-border pt-3 flex justify-between items-center mt-3 select-none relative z-10">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    Est: {course.estimatedHours} Hours
                  </span>
                  <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Course
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Format Generator */}
      <div className="bg-card border border-border rounded-3xl p-8 md:p-10 text-left shadow-sm relative overflow-hidden group">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-[90px] pointer-events-none" />
        
        <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2 relative z-10">
          Format Generator
        </h3>
        <p className="text-muted-foreground text-sm md:text-base font-medium mb-8 relative z-10">
          Need a quick reference? Select a single media output and generate a targeted topic lesson.
        </p>

        {/* Form options selection */}
        <div className="flex flex-wrap justify-start gap-3 w-full relative z-10">
          {formatOptions.map((option) => (
            <OptionButton
              key={option.id}
              label={option.label}
              icon={option.icon}
              isSelected={selectedFormat === option.id}
              onClick={() => {
                setSelectedFormat(option.id);
                // Auto scroll or focus topic inputs
              }}
            />
          ))}
        </div>

        {/* Collapsible unified prompt config drawer */}
        {selectedFormat && (
          <form
            onSubmit={handleQuickGenerateSubmit}
            className="mt-8 border-t border-border pt-8 flex flex-col gap-5 relative z-10 animate-fade-in-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Target Topic Input */}
              <div className="w-full bg-zinc-50 border border-border px-5 py-3 rounded-2xl flex items-center shadow-3xs focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <label className="text-sm font-bold text-muted-foreground mr-3 shrink-0 select-none">Topic:</label>
                <input
                  type="text"
                  value={quickTopic}
                  onChange={(e) => setQuickTopic(e.target.value)}
                  placeholder={`e.g. Intro to CSS Flexbox, Explain ${selectedFormat}...`}
                  className="w-full bg-transparent text-sm font-semibold focus:outline-none placeholder-zinc-400 text-foreground"
                  required
                />
              </div>

              {/* Difficulty Level Dropdown */}
              <div className="w-full bg-zinc-50 border border-border px-5 py-3 rounded-2xl flex items-center relative shadow-3xs focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <label className="text-sm font-bold text-muted-foreground mr-3 shrink-0 select-none">Level:</label>
                <select
                  value={quickLevel}
                  onChange={(e) => setQuickLevel(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold focus:outline-none cursor-pointer pr-10 appearance-none text-foreground"
                  required
                >
                  <option value="" disabled hidden>Select difficulty level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <div className="absolute right-5 pointer-events-none text-lg font-black text-zinc-400 select-none">
                  &#9660;
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!quickTopic.trim() || !quickLevel}
                className={`h-[52px] px-8 rounded-full font-bold text-base transition-all duration-250 flex items-center gap-1.5 shadow-sm select-none cursor-pointer border-none
                  ${
                    !quickTopic.trim() || !quickLevel
                      ? "bg-muted text-muted-foreground/60 cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/95 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                  }`}
              >
                Generate Quick Lesson
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
