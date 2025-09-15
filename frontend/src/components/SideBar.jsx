import React from 'react';
import { FaPlus, FaSearch, FaInbox, FaCalendarDay, FaCalendarAlt, FaFilter, FaCheckCircle, FaFolder, FaQuestionCircle } from 'react-icons/fa';
import NavItem from './NavItem';
import PropTypes from 'prop-types';
import ButtonAddTask from './Tasks/ButtonAdd';

const routes = [
  { to: "today", icon: <FaInbox/>, label: "Today" },
  { to: "upcoming", icon: <FaCalendarAlt/>, label: "Upcoming" },
  { to: "progress", icon: <FaCheckCircle/>, label: "Progress" }
];


const NavMenu = ({ routes }) => (
  <>
    {routes.map((route, i) => (
      <NavItem key={i} {...route} idx={i} />
    ))}
  </>
);

NavMenu.propTypes = {
routes: PropTypes.array.isRequired,
};

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header with user */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">Q</span>
          </div>
          <span className="font-medium text-gray-900">Quyền</span>
          <div className="ml-auto">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="p-4">
        <ButtonAddTask/>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          <NavMenu routes = {routes}/>
        </div>
      </nav>

      {/* Help & Resources */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 py-2 px-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
          <FaQuestionCircle className="w-4 h-4 text-orange-500" />
          <span className="text-sm">Help & resources</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

        // {/* Projects Section */}
        // <div className="mt-6">
        //   <div className="flex items-center gap-2 py-2 px-2 text-gray-700">
        //     <FaFolder className="w-4 h-4 text-orange-500" />
        //     <span className="font-medium">My Projects</span>
        //     <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        //     </svg>
        //   </div>
          
        //   {/* Project item */}
        //   <div className="ml-6 py-2 px-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
        //     <div className="flex items-center gap-3">
        //       <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        //       <span>hihi</span>
        //       <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        //       </svg>
        //     </div>
        //   </div>
        // </div>