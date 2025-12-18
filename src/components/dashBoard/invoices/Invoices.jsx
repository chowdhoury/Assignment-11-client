import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { auth } from "../../../firebase/Firebase.config";

const Invoices = () => {
  // Sample invoices data - replace with actual data from API
  const [invoices, setInvoices] = useState([]);
  const { user } = useAuth();

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch(
          `${import.meta.env.VITE_server_url}/invoices?buyerEmail=${
            user?.email
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        // Ensure data is an array before setting it
        setInvoices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setInvoices([]);
      }
    };
    if (user) {
      fetchInvoices();
    }
  }, [user?.email]);
  // Calculate total from invoices
  const total = Array.isArray(invoices)
    ? invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0)
    : 0;

  // console.log(invoices);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Invoices</h2>
        <p className="text-gray-600">View and manage your billing invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Invoices</div>
          <div className="text-3xl font-bold">{invoices.length}</div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Amount</div>
          <div className="text-3xl font-bold">${total}</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-700 font-semibold">Invoice ID</th>
                <th className="text-gray-700 font-semibold">Order ID</th>
                <th className="text-gray-700 font-semibold">Date Issued</th>
                <th className="text-gray-700 font-semibold">Book Title</th>
                <th className="text-gray-700 font-semibold">Quantity</th>
                <th className="text-gray-700 font-semibold">Total</th>
                <th className="text-gray-700 font-semibold">Status</th>
                <th className="text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.transactionId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="font-medium text-blue-600">
                    {`TXN-${invoice.paymentTime
                      .toString()
                      .slice(-4)}-${invoice.transactionId.slice(-4)}`}
                  </td>
                  <td className="text-gray-600">{invoice.orderId}</td>
                  <td className="text-gray-600">
                    {new Date(invoice.paymentTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="font-medium text-gray-800">
                    {invoice.bookTitle}
                  </td>
                  <td className="text-gray-600">1</td>
                  <td className="text-gray-700 font-semibold">
                    ${invoice.amount}
                  </td>
                  <td>
                    <span className="badge badge-success text-white">Paid</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none"
                        title="View Invoice"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none"
                        title="Download PDF"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </button>
                      {(invoice.status === "Unpaid" ||
                        invoice.status === "Overdue") && (
                        <button className="btn btn-sm bg-purple-500 hover:bg-purple-600 text-white border-none">
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {invoices.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No invoices found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterStatus !== "All"
                ? "Try adjusting your filters or search term."
                : "Your invoices will appear here once you make a purchase."}
            </p>
          </div>
        )}
      </div>

      {/* Summary Section */}
      {/* {invoices.length > 0 && (
        <div className="mt-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                Showing Invoices
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {invoices.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Total Value</div>
              <div className="text-2xl font-bold text-gray-800">
                $
                {invoices
                  .reduce((sum, inv) => sum + inv.total, 0)
                  }
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Average Invoice</div>
              <div className="text-2xl font-bold text-gray-800">
                $
                {(
                  invoices.reduce((sum, inv) => sum + inv.total, 0) /
                  invoices.length
                )}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Invoices;
