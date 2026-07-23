import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { toast } from "sonner";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", path: "/dashboard" },
    { id: "courses", label: "Courses", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", path: "/courses" },
    { id: "community", label: "Community", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", path: "/community" },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", path: "/settings" },
    { id: "logout", label: "Log Out", icon: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 14l5-5m0 0l-5-5m5 5H9", action: "logout" },
  ];

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-background font-sans overflow-hidden">
      {/* Desktop Sidebar (Collapsible Drawer) */}
      <aside 
        className={`hidden md:flex h-full bg-card border-r border-border flex-col pt-6 pb-6 px-4 shrink-0 shadow-xs z-20 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[88px]" : "w-[260px]"
        }`}
      >
        {/* Top Header & Toggle */}
        <div className={`flex items-center mb-10 ${isCollapsed ? "justify-center" : "justify-between"} px-2`}>
          {!isCollapsed && (
            <div className="cursor-pointer select-none" onClick={() => navigate("/")}>
              <Logo />
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground hover:bg-zinc-100 p-2 rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 flex flex-col gap-1.5">
          <div className={`px-3 mb-2 transition-opacity duration-200 ${isCollapsed ? "opacity-0 invisible h-0 mb-0" : "opacity-100"}`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 whitespace-nowrap">Main Menu</span>
          </div>
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-foreground"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Nav */}
        <nav className="flex flex-col gap-1.5 mt-auto border-t border-border/50 pt-4">
          <div className={`px-3 mb-2 transition-opacity duration-200 ${isCollapsed ? "opacity-0 invisible h-0 mb-0" : "opacity-100"}`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 whitespace-nowrap">Preferences</span>
          </div>
          {bottomItems.map((item) => {
            const isActive = item.path ? location.pathname.startsWith(item.path) : false;
            return (
              <button
                key={item.id}
                onClick={item.action === "logout" ? handleLogout : () => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-foreground"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative bg-background pb-[80px] md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 px-2 py-2 flex justify-around pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_15px_rgba(0,0,0,0.03)]">
        {[...menuItems, ...bottomItems].map((item) => {
          const isActive = item.path ? location.pathname.startsWith(item.path) : false;
          return (
            <button
              key={item.id}
              onClick={item.action === "logout" ? handleLogout : () => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-zinc-100"
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
