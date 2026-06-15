import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-3xl font-black tracking-wider select-none text-white">
          E-A.I
        </div>

        <nav className="hidden md:flex items-center gap-10 text-gray-300 text-lg font-medium">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center gap-6">
          <button className=" text-lg font-bold hover:text-gray-300 transition-colors">
            <span
              className="cursor-pointer hover:text-[#4C1D95] transition-colors"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
            /{" "}
            <span
              className="cursor-pointer hover:text-[#4C1D95] transition-colors"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </span>
          </button>
          <button
            onClick={() => navigate("/generate")}
            className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md active:scale-95"
          >
            Generate a course
          </button>
        </div>
      </div>
    </header>
  );
}
