import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      className="w-full max-w-7xl mx-auto px-6 pt-12 text-center
     items-center"
    >
      <div className="flex flex-col items-center px-25 gap-6 text-center">
        <h3 className="text-5xl md:text-6xl px-15 font-extrabold text-white">
          Generate complete courses with AI
        </h3>
        <p className="text-white text-lg px-6 md:text-xl max-w-md font-medium">
          Describe what you want to learn and get a personalized lesson in
          seconds.
        </p>
        <div className="flex items-center gap-4 mt-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/generate")}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Generate Course
          </button>
          <button className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
            <span>▶</span> Demo
          </button>
        </div>
      </div>
    </section>
  );
}
