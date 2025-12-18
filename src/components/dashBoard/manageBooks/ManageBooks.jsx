import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_server_url}/allbooks`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };

    if (user?.accessToken) {
      fetchBooks();
    }
  }, [refetch, user?.accessToken]);

  const handleVisibilityChange = async (bookId, newStatus) => {
    await fetch(`${import.meta.env.VITE_server_url}/allbooks/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify({ visibility: newStatus }),
    });
    setRefetch(!refetch);
    // You might want to refetch the books or update the state here
    console.log(`Change status for book ${bookId} to ${newStatus}`);
  };

  const handleDelete = async (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`${import.meta.env.VITE_server_url}/books/${bookId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        });
        setRefetch(!refetch);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    console.log(`Delete book with ID: ${bookId}`);
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Books</h2>
        <p className="text-gray-600">
          Manage your book inventory and track sales
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Books</div>
          <div className="text-3xl font-bold">{books.length}</div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Published</div>
          <div className="text-3xl font-bold">
            {books.filter((b) => b?.visibility === "public").length}
          </div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Unpublished</div>
          <div className="text-3xl font-bold">
            {books.filter((b) => b.visibility === "private").length}
          </div>
        </div>
        {/* <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Value</div>
          <div className="text-3xl font-bold">
            $
            {books
              .reduce((sum, b) => sum + (b.bookPrice || 0) * (b.stock || 0), 0)
              .toFixed(2)}
          </div>
        </div> */}
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-700 font-semibold">Image</th>
                <th className="text-gray-700 font-semibold">Title</th>
                <th className="text-gray-700 font-semibold">Author</th>
                {/* <th className="text-gray-700 font-semibold">Category</th> */}
                <th className="text-gray-700 font-semibold">Price</th>
                <th className="text-gray-700 font-semibold">Status</th>
                <th className="text-gray-700 font-semibold">Seller</th>
                <th className="text-gray-700 font-semibold">Seller Email</th>
                {/* <th className="text-gray-700 font-semibold">Year</th> */}
                <th className="text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                // const stockStatus = getStockStatus(book.stock);
                return (
                  <tr
                    key={book._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td>
                      <div className="avatar">
                        <div className="w-12 h-16 rounded">
                          <img
                            src={
                              book.bookCover ||
                              "https://via.placeholder.com/150"
                            }
                            alt={book.bookTitle}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-gray-800 max-w-xs">
                      <div className="truncate" title={book.bookTitle}>
                        {book.bookTitle}
                      </div>
                    </td>
                    <td className="text-gray-600">{book.author}</td>
                    {/* <td>
                      <span className={getCategoryBadge(book.bookCategory)}>
                        {book.bookCategory}
                      </span>
                    </td> */}
                    <td className="text-gray-700 font-semibold">
                      ${book?.price}
                    </td>
                    <td>
                      <select
                        className={`select w-40 font-medium border-2 transition-all duration-200 ${
                          book.visibility === "public"
                            ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-100 focus:border-green-500"
                            : "bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100 focus:border-orange-500"
                        }`}
                        value={book.visibility}
                        onChange={(event) =>
                          handleVisibilityChange(book._id, event.target.value)
                        }
                      >
                        <option
                          value="public"
                          className="bg-white text-green-700"
                        >
                          ✓ Published
                        </option>
                        <option
                          value="private"
                          className="bg-white text-orange-700"
                        >
                          ⊘ Unpublished
                        </option>
                      </select>
                    </td>
                    <td className="text-gray-700 font-semibold">
                      {book?.seller?.name}
                    </td>
                    <td className="text-gray-700 font-semibold">
                      {book?.seller?.email}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(book._id)}
                          // disabled={deleteLoading === book._id}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                          title="Delete Book"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {books.length === 0 && (
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No books found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by adding your first book to the inventory.
            </p>
            <div className="mt-6">
              <button className="btn btn-primary">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
