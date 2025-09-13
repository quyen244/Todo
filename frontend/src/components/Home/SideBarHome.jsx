import React from "react";
import PropTypes from "prop-types";
import NavItem from "../NavItem";
import { NavLink } from "react-router";

const routes = [
    { to: "home", icon: null, label: "Home" },
    { to: "solutions", icon: null, label: "Solutions" },
    { to: "why", icon: null, label: "Why us?" },
    { to: "features", icon: null, label: "Features" },
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


const AuthNavMenu = () => (
  <>
    <li>
      <NavLink to="/signin">
        <button className="border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white py-2 px-6 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md" 
>
          Sign In
        </button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/signup">
        <button className="bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 py-2 px-6 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
 >
          Sign Up
        </button>
      </NavLink>
    </li>
  </>
);
        
const SideBarHome = () => {
	return (
		<div className="">
			<nav>
				<div className="fixed top-0 left-0 w-screen bg-gradient-to-br from-[#EFEFBB] to-[#D4D3DD] shadow-lg border-b border-amber-200 z-50 p-3">
					<div className="flex justify-between items-center px-8 py-4">
						<a 
							className="font-black text-3xl text-amber-900 hover:text-amber-800 transition-colors duration-300 pl-16" 
							href="#!"
						>
							Easy Frontend
						</a>
						
						<ul className="flex justify-between items-center gap-6 pr-16" id="navbar">
							<NavMenu routes={routes} />
							<AuthNavMenu />
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default SideBarHome;