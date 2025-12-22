import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../Context/Axios/Axios";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const LibrarianOrdersTab = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/librarian/orders?email=${user.email}`)
        .then((res) => {
          setOrders(res.data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [user?.email]);

  // Update Status Logic
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axiosInstance.patch(`/librarian/orders/${id}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        // Update local state immediately so the UI changes color/text
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, shipedStatus: newStatus } : order
          )
        );

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Order marked as ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
          toast: true, // Small toast instead of big popup
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", error);
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body p-0">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="card-title text-xl font-bold">Manage Orders</h2>
          <span className="badge badge-primary">{orders.length} Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50">
                <th>#</th>
                <th>Book Title</th>
                <th>Buyer Email</th>
                <th>Payment</th>
                <th>Current Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={order._id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <td className="font-mono text-xs">{i + 1}</td>
                  <td className="font-medium">{order.title}</td>
                  <td>{order.email}</td>
                  <td>
                    <div
                      className={`badge badge-sm ${
                        order.status === "paid"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {order?.status || "unpaid"}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-outline uppercase text-[10px] font-bold ${
                        order.shipedStatus === "delivered"
                          ? "border-success text-success"
                          : order.shipedStatus === "cancelled"
                          ? "border-error text-error"
                          : "border-warning text-warning"
                      }`}
                    >
                      {order.shipedStatus || "pending"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="join border border-base-300">
                      {["pending", "shipped", "delivered", "cancelled"].map(
                        (status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(order._id, status)}
                            className={`join-item btn btn-xs capitalize ${
                              order.shipedStatus === status
                                ? "btn-primary"
                                : "btn-ghost"
                            }`}
                          >
                            {status}
                          </button>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <p className="text-base-content/50 italic">
                      No orders found for this account.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LibrarianOrdersTab;
