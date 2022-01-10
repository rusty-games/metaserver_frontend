import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopBar } from "./Layout/topbar";
import "./App.css";
import { Games } from "./Pages/games";
import { AdminLoginPage } from "./Pages/login";
import { RoomPage } from "./Pages/rooms";
import { WaitingRoom } from "./Pages/waiting_room";

function App() {
  return (
    <Router>
      <div>
        <TopBar />
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id/rooms" element ={<RoomPage/>}/>
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/rooms/:id" element={<WaitingRoom/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
