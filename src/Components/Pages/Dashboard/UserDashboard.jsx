import React, { useState } from "react";
import {
  ShoppingBag,
  User,
  FileText,
  CreditCard,
  XCircle,
  CheckCircle,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Static Initial Data ---
const INITIAL_ORDERS = [
  {
    id: "ORD-101",
    title: "The Great Gatsby",
    date: "2023-10-24",
    status: "pending",
    amount: 15.99,
  },
  {
    id: "ORD-102",
    title: "Atomic Habits",
    date: "2023-10-20",
    status: "paid",
    amount: 20.0,
  },
  {
    id: "ORD-103",
    title: "Dune",
    date: "2023-10-15",
    status: "cancelled",
    amount: 25.5,
  },
];

const INITIAL_INVOICES = [
  { id: "INV-8821", book: "Atomic Habits", amount: 20.0, date: "2023-10-20" },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    image: "https://i.pravatar.cc/150?u=jane",
  });

  // --- Handlers (Side Effects are isolated here) ---

  const handleCancel = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const handlePayNow = (order) => {
    // Generate transaction data once per event click
    // const transactionId = `INV-${Date.now()}`;
    const paymentDate = new Date().toISOString().split("T")[0];

    // Update Orders Status
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === order.id ? { ...o, status: "paid" } : o))
    );

    // Add to Invoices
    const newInvoice = {
      //   id: transactionId,
      book: order.title,
      amount: order.amount,
      date: paymentDate,
    };

    setInvoices((prevInvoices) => [newInvoice, ...prevInvoices]);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="tabs tabs-boxed bg-base-100 mb-6 p-1 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("orders")}
            className={`tab gap-2 transition-all ${
              activeTab === "orders" ? "tab-active" : ""
            }`}
          >
            <ShoppingBag size={16} /> Orders
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`tab gap-2 transition-all ${
              activeTab === "profile" ? "tab-active" : ""
            }`}
          >
            <User size={16} /> Profile
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`tab gap-2 transition-all ${
              activeTab === "invoices" ? "tab-active" : ""
            }`}
          >
            <FileText size={16} /> Invoices
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* ORDERS PAGE */}
            {activeTab === "orders" && (
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-0">
                  <div className="p-6 border-b border-base-200">
                    <h2 className="card-title text-xl">My Orders</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr className="bg-base-200/50">
                          <th>Book</th>
                          <th>Order Date</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="hover">
                            <td className="font-medium">{order.title}</td>
                            <td>{order.date}</td>
                            <td>
                              <div
                                className={`badge badge-flat font-bold ${
                                  order.status === "paid"
                                    ? "badge-success"
                                    : order.status === "cancelled"
                                    ? "badge-error"
                                    : "badge-warning"
                                }`}
                              >
                                {order.status.toUpperCase()}
                              </div>
                            </td>
                            <td className="text-right">
                              {order.status === "pending" ? (
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handlePayNow(order)}
                                    className="btn btn-sm btn-primary"
                                  >
                                    Pay Now
                                  </button>
                                  <button
                                    onClick={() => handleCancel(order.id)}
                                    className="btn btn-sm btn-ghost text-error"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs opacity-50 italic">
                                  No actions available
                                </span>
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

            {/* PROFILE PAGE */}
            {activeTab === "profile" && (
              <div className="card bg-base-100 shadow-sm border border-base-300 max-w-xl">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-6">
                    Profile Information
                  </h2>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="avatar">
                      <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.image} alt="Avatar" />
                      </div>
                    </div>
                    <button className="btn btn-outline btn-sm gap-2">
                      <Camera size={14} /> Change Photo
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label font-semibold">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) =>
                          setUser((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label font-semibold">Email</label>
                      <input
                        type="text"
                        value={user.email}
                        className="input input-bordered opacity-60"
                        readOnly
                      />
                    </div>
                    <button className="btn btn-primary w-full mt-4">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* INVOICES PAGE */}
            {activeTab === "invoices" && (
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-0">
                  <div className="p-6 border-b border-base-200">
                    <h2 className="card-title text-xl">Payment History</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr className="bg-base-200/50">
                          <th>Payment ID</th>
                          <th>Book</th>
                          <th>Date</th>
                          <th className="text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((inv) => (
                          <tr key={inv.id} className="hover">
                            <td className="font-mono text-xs">{inv.id}</td>
                            <td>{inv.book}</td>
                            <td>{inv.date}</td>
                            <td className="text-right font-bold text-success">
                              ${inv.amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default UserDashboard;
