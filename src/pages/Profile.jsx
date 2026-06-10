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
    <div className="min-h-screen bg-[#03050c] text-white flex flex-col relative w-full overflow-x-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <header className="flex items-center justify-between w-full absolute top-0 left-0 p-6">
        <div
          onClick={() => navigate("/")}
          className="bg-black text-white font-bold text-xl px-4 py-2 rounded-lg border border-gray-800 tracking-wider cursor-pointer select-none"
        >
          E-A.I
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-black font-black px-6 py-2.5 rounded-xl text-base shadow-lg hover:bg-zinc-200 transition-all active:scale-95 cursor-pointer outline-none border-none"
        >
          Log out
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start pt-20 px-6 z-10 w-full max-w-3xl mx-auto pb-20">
        <div className="flex flex-col items-center mb-6">
          <div className="h-44 w-44 rounded-full overflow-hidden border-2 border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-56 h-[2px] bg-zinc-700 mt-8" />
        </div>

        <div className="w-full mt-4 flex flex-col">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => item.path}
              className="flex items-center w-full py-6 border-b border-[#1A1D2D] hover:bg-white/[0.02] cursor-pointer transition-colors px-4 group"
            >
              <div className="w-12 h-12 bg-white rounded-full mr-6 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 shadow-md" />
              <span className="text-2xl font-bold tracking-wide select-none group-hover:text-zinc-200 transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
