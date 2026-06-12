import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg";

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { id: "recents", label: "Recents", path: "/recents" },
    { id: "settings", label: "Settings", path: "/settings" },
    { id: "test-history", label: "Test History", path: "/test-history" },
    { id: "privacy", label: "Privacy", path: "/privacy" },
  ];

  const handleLogout = () => {
    console.log("User logging out...");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#03050c] text-white flex flex-col w-full overflow-x-hidden font-sans">
      <header className="flex items-center justify-between w-full px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-black text-white font-bold text-lg sm:text-xl px-4 py-1.5 rounded-lg border border-gray-800 tracking-wider cursor-pointer select-none"
        >
          E-A.I
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-white text-black font-black px-5 py-1.5 rounded-xl text-sm sm:text-base shadow-lg hover:bg-zinc-200 transition-all active:scale-95 cursor-pointer outline-none border-none"
        >
          Log out
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 w-full max-w-2xl mx-auto py-4 sm:py-6">
        <div className="flex flex-col items-center mb-4 sm:mb-5">
          <div className="h-24 w-24 sm:h-36 sm:w-36 lg:h-40 lg:w-40 rounded-full overflow-hidden border-2 border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-36 sm:w-48 h-[2px] bg-zinc-700 mt-4 sm:mt-6" />
        </div>

        <div className="w-full flex flex-col">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex items-center w-full py-3 sm:py-4 border-b border-[#1A1D2D] hover:bg-white/[0.02] cursor-pointer transition-colors px-3 sm:px-4 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full mr-4 sm:mr-5 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 shadow-md" />
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide select-none group-hover:text-zinc-200 transition-colors text-left">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
