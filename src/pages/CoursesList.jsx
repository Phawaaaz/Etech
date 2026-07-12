import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";



export default function CoursesList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/courses");
      if (res.success) {
        setCourses(res.data.courses || []);
      }
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this course and all its progress?")) return;

    try {
      const data = await apiFetch(`/courses/${id}`, { method: "DELETE" });
      if (data.success) {
        setCourses((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      alert(err.message || "Failed to delete course.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-background p-4 md:p-8 flex flex-col font-sans select-text">
      <div className="max-w-6xl w-full mx-auto text-left">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-2">My Courses</h1>
            <p className="text-base text-muted-foreground font-medium">
              Manage, review, and jump back into your generated courses.
            </p>
          </div>
          <button
            onClick={() => navigate("/create-course")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Create New Course
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm mt-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">You haven't built any courses yet!</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              Get started by generating your very first curriculum with our AI engine.
            </p>
            <Link
              to="/create-course"
              className="inline-block px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-full shadow hover:bg-primary/95 transition active:scale-95"
            >
              Start Generating
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/course-index/${course._id}`)}
                className="bg-card border border-border rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between h-48 group relative overflow-hidden"
              >
                <div>
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
                  <h4 className="font-extrabold text-foreground text-lg line-clamp-2 leading-snug mt-3">
                    {course.topic}
                  </h4>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs font-bold text-muted-foreground">
                    {course.estimatedHours}h
                  </span>
                  <span className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    Resume
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
