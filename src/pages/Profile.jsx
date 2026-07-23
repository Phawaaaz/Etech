import { useNavigate } from "react-router-dom";
import avatar from "@/assets/avatar.svg";
import Logo from "@/components/ui/Logo";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { id: "recents", label: "Recents", path: "/courses" },
    { id: "settings", label: "Settings", path: "/settings" },
    { id: "test-history", label: "Test History", path: "/test-history" },
    { id: "privacy", label: "Privacy", path: "/privacy" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full overflow-x-hidden font-sans pb-16 relative">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <header className="flex items-center justify-between w-full px-6 py-4 border-b border-border bg-card/85 backdrop-blur-md sticky top-0 z-50">
        <div onClick={() => navigate("/dashboard")} className="cursor-pointer select-none">
          <Logo />
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-all duration-250 hover:bg-secondary hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Log out
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 w-full max-w-2xl mx-auto py-12">
        <div className="flex flex-col items-center mb-8">
          <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden border-4 border-card shadow-md">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-32 sm:w-40 h-0.5 bg-border mt-4" />
        </div>

        <div className="w-full flex flex-col bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          {menuItems.map((item, idx) => (
            <button
              type="button"
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full py-4 hover:bg-secondary/40 cursor-pointer transition-colors px-4 group first:rounded-t-2xl last:rounded-b-2xl ${
                idx !== menuItems.length - 1 ? "border-b border-border/60" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full mr-4 bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 transition-transform group-hover:scale-110">
                {item.label[0]}
              </div>
              <span className="text-base sm:text-lg font-bold tracking-wide select-none group-hover:text-primary transition-colors text-left flex-1">
                {item.label}
              </span>
              <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
