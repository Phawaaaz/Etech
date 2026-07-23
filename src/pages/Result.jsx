import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { OctagonXIcon } from "lucide-react";

// A simple local Markdown parser helper for the Text format
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split("\n");
  let inList = false;
  const listItems = [];

  const rendered = lines.map((line, idx) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith("###")) {
      return (
        <h3 key={idx} className="text-xl font-bold text-zinc-800 mt-6 mb-2">
          {parseBoldText(trimmed.slice(3).trim())}
        </h3>
      );
    }
    if (trimmed.startsWith("##")) {
      return (
        <h2 key={idx} className="text-2xl font-bold text-zinc-900 mt-8 mb-3 border-b pb-2">
          {parseBoldText(trimmed.slice(2).trim())}
        </h2>
      );
    }
    if (trimmed.startsWith("#")) {
      return (
        <h1 key={idx} className="text-3xl font-extrabold text-black mt-10 mb-4">
          {parseBoldText(trimmed.slice(1).trim())}
        </h1>
      );
    }

    // List item
    if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      return (
        <li key={idx} className="ml-6 list-disc text-zinc-700 mb-2 leading-relaxed">
          {parseBoldText(trimmed.slice(1).trim())}
        </li>
      );
    }

    // Normal paragraph
    if (trimmed === "") {
      return <div key={idx} className="h-4" />;
    }

    return (
      <p key={idx} className="text-zinc-700 mb-4 leading-relaxed">
        {parseBoldText(trimmed)}
      </p>
    );
  });

  return <div className="text-left select-text">{rendered}</div>;
}

// Parses **bold** text in a string and returns a React fragment
function parseBoldText(text) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return <strong key={idx} className="font-bold text-zinc-950">{part}</strong>;
    }
    return part;
  });
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { format, prompt, topic, level } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing generator...");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Image zoom overlay state
  const [isZoomed, setIsZoomed] = useState(false);

  // Loading messages rotation
  const loadingMessages = [
    "Contacting Groq AI educational engine...",
    "Generating comprehensive topic context...",
    "Structuring content for level-appropriate learning...",
    "Applying cognitive accessibility parameters...",
    "Formatting output data structures...",
    "Finalizing resources...",
  ];

  // Effect to redirect if state is missing
  useEffect(() => {
    if (!format || !prompt || !topic || !level) {
      navigate("/dashboard", { replace: true });
    }
  }, [format, prompt, topic, level, navigate]);

  // Effect to fetch from backend
  useEffect(() => {
    if (!format || !prompt || !topic || !level) return;

    let progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 98;
        }
        const step = Math.floor(Math.random() * 10) + 2;
        return Math.min(prev + step, 98);
      });

      setLoadingMessage((prev) => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        return loadingMessages[randomIndex];
      });
    }, 800);

    fetch("https://etechbackend.onrender.com/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ format, prompt, topic, level }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || "Failed to generate educational content.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setResult(data.data);
          setLoadingProgress(100);
          setLoading(false);
        } else {
          throw new Error("API responded with failure status.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "An unexpected network error occurred. Please check if backend is running.");
        setLoading(false);
      })
      .finally(() => {
        clearInterval(progressInterval);
      });

    return () => {
      clearInterval(progressInterval);
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [format, prompt, topic, level]);

  // ── Audio Handler ──────────────────────────────────────────────────────────
  const toggleSpeech = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused && utteranceRef.current) {
        synthRef.current.resume();
        setIsPlaying(true);
      } else {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(result.content);
        utterance.rate = playbackRate;
        utterance.onend = () => {
          setIsPlaying(false);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
        };
        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const stopSpeech = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (utteranceRef.current && synthRef.current) {
      synthRef.current.cancel();
      utteranceRef.current.rate = playbackRate;
      if (isPlaying) {
        synthRef.current.speak(utteranceRef.current);
      }
    }
  }, [playbackRate]);

  // ── Quiz Selection ──────────────────────────────────────────────────────────
  const selectQuizOption = (qIdx, option) => {
    if (quizAnswers[qIdx]) return; // Answer already selected
    const updatedAnswers = { ...quizAnswers, [qIdx]: option };
    setQuizAnswers(updatedAnswers);

    const questions = result.content;
    const isCorrect = questions[qIdx].answer.toLowerCase() === option.toLowerCase();
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }

    // Check if quiz finished
    if (Object.keys(updatedAnswers).length === questions.length) {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizAnswers({});
    setQuizFinished(false);
    setQuizScore(0);
  };

  if (!format || !prompt || !topic || !level) return null;

  // ── Render Loading ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Card className="w-full max-w-2xl border border-border p-8 text-center flex flex-col items-center shadow-sm bg-card">
        <CardHeader className="flex flex-col items-center">
          <div className="relative w-36 h-36 mb-6">
            <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-primary rounded-full animate-spin"
              style={{ borderTopColor: "transparent", animationDuration: "1.5s" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-primary">{loadingProgress}%</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-zinc-950 uppercase">Assembling Resources</CardTitle>
          <CardDescription className="text-muted-foreground text-base italic font-medium mt-1">{loadingMessage}</CardDescription>
        </CardHeader>

        {/* Shimmer layout */}
        <CardContent className="w-full mt-4 space-y-4 opacity-40">
          <div className="h-4 bg-zinc-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-zinc-200 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-zinc-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-3 bg-zinc-200 rounded w-2/3 animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // ── Render Error ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <Card className="w-full max-w-2xl border border-red-200 bg-red-50/20 p-8 text-center flex flex-col items-center shadow-sm">
        <CardHeader className="flex flex-col items-center">
          <div className="h-16 w-16 bg-red-100/60 rounded-full flex items-center justify-center mb-4">
            <OctagonXIcon className="h-8 w-8 text-red-650" />
          </div>
          <CardTitle className="text-2xl font-black text-red-900 uppercase">Generation Failed</CardTitle>
          <CardDescription className="text-red-700 text-base font-semibold leading-relaxed mt-2">{error}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4 border-none bg-transparent justify-center pt-6">
          <button
            onClick={() => navigate("/select-topic", { state: { format, prompt } })}
            className="px-6 py-2.5 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition shadow-sm active:scale-95 duration-250 cursor-pointer"
          >
            Adjust Options
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 border border-border bg-card text-foreground rounded-full font-bold hover:bg-secondary transition shadow-sm active:scale-95 duration-250 cursor-pointer"
          >
            Go back to Dashboard
          </button>
        </CardFooter>
      </Card>
    );
  }

  // ── Render Success Content ────────────────────────────────────────────────
  return (
    <div className="w-full max-w-4xl px-4 flex flex-col items-center pb-20 font-sans">
      {/* Header Info */}
      <div className="w-full bg-indigo-50/80 border border-indigo-100/50 rounded-3xl p-6 mb-8 flex flex-wrap justify-between items-center gap-4 shadow-sm text-left">
        <div>
          <span className="text-xs uppercase tracking-widest bg-indigo-200/50 text-indigo-700 px-3 py-1 rounded-full font-extrabold mr-2 select-none">
            {result.level}
          </span>
          <span className="text-xs uppercase tracking-widest bg-zinc-200/50 text-zinc-700 px-3 py-1 rounded-full font-extrabold select-none">
            {result.format}
          </span>
          <h2 className="text-2xl font-black text-zinc-900 mt-3">{result.topic}</h2>
          <p className="text-zinc-500 text-sm mt-1">Inspired by: &ldquo;{prompt}&rdquo;</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-zinc-950 text-white font-bold rounded-full hover:bg-zinc-900 hover:scale-105 transition-all shadow-md active:scale-95 select-none"
        >
          Create New Request
        </button>
      </div>

      {/* Format-specific output */}
      <div className="w-full bg-white border border-zinc-200 shadow-xl rounded-3xl p-8 md:p-12 mb-8 min-h-[300px] flex flex-col justify-between">
        
        {/* TEXT FORMAT */}
        {result.format === "text" && (
          <div className="w-full prose prose-indigo max-w-none">
            {renderMarkdown(result.content)}
          </div>
        )}

        {/* AUDIO FORMAT */}
        {result.format === "audio" && (
          <div className="w-full flex flex-col items-center py-6">
            <div className="w-full max-w-md bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col items-center mb-8 relative overflow-hidden">
              
              {/* Visual audio wave representation */}
              <div className="flex items-end gap-1.5 h-16 mb-8 mt-4">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 bg-indigo-600 rounded-full transition-all duration-300 ${
                      isPlaying ? "animate-pulse" : "h-3"
                    }`}
                    style={{
                      height: isPlaying ? `${Math.floor(Math.random() * 48) + 12}px` : "12px",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Speech control button */}
              <div className="flex gap-4 items-center">
                <button
                  onClick={toggleSpeech}
                  className="h-16 w-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={stopSpeech}
                  className="h-12 w-12 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition"
                  title="Stop playing"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z" />
                  </svg>
                </button>
              </div>

              {/* Speed Controller */}
              <div className="w-full mt-8 border-t pt-4 flex justify-between items-center text-zinc-500 font-medium">
                <span className="text-sm">Playback Speed:</span>
                <div className="flex gap-2">
                  {[0.75, 1, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setPlaybackRate(rate)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        playbackRate === rate
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Script Text */}
            <div className="w-full text-left bg-zinc-50 border border-zinc-200 rounded-2xl p-6 select-text">
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Narration Script</h4>
              <p className="text-zinc-700 leading-relaxed font-medium">{result.content}</p>
            </div>
          </div>
        )}

        {/* IMAGE FORMAT */}
        {result.format === "image" && (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-2xl bg-zinc-900 rounded-3xl overflow-hidden group shadow-lg aspect-square border-2 border-zinc-150">
              <img
                src={result.content}
                alt={result.topic}
                className="w-full h-full object-cover transition duration-500 cursor-zoom-in hover:scale-[1.02]"
                onClick={() => setIsZoomed(true)}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <a
                  href={result.content}
                  target="_blank"
                  rel="noreferrer"
                  download={`Etech-${result.topic.replace(/\s+/g, "-")}.png`}
                  className="bg-white/95 backdrop-blur-sm text-zinc-800 p-3 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition shadow-md flex items-center justify-center"
                  title="Download Image"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Prompt explanation */}
            <div className="w-full max-w-2xl mt-8 text-left bg-zinc-50 border border-zinc-200 rounded-2xl p-6 select-text">
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Image Prompts</h4>
              <p className="text-zinc-700 leading-relaxed font-medium">This educational illustration was generated using pollinations.ai rendering.</p>
            </div>

            {/* Image zoom lightbox */}
            {isZoomed && (
              <div
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-zoom-out"
                onClick={() => setIsZoomed(false)}
              >
                <img
                  src={result.content}
                  alt={result.topic}
                  className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                />
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* INTERACTIVE QUIZ FORMAT */}
        {result.format === "interactive" && (
          <div className="w-full">
            {!quizFinished ? (
              <div className="space-y-12">
                {result.content.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[qIdx];
                  const hasAnswered = selectedOpt !== undefined;

                  return (
                    <div key={qIdx} className="bg-zinc-50/50 border border-zinc-200/60 rounded-3xl p-6 text-left shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-sm select-none">
                          {qIdx + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-zinc-850">{q.question}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedOpt === opt;
                          const isCorrect = q.answer.toLowerCase() === opt.toLowerCase();
                          
                          let btnStyle = "bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-800 hover:scale-[1.01]";
                          if (hasAnswered) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                            } else if (isSelected) {
                              btnStyle = "bg-rose-50 border-rose-300 text-rose-800 font-semibold";
                            } else {
                              btnStyle = "bg-white border-zinc-200 text-zinc-400 opacity-60 pointer-events-none";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={hasAnswered}
                              onClick={() => selectQuizOption(qIdx, opt)}
                              className={`w-full py-4 px-6 rounded-2xl border text-left text-base transition duration-200 ${btnStyle}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`h-6 w-6 rounded-full border flex items-center justify-center font-bold text-xs select-none ${
                                  isSelected
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : "border-zinc-300 text-zinc-400"
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className="mt-6 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-sm text-zinc-700 select-text">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-extrabold text-indigo-700">Explanation:</span>
                          </div>
                          <p className="leading-relaxed font-medium">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              // Quiz Finished Screen
              <div className="flex flex-col items-center py-10 text-center">
                <div className="relative h-40 w-40 flex items-center justify-center mb-8">
                  <svg className="h-full w-full text-indigo-100 absolute inset-0" fill="currentColor" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" />
                  </svg>
                  <div className="z-10 flex flex-col items-center">
                    <span className="text-5xl font-black text-indigo-600">{quizScore} / {result.content.length}</span>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Score</span>
                  </div>
                </div>

                <h3 className="text-3xl font-black text-zinc-950 mb-2">
                  {quizScore === result.content.length
                    ? "Perfect Score! 🌟"
                    : quizScore >= result.content.length / 2
                    ? "Well Done! 👍"
                    : "Keep Practicing! 📚"}
                </h3>
                <p className="text-zinc-500 font-medium max-w-md mb-8">
                  You completed the interactive quiz for {result.topic} ({result.level}). Keep testing your knowledge to master the material.
                </p>

                <button
                  onClick={restartQuiz}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIDEO STORYBOARD FORMAT */}
        {result.format === "video" && (
          <div className="w-full text-left space-y-12">
            <h3 className="text-2xl font-black text-zinc-950 mb-8 border-b pb-4">Video Storyboard</h3>
            <div className="relative pl-8 md:pl-12 border-l-2 border-indigo-100 space-y-12">
              {result.content.map((scene, sIdx) => (
                <div key={sIdx} className="relative">
                  
                  {/* Timeline bullet */}
                  <span className="absolute -left-[42px] md:-left-[58px] top-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-indigo-600 text-white border-4 border-white flex items-center justify-center font-extrabold text-sm md:text-base shadow-sm select-none">
                    {scene.scene}
                  </span>

                  {/* Storyboard card */}
                  <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                    <h4 className="text-xl font-bold text-zinc-900 mb-4">{scene.title}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      
                      {/* Visual Description */}
                      <div className="space-y-2 select-text">
                        <div className="flex items-center gap-2 text-indigo-700">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-xs uppercase font-extrabold tracking-wider">Visual Setup</span>
                        </div>
                        <p className="text-zinc-700 text-sm md:text-base font-medium leading-relaxed bg-white border border-zinc-200 p-4 rounded-2xl min-h-[80px]">
                          {scene.visual_description}
                        </p>
                      </div>

                      {/* Narration script */}
                      <div className="space-y-2 select-text">
                        <div className="flex items-center gap-2 text-indigo-700">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                          <span className="text-xs uppercase font-extrabold tracking-wider">Voice Narration</span>
                        </div>
                        <p className="text-zinc-700 text-sm md:text-base font-medium leading-relaxed bg-white border border-zinc-200 p-4 rounded-2xl min-h-[80px]">
                          {scene.narration}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer controls inside output card */}
        <div className="w-full mt-12 pt-6 border-t border-zinc-150 flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => navigate("/select-topic", { state: { format, prompt } })}
            className="px-6 py-2 border border-zinc-300 rounded-full font-bold text-zinc-600 hover:text-zinc-800 hover:bg-zinc-50 active:scale-95 transition"
          >
            Adjust Topic &amp; Level
          </button>
          
          <span className="text-xs text-zinc-400 font-semibold select-none">
            ID: {result.id} | Generated at {new Date(result.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
