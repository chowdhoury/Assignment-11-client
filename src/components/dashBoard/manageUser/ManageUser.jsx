import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";

const ManageUser = () => {
  const axiosInstance = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback to sample data for demonstration
      setUsers([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          photoURL: "https://via.placeholder.com/150",
          createdAt: "2024-11-15",
          isActive: true,
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "admin",
          photoURL: "https://via.placeholder.com/150",
          createdAt: "2024-10-20",
          isActive: true,
        },
        {
          _id: "3",
          name: "Bob Johnson",
          email: "bob@example.com",
          role: "user",
          photoURL: "https://via.placeholder.com/150",
          createdAt: "2024-09-10",
          isActive: false,
        },
        {
          _id: "4",
          name: "Alice Brown",
          email: "alice@example.com",
          role: "moderator",
          photoURL: "https://via.placeholder.com/150",
          createdAt: "2024-08-05",
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const roleStyles = {
      admin: "badge badge-error text-white",
      moderator: "badge badge-warning text-white",
      user: "badge badge-info text-white",
    };
    return roleStyles[role] || "badge badge-ghost";
  };

  const getStatusBadge = (isActive) => {
    return isActive
      ? "badge badge-success text-white"
      : "badge badge-ghost text-gray-600";
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      // Replace with your actual API endpoint
      await axiosInstance.patch(`/users/${userId}/role`, { role: newRole });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleStatusToggle = async (userId) => {
    try {
      const user = users.find((u) => u._id === userId);
      // Replace with your actual API endpoint
      await axiosInstance.patch(`/users/${userId}/status`, {
        isActive: !user.isActive,
      });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Replace with your actual API endpoint
        await axiosInstance.delete(`/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          User Management
        </h2>
        <p className="text-gray-600">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Users</div>
          <div className="text-3xl font-bold">{users.length}</div>
        </div>
        <div className="bg-linear-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Admins</div>
          <div className="text-3xl font-bold">
            {users.filter((u) => u.role === "admin").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Moderators</div>
          <div className="text-3xl font-bold">
            {users.filter((u) => u.role === "moderator").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Active Users</div>
          <div className="text-3xl font-bold">
            {users.filter((u) => u.isActive).length}
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
                placeholder="Search by name or email..."
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

          {/* Role Filter */}
          <div className="md:w-48">
            <select
              className="select select-bordered w-full"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option>All</option>
              <option>admin</option>
              <option>moderator</option>
              <option>user</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-700 font-semibold">User</th>
                <th className="text-gray-700 font-semibold">Email</th>
                <th className="text-gray-700 font-semibold">Role</th>
                <th className="text-gray-700 font-semibold">Status</th>
                <th className="text-gray-700 font-semibold">Joined Date</th>
                <th className="text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={
                                user.photoURL ||
                                "https://via.placeholder.com/150"
                              }
                              alt={user.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-600">{user.email}</td>
                    <td>
                      <select
                        className={`select select-sm ${getRoleBadge(
                          user.role
                        )}`}
                        value={user.role}
                        onChange={(e) =>
                          handleRoleUpdate(user._id, e.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={getStatusBadge(user.isActive)}
                        onClick={() => handleStatusToggle(user._id)}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none tooltip"
                          data-tip="View Profile"
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
                          data-tip="Delete User"
                          onClick={() => handleDeleteUser(user._id)}
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
                  <td colSpan="6" className="text-center py-8">
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No users found
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

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
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

export default ManageUser;
