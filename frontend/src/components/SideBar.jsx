
import { FaTasks, FaCalendarAlt, FaChartPie, FaUser } from "react-icons/fa";
// Sidebar Component
import NavItem from "./NavItem";
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
      
      {/* Logo */}
      <div className="p-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <FaTasks className="text-white text-sm" />
          </div>
          <span>TodoFlow</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 relative z-10 px-4">
        <ul className="space-y-3">
          <NavItem 
            to="tasks" 
            icon={<FaTasks />} 
            label="Tasks" 
          />
          <NavItem 
            to="calendar" 
            icon={<FaCalendarAlt />} 
            label="Calendar" 
          />
          <NavItem 
            to="progress" 
            icon={<FaChartPie />} 
            label="Progress" 
          />
          <NavItem 
            to="profile" 
            icon={<FaUser />} 
            label="Profile" 
          />
        </ul>
      </nav>
      
      {/* Bottom decoration */}
      <div className="p-6 relative z-10">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <p className="text-white/70 text-sm">Stay productive!</p>
          <p className="text-white/50 text-xs mt-1">4 tasks remaining</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
