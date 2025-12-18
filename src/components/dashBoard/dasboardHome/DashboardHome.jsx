import React from "react";
import {
  FaBook,
  FaShoppingCart,
  FaHeart,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaUser,
  FaStar,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router";

// StatCard component moved outside to avoid recreation on each render
const StatCard = ({ icon, title, value, trend, color, link }) => {
  const IconComponent = icon;
  return (
    <Link
      to={link}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 hover:scale-105 cursor-pointer"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {title === "Revenue" ? `$${value.toFixed(2)}` : value}
          </h3>
          {trend && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend > 0 ? <FaArrowUp /> : <FaArrowDown />}
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        <div
          className="p-4 rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <IconComponent className="text-3xl" style={{ color }} />
        </div>
      </div>
    </Link>
  );
};

// formatDate function moved outside
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const DashboardHome = () => {
  // Mock data for UI display
  const stats = {
    totalBooks: 24,
    totalOrders: 45,
    totalWishlist: 12,
    totalRevenue: 1250.75,
  };

  const recentOrders = [
    {
      _id: "order123456",
      createdAt: "2024-12-10T10:30:00",
      items: [{ title: "Book 1" }, { title: "Book 2" }],
      totalAmount: 45.99,
      status: "completed",
    },
    {
      _id: "order234567",
      createdAt: "2024-12-12T14:20:00",
      items: [{ title: "Book 3" }],
      totalAmount: 29.99,
      status: "pending",
    },
    {
      _id: "order345678",
      createdAt: "2024-12-13T09:15:00",
      items: [{ title: "Book 4" }, { title: "Book 5" }, { title: "Book 6" }],
      totalAmount: 89.97,
      status: "processing",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome back, User! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your bookstore today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FaBook}
            title="My Books"
            value={stats.totalBooks}
            trend={12}
            color="#3B82F6"
            link="/dashboard/my-books"
          />
          <StatCard
            icon={FaShoppingCart}
            title="Total Orders"
            value={stats.totalOrders}
            trend={8}
            color="#10B981"
            link="/dashboard/my-orders"
          />
          <StatCard
            icon={FaHeart}
            title="Wishlist"
            value={stats.totalWishlist}
            trend={-3}
            color="#EF4444"
            link="/dashboard/wishlist"
          />
          <StatCard
            icon={FaDollarSign}
            title="Revenue"
            value={stats.totalRevenue}
            trend={15}
            color="#F59E0B"
            link="/dashboard/invoices"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-primary" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                // to="/dashboard/add-book"
                className="btn btn-primary btn-block justify-start"
              >
                <FaBook /> Add New Book
              </Link>
              <Link
                // to="/dashboard/my-orders"
                className="btn btn-outline btn-primary btn-block justify-start"
              >
                <FaShoppingCart /> View Orders
              </Link>
              <Link
                // to="/dashboard/wishlist"
                className="btn btn-outline btn-secondary btn-block justify-start"
              >
                <FaHeart /> My Wishlist
              </Link>
              <Link
                // to="/dashboard/profile"
                className="btn btn-outline btn-accent btn-block justify-start"
              >
                <FaUser /> Edit Profile
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaClock className="text-primary" />
                Recent Orders
              </h2>
              <Link
                to="/dashboard/my-orders"
                className="text-primary hover:text-primary-focus text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={order._id || index}>
                        <td className="font-mono text-sm">
                          #{order._id?.slice(-6) || "N/A"}
                        </td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{order.items?.length || 1}</td>
                        <td className="font-semibold">
                          ${order.totalAmount?.toFixed(2) || "0.00"}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "completed"
                                ? "badge-success"
                                : order.status === "pending"
                                ? "badge-warning"
                                : "badge-info"
                            }`}
                          >
                            {order.status || "pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No orders yet</p>
                <Link to="/books" className="btn btn-primary btn-sm">
                  Browse Books
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performance Overview */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Performance Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Sales</span>
                <span className="font-bold text-green-600">
                  ${stats.totalRevenue.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Books Listed</span>
                <span className="font-bold text-blue-600">
                  {stats.totalBooks}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Orders Received</span>
                <span className="font-bold text-purple-600">
                  {stats.totalOrders}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Order Value</span>
                <span className="font-bold text-orange-600">
                  $
                  {stats.totalOrders > 0
                    ? (stats.totalRevenue / stats.totalOrders).toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">
                  Your business is growing!
                </p>
                <p className="text-2xl font-bold text-primary">
                  +24% this month 📈
                </p>
              </div>
            </div>
          </div>

          {/* Tips & Recommendations */}
          <div className="bg-linear-to-br from-primary/5 to-secondary/5 rounded-xl shadow-md p-6 border border-primary/10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              💡 Tips & Recommendations
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">
                    Keep your inventory updated
                  </p>
                  <p className="text-sm text-gray-600">
                    Regular updates improve visibility
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">
                    Add detailed descriptions
                  </p>
                  <p className="text-sm text-gray-600">
                    Better descriptions lead to more sales
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">
                    Upload quality images
                  </p>
                  <p className="text-sm text-gray-600">
                    Clear photos attract more buyers
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">
                    Respond to reviews quickly
                  </p>
                  <p className="text-sm text-gray-600">
                    Build trust with your customers
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
