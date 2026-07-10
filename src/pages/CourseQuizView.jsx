import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../utils/api";
import HeaderWithMenu from "@/components/layout/HeaderWithMenu";
import BackButton from "@/components/ui/BackButton";

export default function CourseQuizView() {
  const navigate = useNavigate();
  const { courseId, sectionId } = useParams();

  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quiz interactive states
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    if (courseId && sectionId) {
      loadSectionData();
    }
  }, [courseId, sectionId]);

  const loadSectionData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/courses/${courseId}/sections/${sectionId}`);
      if (data.success && data.data.section) {
        setSection(data.data.section);
      }
    } catch (err) {
      alert(err.message || "Failed to load quiz details.");
      navigate(`/course-index/${courseId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx, option) => {
    if (quizResult) return; // Cannot modify after submission
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: option }));
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    if (Object.keys(selectedAnswers).length < section.quiz.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    
    // Construct answers array matching question index order
    const answersArray = section.quiz.map((_, idx) => selectedAnswers[idx] || "");

    try {
      const res = await apiFetch(`/courses/${courseId}/sections/${sectionId}/quiz`, {
        method: "POST",
        body: JSON.stringify({ answers: answersArray }),
      });
      if (res.success && res.data) {
        setQuizResult(res.data);
      }
    } catch (err) {
      alert(err.message || "Failed to submit quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setQuizResult(null);
    setSelectedAnswers({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground font-medium select-none">Loading section quiz...</p>
      </div>
    );
  }

  if (!section) return null;

  const questions = section.quiz;
  const isFormComplete = Object.keys(selectedAnswers).length === questions.length;

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
            title="Syllabus"
          />
        </div>
        <div className="font-extrabold text-sm md:text-base tracking-[0.25rem] text-center shrink-0 uppercase text-zinc-950">
          {section.title}
        </div>
        <div className="flex-1"></div>
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-8 py-8 flex flex-col text-left text-zinc-800">
        
        {/* Header Title */}
        <div className="border-b border-border pb-4 mb-8">
          <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider select-none">
            Module {section.order} Quiz
          </span>
          <h2 className="text-3xl font-black text-zinc-950 mt-3 uppercase leading-tight">
            Knowledge Check
          </h2>
        </div>

        {/* Quiz Result Screen */}
        {quizResult ? (
          <div className="w-full flex flex-col items-center py-6">
            
            {/* Score circle */}
            <div className={`relative h-40 w-40 flex items-center justify-center mb-6 rounded-full border-4 ${
              quizResult.passed ? "border-emerald-500 bg-emerald-50/25" : "border-rose-500 bg-rose-50/25"
            }`}>
              <div className="text-center">
                <span className={`text-4xl font-black ${
                  quizResult.passed ? "text-emerald-700" : "text-rose-700"
                }`}>
                  {quizResult.score}%
                </span>
                <span className="text-zinc-500 text-3xs font-extrabold uppercase tracking-widest block mt-0.5">
                  {quizResult.correctCount} / {quizResult.totalQuestions} Correct
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-zinc-950 mb-2">
              {quizResult.passed ? "Syllabus Section Passed! 🎉" : "Section Review Required 📚"}
            </h3>
            <p className="text-zinc-500 font-medium max-w-md mb-8 text-center text-sm md:text-base">
              {quizResult.message}
            </p>

            {/* Detailed Feedback List */}
            <div className="w-full space-y-8 mt-4 select-text">
              {quizResult.feedback.map((f, idx) => (
                <div
                  key={idx}
                  className={`border rounded-3xl p-6 shadow-sm ${
                    f.correct ? "border-emerald-200 bg-emerald-50/10" : "border-rose-200 bg-rose-50/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`h-6 w-6 rounded-full text-white font-extrabold text-xs flex items-center justify-center ${
                      f.correct ? "bg-emerald-600" : "bg-rose-600"
                    }`}>
                      {f.correct ? "✓" : "✗"}
                    </span>
                    <h4 className="font-bold text-zinc-900 text-base md:text-lg">
                      Question {idx + 1}: {f.question}
                    </h4>
                  </div>

                  <div className="mt-3 space-y-2 text-sm md:text-base">
                    <p className="font-medium text-zinc-700">
                      Your Answer: <span className={f.correct ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>{f.yourAnswer || "[No Answer]"}</span>
                    </p>
                    {!f.correct && (
                      <p className="font-medium text-emerald-800">
                        Correct Answer: <span className="font-bold">{f.correctAnswer}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-card border border-border text-xs md:text-sm text-zinc-650 leading-relaxed font-medium">
                    <span className="font-extrabold text-primary block mb-1">Explanation:</span>
                    {f.explanation}
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-8 select-none">
              {!quizResult.passed && (
                <button
                  onClick={handleRetake}
                  className="px-6 py-2.5 border border-border rounded-full font-bold text-zinc-600 hover:text-zinc-800 hover:bg-secondary active:scale-95 transition"
                >
                  Retake Quiz
                </button>
              )}
              <button
                onClick={() => navigate(`/course-index/${courseId}`)}
                className="px-8 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-full font-bold shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250 cursor-pointer"
              >
                Back to Syllabus Index
              </button>
            </div>

          </div>
        ) : (
          // Active Quiz view
          <form onSubmit={handleSubmitQuiz} className="space-y-10">
            {questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              return (
                <div
                  key={qIdx}
                  className="bg-card border border-border rounded-3xl p-6 text-left shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm select-none">
                      {qIdx + 1}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === opt;
                      return (
                        <button
                          type="button"
                          key={oIdx}
                          onClick={() => handleSelectOption(qIdx, opt)}
                          className={`w-full py-4 px-6 rounded-2xl border text-left text-base transition duration-200 flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? "bg-primary/5 border-primary text-primary font-semibold"
                              : "bg-card hover:bg-zinc-50 border-border text-zinc-800 hover:scale-[1.01]"
                          }`}
                        >
                          <span className={`h-6 w-6 rounded-full border flex items-center justify-center font-bold text-xs select-none ${
                            isSelected
                              ? "bg-primary border-primary text-white"
                              : "border-zinc-300 text-zinc-400"
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end pb-8 select-none shrink-0">
              <button
                type="submit"
                disabled={!isFormComplete || submitting}
                className={`px-10 py-3.5 rounded-full font-bold text-lg tracking-wide transition-all shadow-sm active:scale-95 duration-250 cursor-pointer ${
                  !isFormComplete || submitting
                    ? "bg-muted text-muted-foreground/60 cursor-not-allowed border border-transparent"
                    : "bg-primary text-primary-foreground hover:bg-primary/95 hover:-translate-y-0.5"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
