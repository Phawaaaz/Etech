import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import GenerationView from "./pages/GenerationView";
import TopicSelectionView from "./pages/TopicSelectionView";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/generate" element={<GenerationView />} />
          <Route path="/select-topic" element={<TopicSelectionView />} />
        </Route>
      </Routes>
    </Router>
  );
}
