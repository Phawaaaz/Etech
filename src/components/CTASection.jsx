import { useNavigate } from "react-router-dom";
import mascot from "../assets/mascot.png";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-white py-14 px-6">
      <div className="max-w-4xl mx-auto bg-[#E8E9FA] rounded-2xl p-8 md:p-10 flex items-center justify-between shadow-sm border border-indigo-100/20">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 flex-1">
          <h3 className="text-1xl md:text-2xl font-black text-black tracking-tight">
            Ready to accelerate your learning ?
          </h3>
          <p className="text-[#2E2AA6] font-bold text-sm md:text-base mb-4">
            Generate your first course today
          </p>
          <button
            onClick={() => navigate("/generate")}
            className="w-full max-w-xs bg-gradient-to-r from-[#2917A8] via-[#63139C] to-[#1A62B8] text-white font-extrabold px-10 py-3.5 rounded-xl text-lg border-2 border-white/90 shadow-md hover:shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            Generate course
          </button>
        </div>

        <div className="w-36 h-36 md:w-44 md:h-44 shrink-0 flex items-center justify-center select-none z-10">
          <img
            src={mascot}
            alt="AI Robot Mascot"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] animate-pulse"
          />
        </div>
      </div>
    </section>
  );
}
