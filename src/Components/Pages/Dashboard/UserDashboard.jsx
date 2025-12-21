import React, { use, useEffect, useState } from "react";
import {
  ShoppingBag,
  User,
  FileText,
  CreditCard,
  XCircle,
  CheckCircle,
  Camera,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axiosInstance from "../../../Context/Axios/Axios";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const { user } = use(AuthContext);
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/orders", { params: { email } }).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, [email, axiosSecure]);

  const handleCancel = (orderId) => {
    axiosSecure
      .patch(`/orders/${orderId}`, { status: "cancelled" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: "cancelled" } : order
            )
          );
        }
      })
      .catch((err) => {
        console.error("Error cancelling order:", err);
      });
  };

  const handlePayNow = async (order) => {
    const paymentInfo = {
      cost: order.price,
      parcelId: order._id,
      senderEmail: order.email,
      parcelName: order.title,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    console.log(res.data);
    if (res.data?.url) {
      // .assign() adds the page to your history
      window.location.assign(res.data.url);
    }
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
                          <th>#</th>
                          <th>Book Title</th>
                          <th>Order Date</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, i) => (
                          <tr key={order.id} className="hover">
                            <td>{i + 1}</td>
                            <td className="font-medium">{order.title}</td>
                            <td>
                              {new Date(order.orderDate).toLocaleString(
                                "en-GB",
                                {
                                  timeZone: "Asia/Dhaka",
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
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
                                    onClick={() => handleCancel(order._id)}
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
