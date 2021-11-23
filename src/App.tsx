import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopBar } from "./Layout/topbar";
import "./App.css";
import { Games } from "./Pages/games";
import { AdminLoginPage } from "./Pages/login";

function App() {
  return (
    <Router>
      <div>
        <TopBar />
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<AdminLoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;