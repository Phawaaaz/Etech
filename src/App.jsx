import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import GenerationView from "./pages/GenerationView";
import TopicSelectionView from "./pages/TopicSelectionView";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CourseIndexView from "./pages/CourseIndexView";
import CourseModuleView from "./pages/CourseModuleView";
import CourseQuizView from "./pages/CourseQuizView";
import Result from "./pages/Result";
import CreateCourse from "./pages/CreateCourse";
import Onboarding from "./pages/Onboarding";
import SidebarLayout from "./components/layout/SidebarLayout";
import CoursesList from "./pages/CoursesList";
import Settings from "./pages/Settings";
import Community from "./pages/Community";

function ProtectedRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Router>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<SidebarLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/generate" element={<GenerationView />} />
            <Route path="/select-topic" element={<TopicSelectionView />} />
            <Route path="/result" element={<Result />} />
            <Route path="/create-course" element={<CreateCourse />} />
          </Route>

          <Route path="/profile" element={<Profile />} />
          <Route path="/course-index/:courseId" element={<CourseIndexView />} />
          <Route path="/course-module/:courseId/:order" element={<CourseModuleView />} />
          <Route path="/course-quiz/:courseId/:sectionId" element={<CourseQuizView />} />
        </Route>
      </Routes>
    </Router>
  );
}
