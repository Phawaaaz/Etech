import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Your AI Personal Tutor",
      description:
        "E-Tech reads any topic you suggest and crafts a comprehensive, structured university-level course curriculum in seconds.",
      image: (
        <div className="w-full h-48 bg-primary/5 rounded-2xl border border-border/60 flex items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="space-y-3 w-full max-w-xs relative z-10">
            <div className="h-4 w-3/4 bg-primary/15 rounded-full" />
            <div className="h-3 w-full bg-zinc-200 rounded-full" />
            <div className="h-3 w-5/6 bg-zinc-200 rounded-full" />
            <div className="h-3 w-2/3 bg-zinc-200 rounded-full" />
          </div>
        </div>
      ),
    },
    {
      title: "Flexible Learning Mediums",
      description:
        "Study detailed textbook chapters, read common student pitfalls, inspect code examples, and test yourself with scenario quizzes.",
      image: (
        <div className="w-full h-48 bg-primary/5 rounded-2xl border border-border/60 flex items-center justify-center gap-3 p-4 relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-secondary/15 rounded-full blur-xl" />
          {["Text", "Audio", "Quiz", "Code"].map((medium, idx) => (
            <div
              key={medium}
              style={{ animationDelay: `${idx * 150}ms` }}
              className="px-4 py-2 bg-card border border-border/80 rounded-xl font-bold text-xs shadow-sm text-primary select-none transform hover:-translate-y-1 transition duration-300 animate-bounce"
            >
              {medium}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Earn Credentials & Stats",
      description:
        "Mark sections as completed, track your learning hours, check correct answers with explanations, and watch your achievements grow.",
      image: (
        <div className="w-full h-48 bg-primary/5 rounded-2xl border border-border/60 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="flex items-baseline gap-1 text-primary font-black text-4xl mb-3">
            <span>85</span>
            <span className="text-sm font-extrabold text-zinc-500 uppercase tracking-widest">%</span>
          </div>
          <div className="w-full max-w-xs bg-zinc-200 rounded-full h-3 p-0.5 overflow-hidden flex items-center">
            <div className="bg-primary h-full rounded-full w-[85%] transition-all duration-700" />
          </div>
          <span className="text-3xs text-primary font-extrabold uppercase mt-2.5 tracking-wider select-none">
            MODULES COMPLETED
          </span>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    localStorage.setItem("onboarded", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col relative z-10 min-h-[500px]">
        {/* Header logo and skip */}
        <div className="flex justify-between items-center mb-8 select-none">
          <Logo />
          <button
            onClick={handleFinish}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Skip
          </button>
        </div>

        {/* Slide content container */}
        <div className="flex-1 flex flex-col justify-center">
          {slides[currentSlide].image}
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-black text-zinc-950 uppercase tracking-tight mb-3">
              {slides[currentSlide].title}
            </h2>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm mx-auto">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Footer controls */}
        <div className="mt-8 flex items-center justify-between select-none">
          {/* Progress dots */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-6 bg-primary" : "w-2 bg-zinc-200"
                }`}
              />
            ))}
          </div>

          {/* Action button */}
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-full shadow-sm hover:bg-primary/95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250 cursor-pointer"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
