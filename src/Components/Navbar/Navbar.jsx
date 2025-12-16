import React, { use } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../Theme/ThemeToggle";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { signOutUser, user } = use(AuthContext);
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/books">Books</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="relative overflow-hidden bg-base-100 shadow-sm">
      {/* Moving glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="" />
      </div>

      {/* Drawer wrapper */}
      <div className="drawer lg:drawer-open relative z-10">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <div className="navbar max-w-7xl mx-auto w-full">
            {/* Left */}
            <div className="navbar-start">
              <label
                htmlFor="main-drawer"
                className="btn btn-ghost lg:hidden"
                aria-label="open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <span className="btn btn-ghost text-xl">Book Blitz</span>
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            {/* Right */}
            <div className="navbar-end gap-2">
              <ThemeToggle />
              {user ? (
                <>
                  <button onClick={signOutUser} className="btn btn-primary">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="btn btn-primary">
                    Login
                  </Link>
                  <Link to="/auth/register" className="btn btn-primary">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Drawer sidebar */}
        <div className="drawer-side lg:hidden">
          <label htmlFor="main-drawer" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-64 bg-base-200 p-4">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
