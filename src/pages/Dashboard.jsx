import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import OptionButton from "../components/OptionButton";
import formatOptions from "../data/formatOptions";
import { useEtech } from "../context/EtechContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { updateWizard } = useEtech();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/courses");
      if (data.success && data.data.courses) {
        setCourses(data.data.courses);
      }
    } catch (err) {
      console.error("Error loading courses:", err);
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
      }
    } catch (err) {
      alert(err.message || "Failed to delete course.");
    }
  };

  const handleQuickStudyNext = () => {
    if (!selectedFormat) return;
    updateWizard({ format: selectedFormat });
    navigate("/generate");
  };

  return (
    <div className="w-full max-w-5xl px-4 flex flex-col pb-16 font-sans">

      {/* Header and Create Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b pb-6 border-zinc-150">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white mb-2 leading-none">
            Your Learning Space
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 font-medium">
            Manage your dynamic AI courses or generate customized individual topics.
          </p>
        </div>
        <button
          onClick={() => navigate("/create-course")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 select-none"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Create New Course
        </button>
      </div>

      {/* Courses List Section */}
      <div className="mb-14 text-left">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Generated Courses</h3>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-zinc-100 dark:bg-zinc-800 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700/60 rounded-3xl p-10 text-center flex flex-col items-center max-w-xl mx-auto shadow-sm">
            <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-zinc-850 dark:text-white mb-1">No courses generated yet</h4>
            <p className="text-zinc-500 dark:text-zinc-450 text-sm mb-6 leading-relaxed max-w-sm">
              Use our course architect to discover titles and build structured learning indexes tailored to your skill level.
            </p>
            <button
              onClick={() => navigate("/create-course")}
              className="bg-zinc-900 hover:bg-black text-white font-bold px-6 py-2.5 rounded-full text-sm hover:scale-105 active:scale-95 transition"
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
                className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 rounded-3xl p-6 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all flex flex-col justify-between h-52 relative group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-2xs uppercase tracking-widest bg-zinc-100 dark:bg-zinc-700 font-extrabold text-zinc-600 dark:text-zinc-350 px-2.5 py-1 rounded-md">
                      {course.level}
                    </span>
                    <button
                      onClick={(e) => handleDeleteCourse(course._id, e)}
                      className="text-zinc-400 hover:text-red-600 p-1 rounded-full transition opacity-0 group-hover:opacity-100 absolute top-4 right-4"
                      title="Delete Course"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <h4 className="font-extrabold text-zinc-950 dark:text-white text-lg md:text-xl line-clamp-2 leading-snug">
                    {course.topic}
                  </h4>
                  <p className="text-zinc-400 text-xs font-semibold mt-1">
                    Subject: {course.subject}
                  </p>
                </div>
                <div className="border-t border-zinc-100 dark:border-zinc-700/60 pt-3 flex justify-between items-center mt-3 select-none">
                  <span className="text-xs font-bold text-zinc-500">
                    Est: {course.estimatedHours} Hours
                  </span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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

      {/* Quick Study format generation */}
      <div className="bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-700/60 rounded-3xl p-8 md:p-10 text-left">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Format Generator
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium mb-8">
          Need a quick reference? Select a single media output and generate a target topic lesson.
        </p>

        <div className="flex flex-wrap justify-start gap-3 w-full">
          {formatOptions.map((option) => (
            <OptionButton
              key={option.id}
              label={option.label}
              icon={option.icon}
              isSelected={selectedFormat === option.id}
              onClick={() => setSelectedFormat(option.id)}
            />
          ))}
        </div>

        {selectedFormat && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleQuickStudyNext}
              className="bg-zinc-950 text-white font-bold px-8 py-3 rounded-full hover:bg-zinc-900 hover:scale-105 active:scale-95 transition shadow-md flex items-center gap-2"
            >
              Configure Quick Generator
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
