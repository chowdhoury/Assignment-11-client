import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { auth } from "../../../firebase/Firebase.config";

const Orders = () => {
  // Sample orders data - replace with actual data from API
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch(
          `${import.meta.env.VITE_server_url}/orders?seller=${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [refetch, user?.email]);

  // console.log(orders);

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "badge badge-warning text-white",
      processing: "badge badge-info text-white",
      shipped: "badge badge-primary text-white",
      delivered: "badge badge-success text-white",
      cancelled: "badge badge-error text-white",
    };
    return statusStyles[status] || "badge badge-ghost";
  };

  const getPaymentBadge = (payment) => {
    const paymentStyles = {
      paid: "badge badge-success text-white",
      unpaid: "badge badge-warning text-white",
      refunded: "badge badge-error text-white",
    };
    return paymentStyles[payment] || "badge badge-ghost";
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    // console.log(orderId, newStatus);
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_server_url}/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      // console.log("Order status updated:", data);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

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
            {orders.filter((o) => o.status === "pending").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Processing</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "processing").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Delivered</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "delivered").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Revenue</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "cancelled").length}
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
                <th className="text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <th className="font-medium text-gray-700">
                      #{order.orderId}
                    </th>
                    <td className="text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {order?.buyer?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {order?.buyer?.email}
                        </span>
                      </div>
                    </td>
                    <td className="font-medium text-gray-800">
                      {order.bookTitle}
                    </td>
                    <td className="text-gray-700 font-semibold">
                      ${order?.price}
                    </td>
                    <td>
                      <span className={getPaymentBadge(order.paymentStatus)}>
                        {order.paymentStatus === "paid"
                          ? "Paid"
                          : order.paymentStatus === "unpaid"
                          ? "Unpaid"
                          : "Refunded"}
                      </span>
                    </td>
                    <td>
                      <select
                        className={`select select-sm ${getStatusBadge(
                          order.status
                        )} ${
                          order.paymentStatus !== "paid"
                            ? "pointer-events-none opacity-60"
                            : order.status === "delivered" ||
                              order.status === "cancelled"
                            ? "pointer-events-none opacity-60"
                            : ""
                        }`}
                        value={order.status}
                        onChange={(e) => {
                          handleStatusUpdate(order._id, e.target.value);
                        }}
                        readOnly={order.paymentStatus !== "paid"}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
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
      {orders.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {orders.length} of {orders.length} orders
          </div>
          {/* <div className="btn-group">
            <button className="btn btn-sm">«</button>
            <button className="btn btn-sm btn-active">1</button>
            <button className="btn btn-sm">2</button>
            <button className="btn btn-sm">3</button>
            <button className="btn btn-sm">»</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Orders;
