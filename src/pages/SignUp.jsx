import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center animate-fadeIn font-sans">
      <button
        onClick={() => navigate("/")}
        className="text-zinc-500 text-sm hover:text-white mb-10 transition-colors self-center font-semibold"
      >
        ← Back to Home
      </button>
    </div>
  );
}
