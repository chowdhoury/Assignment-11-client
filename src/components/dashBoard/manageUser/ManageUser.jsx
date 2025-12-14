import { useState, useEffect } from "react";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_server_url}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refetch]);

  const handleRoleChange = async (userId, newRole) => {
    // Implement role change logic here
    const result = await fetch(
      `${import.meta.env.VITE_server_url}/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      }
    );
    setRefetch(!refetch);
    // console.log(`Change role for user ${userId} to ${newRole}`);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading users...</div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          User Management
        </h2>
        <p className="text-gray-600">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      {/* Stats */}
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
          <div className="text-sm opacity-90">Librarians</div>
          <div className="text-3xl font-bold">
            {users.filter((u) => u.role === "librarian").length}
          </div>
        </div>

        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Users</div>
          <div className="text-3xl font-bold">
            {users.filter((u) => u.role === "user").length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={
                                user.photoURL ||
                                "https://via.placeholder.com/150"
                              }
                              alt={user.name || "User"}
                            />
                          </div>
                        </div>
                        <div className="font-bold text-gray-800">
                          {user.name || "N/A"}
                        </div>
                      </div>
                    </td>

                    <td className="text-gray-600">{user.email}</td>

                    <td>
                      <select
                        className={`select select-sm select-bordered font-semibold transition-all ${
                          user.role === "admin"
                            ? "bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
                            : user.role === "librarian"
                            ? "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                            : "bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
                        }`}
                        defaultValue={user.role}
                        onChange={(event) =>
                          handleRoleChange(user._id, event.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="librarian">Librarian</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="text-gray-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>

                    {/* <td>
                      <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none">
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <p className="text-gray-500">No users found</p>
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

export default ManageUser;
