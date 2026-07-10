import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../utils/api";
import BackButton from "@/components/ui/BackButton";
import HeaderWithMenu from "@/components/layout/HeaderWithMenu";

export default function CourseModuleView() {
  const navigate = useNavigate();
  const { courseId, order } = useParams();
  const sectionOrder = parseInt(order, 10);

  const [course, setCourse] = useState(null);
  const [section, setSection] = useState(null);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genMessage, setGenMessage] = useState("Preparing generation...");

  // Concept accordion state
  const [activeConceptIdx, setActiveConceptIdx] = useState(0);

  const generationMessages = [
    "Establishing topic parameters...",
    "Drafting university-level overview chapters...",
    "Fleshing out concept definitions and mechanisms...",
    "Writing concrete real-world worked examples...",
    "Formulating scenario-based quiz questions...",
    "Reviewing common student mistakes and traps...",
    "Structuring textbook chapters and takeaways...",
  ];

  useEffect(() => {
    if (courseId && sectionOrder) {
      loadSectionData();
    }
  }, [courseId, sectionOrder]);

  const loadSectionData = async () => {
    try {
      setLoading(true);
      setGenerating(false);

      // 1. Fetch course details
      const courseRes = await apiFetch(`/courses/${courseId}`);
      if (!courseRes.success || !courseRes.data.course) {
        throw new Error("Course not found.");
      }
      const courseObj = courseRes.data.course;
      setCourse(courseObj);

      // 2. Fetch already generated sections list
      const listRes = await apiFetch(`/courses/${courseId}/sections`);
      if (!listRes.success) {
        throw new Error("Failed to load sections index.");
      }

      const existingSectionRef = listRes.data.sections.find((s) => s.order === sectionOrder);

      if (existingSectionRef) {
        // Section already exists, fetch full content
        const detailRes = await apiFetch(`/courses/${courseId}/sections/${existingSectionRef._id}`);
        if (detailRes.success && detailRes.data.section) {
          setSection(detailRes.data.section);
        }
      } else {
        // Section needs to be generated
        triggerSectionGeneration(courseObj);
      }
    } catch (err) {
      alert(err.message || "Failed to load section data.");
      navigate(`/course-index/${courseId}`);
    } finally {
      setLoading(false);
    }
  };

  const triggerSectionGeneration = async (courseObj) => {
    setGenerating(true);
    setGenProgress(5);
    setGenMessage(generationMessages[0]);

    // Animate progress bar for textbook generation
    let msgIdx = 0;
    const interval = setInterval(() => {
      setGenProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
      
      msgIdx = (msgIdx + 1) % generationMessages.length;
      setGenMessage(generationMessages[msgIdx]);
    }, 1200);

    try {
      const genRes = await apiFetch(`/courses/${courseId}/sections/generate/${sectionOrder}`, {
        method: "POST",
      });
      clearInterval(interval);
      setGenProgress(100);

      if (genRes.success && genRes.data.section) {
        setSection(genRes.data.section);
      }
    } catch (err) {
      clearInterval(interval);
      alert(err.message || "Failed to generate section content.");
      navigate(`/course-index/${courseId}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleMarkAsRead = async () => {
    if (!section) return;
    try {
      await apiFetch(`/courses/${courseId}/sections/${section._id}/progress`, {
        method: "PATCH",
        body: JSON.stringify({ status: "completed" }),
      });
      alert("Progress saved! Navigating back to Course Index.");
      navigate(`/course-index/${courseId}`);
    } catch (err) {
      alert(err.message || "Failed to update progress.");
    }
  };

  // ── Render Loading ─────────────────────────────────────────────────────────
  if (loading || generating) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans p-6 text-center">
        {generating ? (
          <div className="w-full max-w-xl flex flex-col items-center">
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
            <h2 className="text-3xl font-bold text-zinc-950 mb-2 animate-pulse">Assembling Section Materials</h2>
            <p className="text-muted-foreground text-lg font-medium italic min-h-[40px]">{genMessage}</p>
            <p className="text-zinc-500 text-xs mt-6">This takes about 20-30 seconds because we construct rich textbook chapters, worked code, and quiz questions.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground font-medium select-none">Fetching course section details...</p>
          </div>
        )}
      </div>
    );
  }

  if (!course || !section) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col w-full relative overflow-x-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <HeaderWithMenu />
      
      {/* Title Bar */}
      <div className="bg-card border-y border-border text-foreground flex items-center px-4 md:px-8 py-3 shadow-sm w-full select-none">
        <div className="flex-1 flex justify-start">
          <BackButton
            onClick={() => navigate(`/course-index/${courseId}`)}
            title="Course Modules"
          />
        </div>
        <div className="font-extrabold text-sm md:text-base tracking-[0.25rem] text-center shrink-0 uppercase text-zinc-950">
          {course.topic}
        </div>
        <div className="flex-1"></div>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-8 py-8 flex flex-col text-left text-zinc-800">
        
        {/* Module Title */}
        <div className="border-b border-border pb-4 mb-8">
          <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider select-none">
            Module {section.order} of {course.index.length}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 mt-3 uppercase leading-tight">
            {section.title}
          </h2>
        </div>

        {/* Section Overview */}
        <div className="mb-10 select-text">
          <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Overview
          </h3>
          <div className="space-y-4 text-base md:text-lg text-zinc-700 leading-relaxed font-normal">
            {(section.overview || "").split("\n\n").map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>
        </div>

        {/* Concept Deep Dive Accordions */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Key Concepts
          </h3>
          
          <div className="flex flex-col gap-4">
            {section.concepts.map((concept, idx) => {
              const isActive = activeConceptIdx === idx;
              
              // Extract explanation text and image URL from either Mongoose schema format or direct properties
              const textBlock = concept.blocks?.find((b) => b.type === "text");
              const imageBlock = concept.blocks?.find((b) => b.type === "image");
              
              const explanation = concept.explanation || textBlock?.content || "";
              const imageUrl = imageBlock?.content || (concept.imagePrompt 
                ? `https://image.pollinations.ai/prompt/${encodeURIComponent(concept.imagePrompt)}?width=600&height=400&nologo=true`
                : null);

              return (
                <div
                  key={idx}
                  className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm"
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setActiveConceptIdx(isActive ? -1 : idx)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-zinc-50 transition-colors font-bold text-lg select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-7 rounded bg-zinc-900 text-white font-extrabold text-sm flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-zinc-900">{concept.title}</span>
                    </div>
                    <span className="text-zinc-400 text-sm">
                      {isActive ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Accordion body */}
                  {isActive && (
                    <div className="p-6 bg-card border-t border-border select-text">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4 text-zinc-700 leading-relaxed">
                          {explanation ? (
                            explanation.split("\n\n").map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))
                          ) : (
                            <p className="text-zinc-400 italic">No explanation content available.</p>
                          )}
                        </div>
                        {/* Concept Diagram */}
                        {imageUrl && (
                          <div className="flex flex-col gap-2">
                            <div className="bg-zinc-900 rounded-xl overflow-hidden shadow aspect-[4/3] border border-zinc-200 relative group">
                              <img
                                src={imageUrl}
                                alt={concept.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-zinc-400 text-3xs italic leading-tight select-none">
                              Diagram: {concept.title} illustration setup.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Worked Example */}
        {section.workedExample && (
          <div className="bg-zinc-900 text-white rounded-3xl p-6 md:p-8 mb-10 shadow-xl select-text">
            <div className="flex items-center gap-2 text-primary font-extrabold text-xs uppercase tracking-wider mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Worked Example
            </div>
            
            <h4 className="text-xl font-bold mb-3">{section.workedExample.problem}</h4>
            
            <div className="border-t border-zinc-800 my-4" />
            
            <h5 className="font-extrabold text-zinc-400 text-xs uppercase tracking-wider mb-2">Steps to solve:</h5>
            <ol className="list-decimal pl-5 space-y-2.5 text-zinc-200 text-sm md:text-base mb-6 leading-relaxed">
              {section.workedExample.steps.map((step, sIdx) => (
                <li key={sIdx}>{step}</li>
              ))}
            </ol>

            {section.workedExample.code && (
              <div className="mb-6">
                <div className="flex justify-between items-center bg-zinc-800/80 px-4 py-2 rounded-t-xl text-xs font-bold text-zinc-400 border-b border-zinc-900 select-none">
                  <span>{section.workedExample.language || "code"}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(section.workedExample.code);
                      alert("Code copied to clipboard!");
                    }}
                    className="hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <pre className="bg-zinc-950 p-4 rounded-b-xl overflow-x-auto text-xs md:text-sm font-mono text-emerald-450 leading-relaxed text-left">
                  <code>{section.workedExample.code}</code>
                </pre>
              </div>
            )}

            {section.workedExample.expectedOutput && (
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/60 text-sm">
                <span className="font-bold text-primary block mb-1 uppercase tracking-wider text-2xs">Expected Output:</span>
                <p className="font-medium text-zinc-300">{section.workedExample.expectedOutput}</p>
              </div>
            )}
          </div>
        )}

        {/* Common Mistakes */}
        {section.commonMistakes && section.commonMistakes.length > 0 && (
          <div className="border border-rose-250 bg-rose-50/15 rounded-3xl p-6 md:p-8 mb-10 shadow-sm select-text">
            <h4 className="text-lg font-bold text-rose-950 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Common Mistakes &amp; Pitfalls
            </h4>
            <ul className="list-disc pl-5 space-y-3 text-sm md:text-base text-zinc-700 leading-relaxed font-medium">
              {section.commonMistakes.map((mistake, idx) => (
                <li key={idx}>{mistake}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Takeaways */}
        {section.keyTakeaways && section.keyTakeaways.length > 0 && (
          <div className="border border-emerald-250 bg-emerald-50/15 rounded-3xl p-6 md:p-8 mb-10 shadow-sm select-text">
            <h4 className="text-lg font-bold text-emerald-950 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Takeaways
            </h4>
            <ul className="list-disc pl-5 space-y-2.5 text-sm md:text-base text-zinc-700 leading-relaxed font-medium">
              {section.keyTakeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Further Reading */}
        {section.furtherReading && section.furtherReading.length > 0 && (
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-12 select-text">
            <h4 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Further Reading
            </h4>
            <ul className="list-decimal pl-5 space-y-2.5 text-sm md:text-base text-zinc-700 leading-relaxed font-medium">
              {section.furtherReading.map((reading, idx) => (
                <li key={idx}>{reading}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-between items-center gap-4 border-t border-border pt-6 select-none shrink-0">
          <button
            onClick={() => navigate(`/course-index/${courseId}`)}
            className="px-6 py-2.5 border border-border rounded-full font-bold text-zinc-600 hover:text-zinc-800 hover:bg-secondary active:scale-95 transition"
          >
            Back to Course Syllabus
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={handleMarkAsRead}
              className="px-6 py-2.5 bg-zinc-900 text-white rounded-full font-bold hover:bg-zinc-800 active:scale-95 transition shadow-sm"
            >
              Mark as Read
            </button>
            
            <button
              onClick={() => navigate(`/course-quiz/${courseId}/${section._id}`)}
              className="px-8 py-2.5 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/95 active:scale-95 transition shadow-sm"
            >
              Take Quiz
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
