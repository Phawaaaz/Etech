import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../utils/api";
import Header from "@/components/layout/Header";
import CourseListItem from "@/components/course/CourseListItem";
import BackButton from "@/components/ui/BackButton";

export default function CourseIndexView() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      loadCourseAndProgress();
    }
  }, [courseId]);

  const loadCourseAndProgress = async () => {
    try {
      setLoading(true);
      const [courseData, progressData] = await Promise.all([
        apiFetch(`/courses/${courseId}`),
        apiFetch(`/courses/${courseId}/progress`),
      ]);

      if (courseData.success && courseData.data.course) {
        setCourse(courseData.data.course);
      }
      if (progressData.success && progressData.data) {
        setProgress(progressData.data);
      }
    } catch (err) {
      alert(err.message || "Failed to load course details.");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground font-medium select-none">Loading course curriculum...</p>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 md:p-6 font-sans overflow-x-hidden w-full relative">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <Header />

      <main className="w-full max-w-5xl flex flex-col md:flex-row gap-8 py-6 md:py-8 mt-16 text-left">
        
        {/* Sidebar Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <span className="text-3xs uppercase tracking-widest bg-primary/10 text-primary px-2.5 py-0.5 rounded font-extrabold select-none">
              {course.level}
            </span>
            <h2 className="text-2xl font-black text-foreground mt-3 leading-snug">
              {course.topic}
            </h2>
            <p className="text-muted-foreground text-xs font-semibold mt-1 uppercase tracking-wider">
              Subject: {course.subject}
            </p>
            <p className="text-zinc-650 text-sm leading-relaxed mt-4">
              {course.description}
            </p>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between items-center text-xs text-zinc-550 font-bold select-none">
              <span>Estimated:</span>
              <span>{course.estimatedHours} Hours</span>
            </div>
          </div>

          {/* Progress Card */}
          {progress && (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">Your Progress</h3>
              <div className="flex justify-between text-sm text-zinc-500 font-bold mb-3 select-none">
                <span>Modules Completed:</span>
                <span>{progress.completedSections} / {course.index.length}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3.5 p-0.5 overflow-hidden flex items-center">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentComplete}%` }}
                />
              </div>
              <span className="text-2xs text-primary font-extrabold uppercase mt-2.5 block text-right">
                {progress.percentComplete}% COMPLETE
              </span>
            </div>
          )}
        </div>

        {/* Sections Index List */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="bg-card border border-border text-foreground px-6 py-3 rounded-2xl font-bold text-base tracking-wider shadow-sm mb-6 text-center select-none shrink-0 w-full uppercase">
            Course Curriculum Index
          </div>

          <div className="flex flex-col gap-4 w-full">
            {course.index.map((sec) => {
              // Check if completed from progress API
              const sectionProgress = progress?.sections?.find((p) => p.sectionId?._id === sec._id || p.sectionId?.order === sec.order);
              const isCompleted = sectionProgress?.status === "completed";

              return (
                <CourseListItem
                  key={sec.order}
                  number={sec.order}
                  title={sec.title}
                  summary={sec.summary}
                  duration={sec.estimatedMinutes}
                  onClick={() => navigate(`/course-module/${courseId}/${sec.order}`)}
                />
              );
            })}
          </div>

          <div className="mt-8 flex justify-start shrink-0">
            <BackButton
              onClick={() => navigate("/dashboard")}
              title="Back to Dashboard"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
