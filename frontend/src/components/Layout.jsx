
import CalendarPage from "../pages/CalendarPage";
import ProgressPage from "../pages/ProgressPage";
import ProfilePage from "../pages/ProfilePage";
import SignIn from "../pages/SignIn";
import SideBarHome from "./Home/SideBarHome";
import { useLocation } from "react-router";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import TasksPage from "../pages/TaskPage";
import { Routes } from "react-router";
import { Route } from "react-router";
function Layout() {
  const isAuth = false
  const location = useLocation()

  // Kiểm tra nếu đang ở signup hoặc signin
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/signin"

  return (
 
      <div className="flex h-screen">
        <div>
          {!isAuth ? 
          <div>
               {!isAuthPage && <SideBarHome />}
            <div>
              <Routes>
              <Route path = '/' element = {<HomePage/>} />
                <Route path = '/home' element = {<HomePage/>} />
                <Route path = '/signup' element = {<SignUp/>} />
                <Route path = '/signin' element = {<SignIn/>} />
              </Routes>
            </div>
          </div>
           : 
          <div>
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
          }
        </div>
      </div>
  );
}

export default Layout;
