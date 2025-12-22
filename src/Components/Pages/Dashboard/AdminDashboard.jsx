import React, { useState } from "react";
import { Users, Library, UserCircle, ShieldCheck } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import AllUsers from "./AllUsers";
import AdminAllBook from "./AdminAllBook";
import { ProfileTab } from "./ProfileTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-6 flex items-center gap-3">
          <ShieldCheck className="text-primary" size={32} /> Admin Panel
        </h1>

        {/* Navigation */}
        <div className="tabs tabs-boxed bg-base-100 mb-8 p-1 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("users")}
            className={`tab gap-2 ${activeTab === "users" ? "tab-active" : ""}`}
          >
            <Users size={16} /> All Users
          </button>
          <button
            onClick={() => setActiveTab("books")}
            className={`tab gap-2 ${activeTab === "books" ? "tab-active" : ""}`}
          >
            <Library size={16} /> Manage Books
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`tab gap-2 ${
              activeTab === "profile" ? "tab-active" : ""
            }`}
          >
            <UserCircle size={16} /> My Profile
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* ALL USERS SECTION */}
            {activeTab === "users" && <AllUsers></AllUsers>}

            {/* MANAGE BOOKS SECTION */}
            {activeTab === "books" && <AdminAllBook></AdminAllBook>}

            {/* PROFILE SECTION */}
            {activeTab === "profile" && <ProfileTab></ProfileTab>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
