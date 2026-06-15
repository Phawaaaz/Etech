import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EtechProvider } from "./context/EtechContext";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import GenerationView from "./pages/GenerationView";
import TopicSelectionView from "./pages/TopicSelectionView";
import ResultView from "./pages/ResultView";

export default function App() {
  return (
    <EtechProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/generate" element={<GenerationView />} />
            <Route path="/select-topic" element={<TopicSelectionView />} />
            <Route path="/result" element={<ResultView />} />
          </Route>
        </Routes>
      </Router>
    </EtechProvider>
  );
}
