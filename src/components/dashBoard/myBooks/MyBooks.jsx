import React, { useState, useEffect } from "react";
// import useAxios from "../../../hooks/useAxios";
// import useAuth from "../../../hooks/useAuth";

const MyBooks = () => {
  // const axios = useAxios();
  // const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Sample books data - replace with actual API call
  useEffect(() => {
    // Simulating API call with sample data
    const sampleBooks = [
      {
        _id: "1",
        bookTitle: "The Great Gatsby",
        bookAuthor: "F. Scott Fitzgerald",
        bookPrice: 15.99,
        bookCategory: "Fiction",
        bookRating: 4.5,
        publishedYear: 1925,
        stock: 25,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        _id: "2",
        bookTitle: "To Kill a Mockingbird",
        bookAuthor: "Harper Lee",
        bookPrice: 12.99,
        bookCategory: "Classic",
        bookRating: 4.8,
        publishedYear: 1960,
        stock: 15,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        _id: "3",
        bookTitle: "1984",
        bookAuthor: "George Orwell",
        bookPrice: 14.5,
        bookCategory: "Dystopian",
        bookRating: 4.7,
        publishedYear: 1949,
        stock: 30,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        _id: "4",
        bookTitle: "Pride and Prejudice",
        bookAuthor: "Jane Austen",
        bookPrice: 13.99,
        bookCategory: "Romance",
        bookRating: 4.6,
        publishedYear: 1813,
        stock: 20,
        imageUrl: "https://via.placeholder.com/150",
      },
    ];

    setBooks(sampleBooks);
    setLoading(false);

    // Uncomment and modify for actual API call:
    // fetchBooks();
  }, []);

  // const fetchBooks = async () => {
  //   try {
  //     const response = await axios.get("/books/my-books");
  //     setBooks(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //     setLoading(false);
  //   }
  // };

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setDeleteLoading(bookId);
      try {
        // await axios.delete(`/books/${bookId}`);
        setBooks(books.filter((book) => book._id !== bookId));
        alert("Book deleted successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book. Please try again.");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleEdit = (bookId) => {
    // Navigate to edit page or open edit modal
    console.log("Edit book:", bookId);
    alert(`Edit functionality for book ${bookId} - Coming soon!`);
  };

  const getCategoryBadge = (category) => {
    const categoryStyles = {
      Fiction: "badge badge-primary text-white",
      Classic: "badge badge-secondary text-white",
      Dystopian: "badge badge-accent text-white",
      Romance: "badge badge-error text-white",
      Mystery: "badge badge-warning text-white",
      "Science Fiction": "badge badge-info text-white",
    };
    return categoryStyles[category] || "badge badge-ghost";
  };

  const getStockStatus = (stock) => {
    if (stock === 0)
      return { text: "Out of Stock", class: "text-red-600 font-semibold" };
    if (stock < 10)
      return { text: "Low Stock", class: "text-orange-600 font-semibold" };
    return { text: "In Stock", class: "text-green-600 font-semibold" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

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
          <div className="text-sm opacity-90">In Stock</div>
          <div className="text-3xl font-bold">
            {books.filter((b) => b.stock > 0).length}
          </div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Low Stock</div>
          <div className="text-3xl font-bold">
            {books.filter((b) => b.stock > 0 && b.stock < 10).length}
          </div>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-sm opacity-90">Total Value</div>
          <div className="text-3xl font-bold">
            $
            {books
              .reduce((sum, b) => sum + b.bookPrice * b.stock, 0)
              .toFixed(2)}
          </div>
        </div>
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
                <th className="text-gray-700 font-semibold">Category</th>
                <th className="text-gray-700 font-semibold">Price</th>
                <th className="text-gray-700 font-semibold">Stock</th>
                <th className="text-gray-700 font-semibold">Rating</th>
                <th className="text-gray-700 font-semibold">Year</th>
                <th className="text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const stockStatus = getStockStatus(book.stock);
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
                              book.imageUrl || "https://via.placeholder.com/150"
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
                    <td className="text-gray-600">{book.bookAuthor}</td>
                    <td>
                      <span className={getCategoryBadge(book.bookCategory)}>
                        {book.bookCategory}
                      </span>
                    </td>
                    <td className="text-gray-700 font-semibold">
                      ${book.bookPrice.toFixed(2)}
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="text-gray-700 font-medium">
                          {book.stock}
                        </span>
                        <span className={`text-xs ${stockStatus.class}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-700 font-medium">
                          {book.bookRating}
                        </span>
                      </div>
                    </td>
                    <td className="text-gray-600">{book.publishedYear}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(book._id)}
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none"
                          title="Edit Book"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          disabled={deleteLoading === book._id}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                          title="Delete Book"
                        >
                          {deleteLoading === book._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
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
                          )}
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

export default MyBooks;
