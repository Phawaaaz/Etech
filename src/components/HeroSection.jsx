import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 flex flex-col items-start gap-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Generate complete courses with AI
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-md font-medium leading-relaxed">
          Describe what you want to learn and get a personalized lesson in
          seconds.
        </p>
        <div className="flex items-center gap-4 mt-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/generate")}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all"
          >
            Generate Course
          </button>
          <button className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all">
            <span>▶</span> Demo
          </button>
        </div>
      </div>
    </section>
  );
}
