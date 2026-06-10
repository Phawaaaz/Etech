import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import GenerationView from "./pages/GenerationView";
import TopicSelectionView from "./pages/TopicSelectionView";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate" element={<GenerationView />} />
          <Route path="/select-topic" element={<TopicSelectionView />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
