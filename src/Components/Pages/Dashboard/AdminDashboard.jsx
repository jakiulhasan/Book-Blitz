import React, { useState } from "react";
import {
  Users,
  Library,
  UserCircle,
  ShieldCheck,
  UserPlus,
  Trash2,
  Eye,
  EyeOff,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Initial Data ---
const INITIAL_USERS = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "user" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "librarian" },
  {
    id: "u3",
    name: "Charlie Davis",
    email: "charlie@admin.com",
    role: "admin",
  },
];

const INITIAL_BOOKS = [
  {
    id: "b1",
    title: "React Design Patterns",
    author: "Librarian Sarah",
    status: "published",
  },
  {
    id: "b2",
    title: "Mastering Tailwind",
    author: "Librarian Mike",
    status: "unpublished",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [profile, setProfile] = useState({
    name: "Admin One",
    email: "admin@system.com",
    image: "https://i.pravatar.cc/150?u=admin",
  });

  // --- Handlers ---

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const togglePublish = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              status: b.status === "published" ? "unpublished" : "published",
            }
          : b
      )
    );
  };

  const handleDeleteBook = (bookId) => {
    // In a real app, the backend handles the cascade delete of orders.
    // Here we filter the local state.
    if (
      window.confirm(
        "Are you sure? This will delete the book and all associated orders."
      )
    ) {
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    }
  };

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
            {activeTab === "users" && (
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body">
                  <h2 className="card-title mb-4">User Directory</h2>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Current Role</th>
                          <th className="text-right">Promote Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} className="hover">
                            <td>
                              <div className="font-bold">{u.name}</div>
                              <div className="text-sm opacity-50">
                                {u.email}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge badge-sm ${
                                  u.role === "admin"
                                    ? "badge-secondary"
                                    : u.role === "librarian"
                                    ? "badge-accent"
                                    : "badge-ghost"
                                }`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className="text-right flex justify-end gap-2">
                              {u.role !== "librarian" && (
                                <button
                                  onClick={() =>
                                    handleRoleChange(u.id, "librarian")
                                  }
                                  className="btn btn-xs btn-outline btn-accent gap-1"
                                >
                                  <UserPlus size={12} /> Librarian
                                </button>
                              )}
                              {u.role !== "admin" && (
                                <button
                                  onClick={() =>
                                    handleRoleChange(u.id, "admin")
                                  }
                                  className="btn btn-xs btn-outline btn-secondary gap-1"
                                >
                                  <ShieldCheck size={12} /> Admin
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MANAGE BOOKS SECTION */}
            {activeTab === "books" && (
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body">
                  <h2 className="card-title mb-4">Book Inventory Control</h2>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Book Title</th>
                          <th>Added By</th>
                          <th>Visibility</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book) => (
                          <tr key={book.id}>
                            <td className="font-bold">{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                              <span
                                className={`badge ${
                                  book.status === "published"
                                    ? "badge-success"
                                    : "badge-warning"
                                } badge-outline`}
                              >
                                {book.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => togglePublish(book.id)}
                                  className={`btn btn-sm ${
                                    book.status === "published"
                                      ? "btn-ghost"
                                      : "btn-success"
                                  }`}
                                  title={
                                    book.status === "published"
                                      ? "Unpublish"
                                      : "Publish"
                                  }
                                >
                                  {book.status === "published" ? (
                                    <EyeOff size={16} />
                                  ) : (
                                    <Eye size={16} />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDeleteBook(book.id)}
                                  className="btn btn-sm btn-error btn-square"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE SECTION */}
            {activeTab === "profile" && (
              <div className="card bg-base-100 shadow-sm border border-base-300 max-w-xl">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-6">Admin Settings</h2>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="avatar">
                      <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={profile.image} alt="Admin" />
                      </div>
                    </div>
                    <button className="btn btn-outline btn-sm gap-2">
                      <Camera size={14} /> Update Avatar
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label font-bold text-xs uppercase opacity-60">
                        Admin Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, name: e.target.value }))
                        }
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label font-bold text-xs uppercase opacity-60">
                        System Email
                      </label>
                      <input
                        type="text"
                        value={profile.email}
                        className="input input-bordered bg-base-200"
                        readOnly
                      />
                    </div>
                    <button className="btn btn-primary w-full mt-4">
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
