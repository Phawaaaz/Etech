import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between w-full absolute top-0 left-0 p-6">
      <div
        onClick={() => navigate("/dashboard")}
        className="bg-black text-white font-bold text-xl px-4 py-2 rounded-lg border border-gray-800 tracking-wider cursor-pointer select-none"
      >
        E-A.I
      </div>
      <button
        onClick={() => navigate("/profile")}
        className="h-12 w-12 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-500 transition-all cursor-pointer"
      >
        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
      </button>
    </header>
  );
}
