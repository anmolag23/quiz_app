import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Quiz from "./components/Quiz";
import Results from "./components/Results";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" />} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/results" element={<Results/>} />
      </Routes>
    </Router>
  );
}
