// Layout.jsx - Refactored
import CalendarPage from "../pages/CalendarPage";
import ProgressPage from "../pages/ProgressPage";
import ProfilePage from "../pages/ProfilePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TaskPage";
import SideBarHome from "./Home/SideBarHome";
import Sidebar from "./Sidebar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Layout() {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    const isAuthPage = location.pathname === "/signup" || location.pathname === "/signin";

    return (
      <div className="flex h-screen">
        {!isAuthPage && (
          <div className="fixed left-0 top-0 h-full z-50">
            <SideBarHome />
          </div>
        )}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
             <Route path="/home" element={<HomePage />} /> 
             <Route path="/signup" element={<SignUp />} /> 
             <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <main className="flex-1 ml-64 p-6 bg-gray-100">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/today" element={<TasksPage />} />
          <Route path="/upcoming" element={<CalendarPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}


export default Layout;
