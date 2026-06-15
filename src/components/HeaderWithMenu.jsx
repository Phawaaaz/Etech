import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg";
import MenuButton from "./MenuButton";

export default function HeaderWithMenu() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 md:px-8 py-4 bg-white z-50 relative">
      <div className="flex items-center gap-5 md:gap-6">
        <div
          onClick={() => navigate("/dashboard")}
          className="font-black text-2xl tracking-wider cursor-pointer select-none"
        >
          E-A.I
        </div>
        <MenuButton />
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
