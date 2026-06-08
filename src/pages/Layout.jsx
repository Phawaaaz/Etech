import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  const { pathname } = useLocation();
  const isDark = pathname === "/dashboard";

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} flex items-center justify-center relative font-sans p-6`}
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Header />
        <main className="w-full flex flex-col items-center mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
