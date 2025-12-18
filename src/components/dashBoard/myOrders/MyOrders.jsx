import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/Firebase.config";

const MyOrders = () => {
  // Sample orders data - replace with actual data from API
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch(
          `${import.meta.env.VITE_server_url}/orders?email=${user?.email}`,
          {
            credentials: "include",
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "badge badge-primary text-white",
      shipped: "badge badge-info text-white",
      processing: "badge badge-warning text-white",
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

  const handleOrderCancel = async (orderId) => {
    console.log("Cancel order:", orderId);
    Swal.fire({
      title: "Do you want to cancel this order?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = await auth.currentUser?.getIdToken();
        fetch(`${import.meta.env.VITE_server_url}/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "cancelled" }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Order cancelled:", data);
            setRefetch(!refetch);
            Swal.fire({
              title: "Cancelled!",
              text: "Your order has been cancelled.",
              icon: "error",
            });
          })
          .catch((error) => {
            console.error("Error cancelling order:", error);
            Swal.fire(
              "Error!",
              "There was an issue cancelling your order.",
              "error"
            );
          });
      }
    });
  };

  const handlePayNow = async (order) => {
    Swal.fire({
      title: "Want to pay now?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Later",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = await auth.currentUser?.getIdToken();
        fetch(`${import.meta.env.VITE_server_url}/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(order),
        })
          .then((res) => res.json())
          .then(
            (data) => {
              window.location.href = data.url;
              // console.log("Payment intent created:", data);
              // Redirect to payment gateway with the client secret
              // For example, using Stripe.js
              // const stripe = Stripe('your-publishable-key-here');
              // stripe.redirectToCheckout({ sessionId: data.sessionId });
            }
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your file has been deleted.",
            //   icon: "success",
            // });
          )
          .catch((error) => {
            console.error("Error creating payment intent:", error);
            Swal.fire(
              "Error!",
              "There was an issue processing your payment.",
              "error"
            );
          });
      }
    });
    console.log("Redirecting to payment gateway for order:", order);
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
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Orders</div>
          <div className="text-3xl font-bold">{orders.length}</div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Delivered</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "delivered").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Processing</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.status === "processing").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Payment Pending</div>
          <div className="text-3xl font-bold">
            {orders.filter((o) => o.paymentStatus === "unpaid").length}
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
                  <td className="font-medium text-gray-800">
                    {order.bookTitle}
                  </td>
                  <td className="text-gray-700 font-semibold">
                    ${order.price}
                  </td>
                  <td>
                    <span className={getStatusBadge(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={getPaymentBadge(order.paymentStatus)}>
                      {order.paymentStatus?.charAt(0)?.toUpperCase() +
                        order.paymentStatus?.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {order.paymentStatus === "unpaid" &&
                        order.status !== "cancelled" && (
                          <button
                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none"
                            onClick={() => handlePayNow(order)}
                          >
                            Pay Now
                          </button>
                        )}

                      <button
                        className={`btn btn-sm text-white border-none
    ${
      order.status === "cancelled" || order.paymentStatus === "paid"
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600"
    }
  `}
                        disabled={
                          order.status === "cancelled" ||
                          order.paymentStatus === "paid"
                        }
                        onClick={() => handleOrderCancel(order._id)}
                      >
                        Cancel
                      </button>

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
