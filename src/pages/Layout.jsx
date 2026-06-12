import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  const { pathname } = useLocation();
  const isDark = pathname === "/dashboard";
  const isCenteredPage =
    pathname === "/generate" || pathname === "/select-topic";

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} flex ${isCenteredPage ? "items-center" : "items-start"} justify-center relative font-sans p-6`}
    >
      <div
        className={`w-full max-w-5xl flex flex-col items-center ${isCenteredPage ? "justify-center min-h-[calc(100vh-3rem)]" : ""}`}
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
