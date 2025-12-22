import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
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
  const { role } = useRole();
  const { signOutUser, user } = use(AuthContext);

  // Animation Variants for Links
  const navLinkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const navLinks = (
    <>
      {[
        { to: "/", icon: <Home size={18} />, label: "Home" },
        { to: "/books", icon: <Book size={18} />, label: "All Books" },
      ].map((link, i) => (
        <motion.li
          key={link.to}
          custom={i}
          initial="initial"
          animate="animate"
          variants={navLinkVariants}
        >
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }
          >
            {link.icon} {link.label}
          </NavLink>
        </motion.li>
      ))}
      {user && (
        <motion.li
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <NavLink
            to={`/${role}/dashboard`}
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
        </motion.li>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-100 bg-base-100/80 backdrop-blur-md border-b border-base-200"
    >
      {/* Drawer Container */}
      <div className="drawer">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Main Navbar */}
          <div className="navbar max-w-7xl mx-auto w-full flex justify-between px-4">
            {/* Navbar Start: Logo & Mobile Toggle */}
            <div className="navbar-start w-auto flex-1 md:flex-none">
              <label
                htmlFor="main-drawer"
                className="btn btn-ghost lg:hidden p-2 mr-2 drawer-button"
              >
                <Menu size={24} />
              </label>

              <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-content font-black text-xl"
                >
                  B
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-bold tracking-tighter hidden sm:block"
                >
                  Book<span className="text-primary">Blitz</span>
                </motion.span>
              </Link>
            </div>

            {/* Navbar Center: Search Bar (Desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="navbar-center hidden md:flex grow justify-center max-w-md mx-4"
            >
              <div className="join w-full shadow-sm border border-base-300 rounded-lg overflow-hidden">
                <input
                  className="input join-item w-full focus:outline-none"
                  placeholder="Search titles, authors..."
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary join-item px-6 border-none"
                >
                  <Search size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Navbar End */}
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    tabIndex={0}
                    role="button"
                    className="avatar online p-1 hover:bg-base-200 rounded-full transition-colors cursor-pointer"
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL} alt="profile" />
                    </div>
                  </motion.div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-101 w-52 p-2 shadow-2xl border border-base-200 mt-4"
                  >
                    <li className="menu-title text-base-content/50">Account</li>
                    <li>
                      <Link to={`/${role}/dashboard`}>
                        <User size={16} /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${role}/dashboard`}>
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
        <div className="drawer-side z-200">
          <label
            htmlFor="main-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            {/* Sidebar Logo */}
            <div className="flex items-center gap-2 mb-8 px-4 py-2 border-b border-base-200">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-content font-bold">
                B
              </div>
              <span className="font-bold text-xl">BookBlitz</span>
            </div>

            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="join w-full">
                <input
                  className="input input-sm input-bordered join-item w-full"
                  placeholder="Search..."
                />
                <button className="btn btn-sm btn-primary join-item">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-2">{navLinks}</div>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
