import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";

export default function Layout() {
  const { pathname } = useLocation();
  const isCenteredPage =
    pathname === "/dashboard" ||
    pathname === "/generate" ||
    pathname === "/select-topic";

  const onboarded = localStorage.getItem("onboarded") === "true";
  if (!onboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground flex ${isCenteredPage ? "items-center" : "items-start"} justify-center relative font-sans p-6 overflow-hidden`}
    >
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div
        className={`w-full max-w-5xl flex flex-col items-center z-10 ${isCenteredPage ? "justify-center min-h-[calc(100vh-3rem)]" : ""}`}
      >
        <Header />
        <main
          className={`w-full flex flex-col items-center ${isCenteredPage ? "flex-1 justify-center" : "mt-10"}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
