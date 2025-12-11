import React, { useState } from "react";

const Orders = () => {
  // Sample orders data - replace with actual data from API
  const [orders, setOrders] = useState([
    {
      id: 1001,
      date: "2024-12-10",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      title: "The Great Gatsby",
      amount: 15.99,
      status: "Pending",
      payment: "Paid",
    },
    {
      id: 1002,
      date: "2024-12-09",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      title: "To Kill a Mockingbird",
      amount: 12.99,
      status: "Processing",
      payment: "Paid",
    },
    {
      id: 1003,
      date: "2024-12-08",
      customerName: "Bob Johnson",
      customerEmail: "bob@example.com",
      title: "1984",
      amount: 14.5,
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: 1004,
      date: "2024-12-07",
      customerName: "Alice Brown",
      customerEmail: "alice@example.com",
      title: "Pride and Prejudice",
      amount: 13.99,
      status: "Delivered",
      payment: "Paid",
    },
    {
      id: 1005,
      date: "2024-12-06",
      customerName: "Charlie Wilson",
      customerEmail: "charlie@example.com",
      title: "The Catcher in the Rye",
      amount: 16.99,
      status: "Pending",
      payment: "Pending",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: "badge badge-warning text-white",
      Processing: "badge badge-info text-white",
      Shipped: "badge badge-primary text-white",
      Delivered: "badge badge-success text-white",
      Cancelled: "badge badge-error text-white",
    };
    return statusStyles[status] || "badge badge-ghost";
  };

  const getPaymentBadge = (payment) => {
    const paymentStyles = {
      Paid: "badge badge-success text-white",
      Pending: "badge badge-warning text-white",
      Refunded: "badge badge-error text-white",
    };
    return paymentStyles[payment] || "badge badge-ghost";
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Order Management
        </h2>
        <p className="text-gray-600">
          Manage and track all customer orders from one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Orders</div>
          <div className="text-3xl font-bold">{orders.length}</div>
        </div>
        <div className="bg-linear-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Pending</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "Pending").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Processing</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "Processing").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Delivered</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "Delivered").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Revenue</div>
          <div className="text-3xl font-bold">
            ${orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by order ID, customer, or book..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              className="select select-bordered w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-700 font-semibold">Order ID</th>
                <th className="text-gray-700 font-semibold">Date</th>
                <th className="text-gray-700 font-semibold">Customer</th>
                <th className="text-gray-700 font-semibold">Book Title</th>
                <th className="text-gray-700 font-semibold">Amount</th>
                <th className="text-gray-700 font-semibold">Payment</th>
                <th className="text-gray-700 font-semibold">Status</th>
                <th className="text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <th className="font-medium text-gray-700">#{order.id}</th>
                    <td className="text-gray-600">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {order.customerName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {order.customerEmail}
                        </span>
                      </div>
                    </td>
                    <td className="font-medium text-gray-800">{order.title}</td>
                    <td className="text-gray-700 font-semibold">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td>
                      <span className={getPaymentBadge(order.payment)}>
                        {order.payment}
                      </span>
                    </td>
                    <td>
                      <select
                        className={`select select-sm ${getStatusBadge(
                          order.status
                        )}`}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none tooltip"
                          data-tip="View Details"
                        >
                          <svg
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
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none tooltip"
                          data-tip="Delete Order"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="h-16 w-16 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No orders found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (Optional - can be implemented with actual data) */}
      {filteredOrders.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
          <div className="btn-group">
            <button className="btn btn-sm">«</button>
            <button className="btn btn-sm btn-active">1</button>
            <button className="btn btn-sm">2</button>
            <button className="btn btn-sm">3</button>
            <button className="btn btn-sm">»</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
