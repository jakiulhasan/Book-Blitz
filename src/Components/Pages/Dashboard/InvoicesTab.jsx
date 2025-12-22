import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const InvoicesTab = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/invoices?email=${user.email}`)
        .then((res) => {
          setInvoices(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching invoices:", err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading)
    return <div className="p-10 text-center">Loading invoices...</div>;

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-sm text-blue-600">
                    {invoice.paymentID}
                  </td>
                  <td className="p-3">{invoice.title || "Parcel Delivery"}</td>
                  <td className="p-3">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-bold text-green-600">
                    {invoice.amount_total} {invoice.currency?.toUpperCase()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTab;
