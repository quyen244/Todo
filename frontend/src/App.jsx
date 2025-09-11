
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TaskPage";
import CalendarPage from "./pages/CalendarPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";
import Sidebar from "./components/SideBar";
import './index.css';
function App() {
  return (
  <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />


        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/profile" element={<ProfilePage />} />
         
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
