import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import OptionButton from "@/components/ui/OptionButton";
import formatOptions from "../data/formatOptions";
import avatar from "@/assets/avatar.svg";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
};

const suggestionChips = [
  { topic: "Comprehensive guide to Quantum Computing", format: "course", level: "Beginner", label: "Quantum Computing 🔬" },
  { topic: "TypeScript Design Patterns and Architecture", format: "course", level: "Advanced", label: "TypeScript Patterns 💻" },
  { topic: "Introductory audio overview of Greek Philosophy", format: "audio", level: "Beginner", label: "Greek Philosophy 🎙️" },
  { topic: "Visual overview of CSS Grid layouts", format: "video", level: "Intermediate", label: "CSS Grid layout 🎥" },
];



export default function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Quick generator states
  const [selectedFormat, setSelectedFormat] = useState("course");
  const [quickTopic, setQuickTopic] = useState("");
  const [quickLevel, setQuickLevel] = useState("Beginner");
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);

  const [generatingCourse, setGeneratingCourse] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  const handleSuggestionClick = (chip) => {
    setQuickTopic(chip.topic);
    setSelectedFormat(chip.format);
    setQuickLevel(chip.level);
  };

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

  const handleQuickGenerateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFormat || !quickTopic.trim() || !quickLevel) return;
    
    if (selectedFormat === "course") {
      setGeneratingCourse(true);
      setGenProgress(10);
      
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
          body: JSON.stringify({
            subject: quickTopic,
            topic: quickTopic,
            level: quickLevel,
          }),
        });
        clearInterval(interval);
        setGenProgress(100);
        
        if (data.success && data.data.course) {
          navigate(`/course-index/${data.data.course.id}`);
        }
      } catch (err) {
        clearInterval(interval);
        alert(err.message || "Failed to generate course syllabus.");
        setGeneratingCourse(false);
      }
    } else {
      navigate("/result", {
        state: {
          format: selectedFormat,
          prompt: quickTopic,
          topic: quickTopic,
          level: quickLevel,
        },
      });
    }
  };

  if (generatingCourse) {
    return (
      <div className="w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans select-none px-4">
        <div className="relative w-40 h-40 mb-8">
          <div className="absolute inset-0 border-4 border-zinc-200 dark:border-zinc-800 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-primary rounded-full animate-spin"
            style={{ borderTopColor: "transparent", animationDuration: "1.5s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-primary">{genProgress}%</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-zinc-950 dark:text-white mb-2 animate-pulse uppercase tracking-tight">Designing Curriculum</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium max-w-md italic text-center">
          Building sections, syllabus, learning objectives, and custom worked examples...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto px-4 flex flex-col pb-16 font-sans select-text"
    >
      
      {/* Top Profile Header */}
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center mb-6 mt-4 select-none"
      >
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block">
            {currentDate}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <motion.div 
            onClick={() => navigate("/profile")}
            whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border-2 border-border overflow-hidden bg-muted cursor-pointer shrink-0 transition-colors"
            title="Profile"
          >
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </motion.div>

      {/* Bento Grid Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Bento Welcome Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-1 md:col-span-2 bg-zinc-950 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[220px] relative overflow-hidden group"
        >
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
        </motion.div>

        {/* Bento Stats Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-1 bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[220px] relative overflow-hidden group"
        >
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

          <motion.button
            onClick={() => navigate("/profile")}
            whileHover={{ x: 3 }}
            className="mt-6 text-xs font-bold text-primary flex items-center gap-1 group/btn select-none hover:underline cursor-pointer relative z-10 text-left border-none bg-transparent outline-none"
          >
            Manage Account Profile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

      </div>

      {/* Hero Central Prompt Section */}
      <motion.div
        variants={itemVariants}
        className="w-full flex flex-col items-center mb-12 mt-4 text-center select-none"
      >
        <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white uppercase mb-3">
          What would you like to master today?
        </h2>
        <p className="text-sm text-muted-foreground font-medium mb-6 max-w-md">
          Design custom syllabi or generate quick bite-sized lessons with interactive AI options.
        </p>

        {/* ChatGPT / Claude style input bar */}
        <div className="w-full max-w-2xl bg-card border border-border rounded-3xl p-4 shadow-md relative focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all text-left">
          <textarea
            value={quickTopic}
            onChange={(e) => setQuickTopic(e.target.value)}
            placeholder="Ask AI to design a course or build a lesson on any topic..."
            className="w-full min-h-[64px] bg-transparent text-sm font-semibold focus:outline-none placeholder-zinc-400 text-foreground resize-none pr-12 select-text"
            required
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (quickTopic.trim() && selectedFormat && quickLevel) {
                  handleQuickGenerateSubmit(e);
                }
              }
            }}
          />

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/50">
            {/* Left Controls (Pills) */}
            <div className="flex items-center gap-2 relative">
              {/* Format Selection Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowFormatDropdown(!showFormatDropdown);
                    setShowLevelDropdown(false);
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-border bg-muted dark:bg-zinc-800 hover:bg-muted/70 text-xs font-bold flex items-center gap-1.5 cursor-pointer text-foreground transition-all duration-200 border-none outline-none"
                >
                  <span className="capitalize">
                    {selectedFormat === "course" ? "📚 Course Syllabus" :
                     selectedFormat === "text" ? "📝 Text Lesson" :
                     selectedFormat === "audio" ? "🎙️ Audio Lesson" :
                     selectedFormat === "video" ? "🎥 Video Lesson" :
                     selectedFormat === "image" ? "🖼️ Image Reference" : "🧩 Interactive Module"}
                  </span>
                  <span className="text-[10px] text-zinc-450">&#9660;</span>
                </button>

                <AnimatePresence>
                  {showFormatDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 bottom-full mb-2 bg-card border border-border rounded-2xl p-1.5 shadow-lg w-48 z-30 flex flex-col gap-1"
                    >
                      {[
                        { id: "course", label: "Course Syllabus", icon: "📚" },
                        { id: "text", label: "Text Lesson", icon: "📝" },
                        { id: "audio", label: "Audio Lesson", icon: "🎙️" },
                        { id: "video", label: "Video Lesson", icon: "🎥" },
                        { id: "image", label: "Image Reference", icon: "🖼️" },
                        { id: "interactive", label: "Interactive Module", icon: "🧩" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedFormat(opt.id);
                            setShowFormatDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-muted/65 dark:hover:bg-zinc-800/40 cursor-pointer flex items-center gap-2 transition-all border-none bg-transparent ${
                            selectedFormat === opt.id ? "text-primary bg-primary/5" : "text-foreground"
                          }`}
                        >
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Level Selection Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowLevelDropdown(!showLevelDropdown);
                    setShowFormatDropdown(false);
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-border bg-muted dark:bg-zinc-800 hover:bg-muted/70 text-xs font-bold flex items-center gap-1.5 cursor-pointer text-foreground transition-all duration-200 border-none outline-none"
                >
                  <span>
                    {quickLevel === "Beginner" ? "🟢 Beginner" :
                     quickLevel === "Intermediate" ? "🟡 Intermediate" : "🔴 Advanced"}
                  </span>
                  <span className="text-[10px] text-zinc-450">&#9660;</span>
                </button>

                <AnimatePresence>
                  {showLevelDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 bottom-full mb-2 bg-card border border-border rounded-2xl p-1.5 shadow-lg w-40 z-30 flex flex-col gap-1"
                    >
                      {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => {
                            setQuickLevel(lvl);
                            setShowLevelDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-muted/65 dark:hover:bg-zinc-800/40 cursor-pointer flex items-center gap-2 transition-all border-none bg-transparent ${
                            quickLevel === lvl ? "text-primary bg-primary/5" : "text-foreground"
                          }`}
                        >
                          <span>{lvl === "Beginner" ? "🟢" : lvl === "Intermediate" ? "🟡" : "🔴"}</span>
                          <span>{lvl}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Action Button */}
            <motion.button
              type="button"
              onClick={handleQuickGenerateSubmit}
              disabled={!quickTopic.trim() || !selectedFormat || !quickLevel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-none transition-all duration-200 cursor-pointer shadow-sm
                ${
                  !quickTopic.trim()
                    ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/95"
                }`}
            >
              <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-4 max-w-xl">
          {suggestionChips.map((chip, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(chip)}
              whileHover={{ y: -1, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-3.5 py-1.5 rounded-full border border-border dark:border-zinc-800 bg-card hover:bg-muted/30 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer shadow-3xs transition-colors"
            >
              {chip.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Action Row */}
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center mb-8 border-b pb-4 border-border text-left select-none"
      >
        <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Your Generated Courses</h3>
        <motion.button
          onClick={() => navigate("/create-course")}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-250 hover:shadow-md flex items-center gap-1.5 cursor-pointer border-none outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Create New Course
        </motion.button>
      </motion.div>

      {/* Courses List Section */}
      <motion.div variants={itemVariants} className="mb-14 text-left">
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
            <motion.button
              onClick={() => navigate("/create-course")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-6 py-2.5 rounded-full text-sm duration-250 transition-all cursor-pointer border-none outline-none"
            >
              Get Started
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses.slice(0, 3).map((course) => (
                <motion.div
                  key={course._id}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.015, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  onClick={() => navigate(`/course-index/${course._id}`)}
                  className="bg-card border border-border rounded-3xl p-6 shadow-sm cursor-pointer flex flex-col justify-between h-52 relative group overflow-hidden"
                >
                  {/* Decorative corner glow */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/15 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest bg-primary/5 font-extrabold text-primary px-2.5 py-1 rounded-md">
                        {course.level}
                      </span>
                      <motion.button
                        onClick={(e) => handleDeleteCourse(course._id, e)}
                        whileHover={{ scale: 1.15, rotate: -6 }}
                        whileTap={{ scale: 0.92 }}
                        className="text-red-400/80 hover:text-red-600 dark:text-red-500/80 dark:hover:text-red-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 p-1.5 rounded-full transition-colors z-20 cursor-pointer border-none outline-none"
                        title="Delete Course"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                    <h4 className="font-extrabold text-zinc-950 dark:text-white text-lg md:text-xl line-clamp-2 leading-snug">
                      {course.topic}
                    </h4>
                    <p className="text-zinc-550 dark:text-zinc-400 text-xs font-semibold mt-1">
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
                </motion.div>
              ))}
            </motion.div>

            {courses.length > 3 && (
              <div className="text-center mt-2">
                <motion.button
                  onClick={() => navigate("/courses")}
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 rounded-full border border-border bg-card hover:bg-muted/50 text-xs md:text-sm font-bold text-muted-foreground hover:text-foreground cursor-pointer select-none shadow-3xs transition-all duration-200 outline-none"
                >
                  View all courses ({courses.length}) &rarr;
                </motion.button>
              </div>
            )}
          </div>
        )}
      </motion.div>

    </motion.div>
  );
}
