import { useNavigate } from "react-router-dom";
import avatar from "@/assets/avatar.svg";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between w-full px-2 sm:px-2 py-2">
      <div
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer select-none"
      >
        <Logo />
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
