import React, { useState } from "react";

const Invoices = () => {
  // Sample invoices data - replace with actual data from API
  const invoices = [
    {
      id: "INV-2023-1001",
      orderId: "ORD-12345",
      date: "2023-10-01",
      dueDate: "2023-10-15",
      title: "The Great Gatsby",
      quantity: 1,
      unitPrice: 15.99,
      tax: 1.28,
      total: 17.27,
      status: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-2023-1002",
      orderId: "ORD-12346",
      date: "2023-09-28",
      dueDate: "2023-10-12",
      title: "To Kill a Mockingbird",
      quantity: 2,
      unitPrice: 12.99,
      tax: 2.08,
      total: 28.06,
      status: "Unpaid",
      paymentMethod: "PayPal",
    },
    {
      id: "INV-2023-1003",
      orderId: "ORD-12347",
      date: "2023-09-25",
      dueDate: "2023-10-09",
      title: "1984",
      quantity: 1,
      unitPrice: 14.5,
      tax: 1.16,
      total: 15.66,
      status: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-2023-1004",
      orderId: "ORD-12348",
      date: "2023-09-20",
      dueDate: "2023-10-04",
      title: "Pride and Prejudice",
      quantity: 3,
      unitPrice: 13.99,
      tax: 3.36,
      total: 45.33,
      status: "Overdue",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "INV-2023-1005",
      orderId: "ORD-12349",
      date: "2023-09-15",
      dueDate: "2023-09-29",
      title: "The Catcher in the Rye",
      quantity: 1,
      unitPrice: 11.99,
      tax: 0.96,
      total: 12.95,
      status: "Paid",
      paymentMethod: "Credit Card",
    },
  ];

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status) => {
    const statusStyles = {
      Paid: "badge badge-success text-white",
      Unpaid: "badge badge-warning text-white",
      Overdue: "badge badge-error text-white",
      Cancelled: "badge badge-ghost",
    };
    return statusStyles[status] || "badge badge-ghost";
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus =
      filterStatus === "All" || invoice.status === filterStatus;
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.total, 0);
  const unpaidAmount = invoices
    .filter((inv) => inv.status === "Unpaid" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Invoices</h2>
        <p className="text-gray-600">
          View and manage your billing invoices
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Invoices</div>
          <div className="text-3xl font-bold">{invoices.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Amount</div>
          <div className="text-3xl font-bold">${totalAmount.toFixed(2)}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Paid</div>
          <div className="text-3xl font-bold">${paidAmount.toFixed(2)}</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Unpaid</div>
          <div className="text-3xl font-bold">${unpaidAmount.toFixed(2)}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus("All")}
              className={`btn btn-sm ${
                filterStatus === "All"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "btn-ghost"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("Paid")}
              className={`btn btn-sm ${
                filterStatus === "Paid"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "btn-ghost"
              }`}
            >
              Paid
            </button>
            <button
              onClick={() => setFilterStatus("Unpaid")}
              className={`btn btn-sm ${
                filterStatus === "Unpaid"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "btn-ghost"
              }`}
            >
              Unpaid
            </button>
            <button
              onClick={() => setFilterStatus("Overdue")}
              className={`btn btn-sm ${
                filterStatus === "Overdue"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "btn-ghost"
              }`}
            >
              Overdue
            </button>
          </div>
          <div className="form-control w-full md:w-auto">
            <input
              type="text"
              placeholder="Search invoices..."
              className="input input-bordered w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                <th className="text-gray-700 font-semibold">Due Date</th>
                <th className="text-gray-700 font-semibold">Book Title</th>
                <th className="text-gray-700 font-semibold">Quantity</th>
                <th className="text-gray-700 font-semibold">Total</th>
                <th className="text-gray-700 font-semibold">Status</th>
                <th className="text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="font-medium text-blue-600">{invoice.id}</td>
                  <td className="text-gray-600">{invoice.orderId}</td>
                  <td className="text-gray-600">
                    {new Date(invoice.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-gray-600">
                    {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="font-medium text-gray-800">{invoice.title}</td>
                  <td className="text-gray-600">{invoice.quantity}</td>
                  <td className="text-gray-700 font-semibold">
                    ${invoice.total.toFixed(2)}
                  </td>
                  <td>
                    <span className={getStatusBadge(invoice.status)}>
                      {invoice.status}
                    </span>
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
        {filteredInvoices.length === 0 && (
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
      {filteredInvoices.length > 0 && (
        <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                Showing Invoices
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {filteredInvoices.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Total Value</div>
              <div className="text-2xl font-bold text-gray-800">
                $
                {filteredInvoices
                  .reduce((sum, inv) => sum + inv.total, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Average Invoice</div>
              <div className="text-2xl font-bold text-gray-800">
                $
                {(
                  filteredInvoices.reduce((sum, inv) => sum + inv.total, 0) /
                  filteredInvoices.length
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;