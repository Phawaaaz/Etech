import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuButton() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logging out...");
    navigate("/login");
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-1 font-bold text-lg hover:text-gray-600 transition-colors cursor-pointer"
      >
        Menu <span className="text-sm ml-1 ">&#9660;</span>
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-50">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-5 py-2.5 hover:bg-gray-50 font-semibold transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-5 py-2.5 hover:bg-gray-50 font-semibold transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="w-full text-left px-5 py-2.5 hover:bg-gray-50 font-semibold transition-colors"
          >
            Settings
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-2.5 hover:bg-red-50 font-semibold text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
