import React from "react";

const MyOrders = () => {
  // Sample orders data - replace with actual data from API
  const orders = [
    {
      id: 1,
      date: "2023-10-01",
      title: "The Great Gatsby",
      amount: 15.99,
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: 2,
      date: "2023-09-28",
      title: "To Kill a Mockingbird",
      amount: 12.99,
      status: "Processing",
      payment: "Pending",
    },
    {
      id: 3,
      date: "2023-09-25",
      title: "1984",
      amount: 14.5,
      status: "Delivered",
      payment: "Paid",
    },
    {
      id: 4,
      date: "2023-09-20",
      title: "Pride and Prejudice",
      amount: 13.99,
      status: "Cancelled",
      payment: "Refunded",
    },
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      Shipped: "badge badge-info text-white",
      Processing: "badge badge-warning text-white",
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

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h2>
        <p className="text-gray-600">Track and manage your book orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Orders</div>
          <div className="text-3xl font-bold">{orders.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Delivered</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "Delivered").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Processing</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "Processing").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Spent</div>
          <div className="text-3xl font-bold">
            ${orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
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
                <th className="text-gray-700 font-semibold">Order #</th>
                <th className="text-gray-700 font-semibold">Date</th>
                <th className="text-gray-700 font-semibold">Book Title</th>
                <th className="text-gray-700 font-semibold">Amount</th>
                <th className="text-gray-700 font-semibold">Status</th>
                <th className="text-gray-700 font-semibold">Payment</th>
                <th className="text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
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
                  <td className="font-medium text-gray-800">{order.title}</td>
                  <td className="text-gray-700 font-semibold">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td>
                    <span className={getStatusBadge(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={getPaymentBadge(order.payment)}>
                      {order.payment}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {order.payment === "Pending" && (
                        <button className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none">
                          Pay Now
                        </button>
                      )}
                      {order.status !== "Cancelled" &&
                        order.status !== "Delivered" && (
                          <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none">
                            Cancel
                          </button>
                        )}
                      <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start browsing books to place your first order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
