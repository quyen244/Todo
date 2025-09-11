import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon, label }) => {
  return (
    <li>
        {/* nav link co ho tro isActive */}
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 
           ${isActive ? "bg-blue-500 text-white" : ""}`
        }
      >
        <span className="mr-3">{icon}</span>
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;

