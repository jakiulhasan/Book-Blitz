import React, { use } from "react";
import { Link, NavLink } from "react-router";
import {
  Search,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  Book,
  Home,
  Menu,
} from "lucide-react";
import ThemeToggle from "../Theme/ThemeToggle";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const role = useRole();
  console.log(role);
  const { signOutUser, user } = use(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          <Home size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books">
          <Book size={18} /> Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-categories">Categories</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-1000 bg-base-100/80 backdrop-blur-md border-b border-base-200">
      <div className="drawer lg:drawer-none">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Changed navbar class to ensure space distribution */}
          <div className="navbar max-w-7xl mx-auto w-full flex justify-between">
            {/* Navbar Start: Logo & Mobile Toggle */}
            {/* Added w-full sm:w-auto to prevent collapsing */}
            <div className="navbar-start w-auto flex-1 md:flex-none">
              <label
                htmlFor="main-drawer"
                className="btn btn-ghost lg:hidden p-2 mr-2"
                aria-label="open menu"
              >
                <Menu size={24} />
              </label>
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-content font-black text-xl group-hover:rotate-12 transition-transform">
                  B
                </div>
                <span className="text-xl font-bold tracking-tighter hidden sm:block">
                  Book<span className="text-primary">Blitz</span>
                </span>
              </Link>
            </div>

            {/* Navbar Center: Search Bar (Desktop) */}
            {/* flex-grow helps push start and end apart */}
            <div className="navbar-center hidden md:flex grow justify-center max-w-md mx-4">
              <div className="join w-full shadow-sm">
                <input
                  className="input input-bordered join-item w-full focus:outline-none focus:border-primary"
                  placeholder="Search titles, authors..."
                />
                <button className="btn btn-primary join-item px-6">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Navbar End: User Profile */}
            {/* flex-none ensures it stays at the end without expanding */}
            <div className="navbar-end w-auto flex-none gap-2">
              <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium gap-1">
                  {navLinks}
                </ul>
              </div>

              <div className="h-8 w-px bg-base-300 mx-2 hidden lg:block"></div>

              <ThemeToggle />

              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="avatar online p-1 hover:bg-base-200 rounded-full transition-colors"
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL} alt="profile" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1001 w-52 p-2 shadow-2xl border border-base-200 mt-4"
                  >
                    <li className="menu-title text-base-content/50">Account</li>
                    <li>
                      <Link to="/profile">
                        <User size={16} /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings">
                        <Settings size={16} /> Settings
                      </Link>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <button
                        onClick={signOutUser}
                        className="text-error hover:bg-error/10"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/auth/login"
                    className="btn btn-ghost btn-sm hidden sm:flex"
                  >
                    Login
                  </Link>
                  <Link to="/auth/register" className="btn btn-primary btn-sm">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Drawer Sidebar */}
        <div className="drawer-side lg:hidden z-2000">
          <label htmlFor="main-drawer" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-72 bg-base-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-8 border-b pb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-content font-bold">
                B
              </div>
              <span className="font-bold text-xl">BookBlitz</span>
            </div>

            <div className="join w-full mb-4">
              <input
                className="input input-sm input-bordered join-item w-full focus:outline-none"
                placeholder="Search..."
              />
              <button className="btn btn-sm btn-primary join-item">
                <Search size={16} />
              </button>
            </div>

            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
