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
  Library,
  Heart,
  Layers,
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

  const navLinksData = [
    { to: "/", icon: <Home size={18} />, label: "Home" },
    { to: "/books", icon: <Book size={18} />, label: "All Books" },
    { to: "/categories", icon: <Layers size={18} />, label: "Request a Book" },
    {
      to: "/trending",
      icon: <Heart size={18} className="text-red-500" />,
      label: "Whishlist",
    },
  ];

  const renderNavLinks = (isMobile = false) => (
    <>
      {navLinksData.map((link, i) => (
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
              `flex items-center gap-2 ${
                isActive ? "text-primary font-bold" : ""
              }`
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
          transition={{ delay: 0.4 }}
        >
          <NavLink
            to={`/${role}/dashboard`}
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-primary font-bold" : ""
              }`
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
      className="sticky top-0 z-[100] bg-base-100/80 backdrop-blur-md border-b border-base-200"
    >
      <div className="drawer">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Main Navbar */}
          <div className="navbar max-w-7xl mx-auto w-full flex justify-between px-4 h-16">
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
                  className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-content font-black text-xl shadow-lg shadow-primary/20"
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
              className="navbar-center hidden md:flex grow justify-center max-w-md mx-8"
            >
              <div className="join w-full shadow-sm border border-base-300 rounded-lg overflow-hidden group focus-within:border-primary transition-colors">
                <input
                  className="input join-item w-full focus:outline-none bg-base-100"
                  placeholder="Search titles, authors..."
                />
                <button className="btn btn-primary join-item px-6 border-none">
                  <Search size={20} />
                </button>
              </div>
            </motion.div>

            {/* Navbar End */}
            <div className="navbar-end w-auto flex-none gap-2">
              <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium gap-1">
                  {renderNavLinks()}
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
                      <img
                        src={
                          user?.photoURL ||
                          "https://ui-avatars.com/api/?name=" +
                            user?.displayName
                        }
                        alt="profile"
                      />
                    </div>
                  </motion.div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[101] w-56 p-2 shadow-2xl border border-base-200 mt-4"
                  >
                    <li className="menu-title text-xs uppercase tracking-widest opacity-50">
                      Personal Shelf
                    </li>
                    <li>
                      <Link
                        to={`/${role}/my-library`}
                        className="flex justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Library size={16} /> My Library
                        </span>
                        <span className="badge badge-sm badge-ghost">4</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${role}/wishlist`}>
                        <Heart size={16} className="text-secondary" /> Wishlist
                      </Link>
                    </li>

                    <div className="divider my-1"></div>
                    <li className="menu-title text-xs uppercase tracking-widest opacity-50">
                      Settings
                    </li>
                    <li>
                      <Link to={`/${role}/dashboard`}>
                        <User size={16} /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${role}/settings`}>
                        <Settings size={16} /> Preferences
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
                  <Link
                    to="/auth/register"
                    className="btn btn-primary btn-sm px-6"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Drawer Sidebar */}
        <div className="drawer-side z-[200]">
          <label
            htmlFor="main-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content flex flex-col gap-2">
            {/* Sidebar Logo */}
            <div className="flex items-center gap-3 mb-6 px-4 py-4 border-b border-base-200">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-content font-bold shadow-lg">
                B
              </div>
              <span className="font-bold text-2xl tracking-tight">
                BookBlitz
              </span>
            </div>

            {/* Mobile Search */}
            <div className="px-2 mb-4">
              <div className="join w-full">
                <input
                  className="input input-bordered join-item w-full focus:outline-none"
                  placeholder="Search books..."
                />
                <button className="btn btn-primary join-item">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col">
              <li className="menu-title text-xs uppercase opacity-50 px-4 mb-2">
                Navigation
              </li>
              {renderNavLinks(true)}
            </div>

            {user && (
              <div className="mt-auto border-t border-base-200 pt-4">
                <div className="flex items-center gap-3 px-4 mb-4">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user?.photoURL} alt="user" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm truncate w-40">
                      {user?.displayName}
                    </p>
                    <p className="text-xs opacity-50 uppercase">{role}</p>
                  </div>
                </div>
                <li>
                  <button
                    onClick={signOutUser}
                    className="btn btn-error btn-outline btn-sm mx-4"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
