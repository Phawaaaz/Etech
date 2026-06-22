import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../utils/api";
import Header from "../components/Header";
import CourseListItem from "../components/CourseListItem";
import BackButton from "../components/BackButton";

export default function CourseIndexView() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    let isActive = true;

    const fetchCourseAndProgress = async () => {
      try {
        if (!isActive) return;

        setLoading(true);
        const [courseData, progressData] = await Promise.all([
          apiFetch(`/courses/${courseId}`),
          apiFetch(`/courses/${courseId}/progress`),
        ]);

        if (!isActive) return;

        if (courseData.success && courseData.data.course) {
          setCourse(courseData.data.course);
        }
        if (progressData.success && progressData.data) {
          setProgress(progressData.data);
        }
      } catch (err) {
        if (!isActive) return;

        alert(err.message || "Failed to load course details.");
        navigate("/dashboard");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    Promise.resolve().then(fetchCourseAndProgress);

    return () => {
      isActive = false;
    };
  }, [courseId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-zinc-400 font-medium select-none">
          Loading course curriculum...
        </p>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center p-4 md:p-6 font-sans overflow-x-hidden w-full">
      <Header />

      <main className="w-full max-w-5xl flex flex-col md:flex-row gap-8 py-6 md:py-8 mt-16 text-left">
        {/* Sidebar Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <span className="text-3xs uppercase tracking-widest bg-indigo-600/50 text-indigo-200 px-2.5 py-0.5 rounded font-extrabold select-none">
              {course.level}
            </span>
            <h2 className="text-2xl font-black text-white mt-3 leading-snug">
              {course.topic}
            </h2>
            <p className="text-zinc-400 text-xs font-semibold mt-1 uppercase tracking-wider">
              Subject: {course.subject}
            </p>
            <p className="text-zinc-350 text-sm leading-relaxed mt-4">
              {course.description}
            </p>
            <div className="border-t border-white/10 my-4" />
            <div className="flex justify-between items-center text-xs text-zinc-400 font-bold select-none">
              <span>Estimated:</span>
              <span>{course.estimatedHours} Hours</span>
            </div>
          </div>

          {/* Progress Card */}
          {progress && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-2">
                Your Progress
              </h3>
              <div className="flex justify-between text-sm text-zinc-400 font-bold mb-3 select-none">
                <span>Modules Completed:</span>
                <span>
                  {progress.completedSections} / {course.index.length}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3.5 p-0.5 overflow-hidden flex items-center">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentComplete}%` }}
                />
              </div>
              <span className="text-2xs text-indigo-400 font-extrabold uppercase mt-2.5 block text-right">
                {progress.percentComplete}% COMPLETE
              </span>
            </div>
          )}
        </div>

        {/* Sections Index List */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="bg-white text-zinc-950 px-6 py-3 rounded-2xl font-black text-base tracking-widest shadow-lg mb-6 text-center select-none shrink-0 w-full uppercase">
            Course Curriculum Index
          </div>

          <div className="flex flex-col gap-4 w-full">
            {course.index.map((sec) => {
              // Check if completed from progress API
              const sectionProgress = progress?.sections?.find(
                (p) =>
                  p.sectionId?._id === sec._id ||
                  p.sectionId?.order === sec.order,
              );
              const isCompleted = sectionProgress?.status === "completed";

              return (
                <CourseListItem
                  key={sec.order}
                  number={sec.order}
                  title={sec.title}
                  summary={sec.summary}
                  duration={sec.estimatedMinutes}
                  onClick={() =>
                    navigate(`/course-module/${courseId}/${sec.order}`)
                  }
                />
              );
            })}
          </div>

          <div className="mt-8 flex justify-start shrink-0">
            <BackButton
              onClick={() => navigate("/create-course")}
              title="Back to Create Course"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
