import { useEffect, useState } from "react";
import axiosInstance from "../../../Context/Axios/Axios";

const LibrarianOrdersTab = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/librarian/orders?email=librarian@email.com")
      .then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axiosInstance.patch(`/librarian/orders/${id}`, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body p-0">
        <div className="p-6 border-b">
          <h2 className="card-title text-xl">Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50">
                <th>#</th>
                <th>Book</th>
                <th>Buyer</th>
                <th>Status</th>
                <th className="text-right">Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id} className="hover">
                  <td>{i + 1}</td>
                  <td>{order.bookTitle}</td>
                  <td>{order.buyerEmail}</td>
                  <td>
                    <span className="badge badge-outline">{order.status}</span>
                  </td>
                  <td className="text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="select select-xs select-bordered"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 opacity-50">
                    No orders yet
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
