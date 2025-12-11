import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { FaStar, FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";

const ManageBooks = () => {
  const axiosInstance = useAxios();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch books from API
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      // Fallback to sample data for demonstration
      setBooks([
        {
          _id: "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          price: 15.99,
          category: "Fiction",
          imageURL: "https://via.placeholder.com/150",
          rating: 4.5,
          reviews: 120,
          stock: 25,
          publishedYear: 1925,
          createdAt: "2024-12-01",
        },
        {
          _id: "2",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          price: 12.99,
          category: "Fiction",
          imageURL: "https://via.placeholder.com/150",
          rating: 4.8,
          reviews: 250,
          stock: 15,
          publishedYear: 1960,
          createdAt: "2024-11-28",
        },
        {
          _id: "3",
          title: "1984",
          author: "George Orwell",
          price: 14.5,
          category: "Science Fiction",
          imageURL: "https://via.placeholder.com/150",
          rating: 4.7,
          reviews: 180,
          stock: 30,
          publishedYear: 1949,
          createdAt: "2024-11-25",
        },
        {
          _id: "4",
          title: "Pride and Prejudice",
          author: "Jane Austen",
          price: 13.99,
          category: "Romance",
          imageURL: "https://via.placeholder.com/150",
          rating: 4.6,
          reviews: 95,
          stock: 20,
          publishedYear: 1813,
          createdAt: "2024-11-20",
        },
        {
          _id: "5",
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          price: 16.99,
          category: "Fiction",
          imageURL: "https://via.placeholder.com/150",
          rating: 4.3,
          reviews: 75,
          stock: 10,
          publishedYear: 1951,
          createdAt: "2024-11-15",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId, bookTitle) => {
    if (window.confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
      try {
        // Replace with your actual API endpoint
        await axiosInstance.delete(`/books/${bookId}`);
        setBooks(books.filter((book) => book._id !== bookId));
        toast.success("Book deleted successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
        toast.error("Failed to delete book");
      }
    }
  };

  const getStockBadge = (stock) => {
    if (stock === 0) return "badge badge-error text-white";
    if (stock < 15) return "badge badge-warning text-white";
    return "badge badge-success text-white";
  };

  const getStockLabel = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 15) return `Low Stock (${stock})`;
    return `In Stock (${stock})`;
  };

  // Filter and search books
  const filteredBooks = books
    .filter((book) => {
      const matchesCategory =
        filterCategory === "All" || book.category === filterCategory;
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  // Get unique categories
  const categories = ["All", ...new Set(books.map((book) => book.category))];

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-base-200 via-white to-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-primary">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-xl">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-secondary-focus">
                  Manage Books
                </h1>
                <p className="text-secondary-content mt-1">
                  View, edit, and manage your book collection
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="stats shadow">
                <div className="stat py-4 px-6">
                  <div className="stat-title text-xs">Total Books</div>
                  <div className="stat-value text-2xl text-primary">
                    {books.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <label className="block text-sm font-semibold text-secondary-focus mb-2">
                <FaSearch className="inline mr-2" />
                Search Books
              </label>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all border-gray-200"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-secondary-focus mb-2">
                <FaFilter className="inline mr-2" />
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="select select-bordered w-full border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-secondary-focus mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered w-full border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-base-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-secondary-content"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-secondary-focus mb-2">
              No Books Found
            </h3>
            <p className="text-secondary-content">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop View - Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="text-center">Image</th>
                      <th>Book Details</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th>Stock</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book) => (
                      <tr key={book._id} className="hover:bg-base-100">
                        <td className="text-center">
                          <div className="avatar">
                            <div className="w-16 h-20 rounded-lg">
                              <img
                                src={book.imageURL}
                                alt={book.title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-secondary-focus">
                            {book.title}
                          </div>
                          <div className="text-sm text-secondary-content">
                            Published: {book.publishedYear}
                          </div>
                        </td>
                        <td className="text-secondary-content">
                          {book.author}
                        </td>
                        <td>
                          <span className="badge badge-primary badge-outline">
                            {book.category}
                          </span>
                        </td>
                        <td className="font-bold text-primary">
                          ${book.price.toFixed(2)}
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" />
                            <span className="font-semibold">{book.rating}</span>
                            <span className="text-xs text-secondary-content">
                              ({book.reviews})
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={getStockBadge(book.stock)}>
                            {getStockLabel(book.stock)}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2 justify-center">
                            <button
                              className="btn btn-sm btn-primary text-white"
                              title="Edit Book"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteBook(book._id, book.title)
                              }
                              className="btn btn-sm btn-error text-white"
                              title="Delete Book"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View - Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="avatar shrink-0">
                      <div className="w-24 h-32 rounded-lg">
                        <img
                          src={book.imageURL}
                          alt={book.title}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-secondary-focus mb-1 truncate">
                        {book.title}
                      </h3>
                      <p className="text-sm text-secondary-content mb-2">
                        by {book.author}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="badge badge-primary badge-outline badge-sm">
                          {book.category}
                        </span>
                        <span
                          className={`badge badge-sm ${getStockBadge(
                            book.stock
                          )}`}
                        >
                          {getStockLabel(book.stock)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-primary">
                          ${book.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <span className="font-semibold">{book.rating}</span>
                          <span className="text-xs text-secondary-content">
                            ({book.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-primary text-white flex-1">
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book._id, book.title)}
                          className="btn btn-sm btn-error text-white flex-1"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Summary */}
        {!loading && filteredBooks.length > 0 && (
          <div className="mt-6 text-center text-secondary-content">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
