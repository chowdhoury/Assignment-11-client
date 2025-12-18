import PageHero from "../../components/shared/PageHero";
import { Link, useLoaderData } from "react-router";
import BookCard from "../../components/books/bookCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";

const Books = () => {
  const data = useLoaderData();
  const [books, setBooks] = useState(data);
  const [filteredBooks, setFilteredBooks] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  // Update books when data changes
  useEffect(() => {
    setBooks(data);
    setFilteredBooks(data);
  }, [data]);

  // Apply search and filter
  useEffect(() => {
    let result = [...books];

    // Apply search filter
    if (searchTerm.trim()) {
      result = result.filter(
        (book) =>
          book.bookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sort filter
    if (filterOption) {
      switch (filterOption) {
        case "Price (Low to High)":
          result.sort((a, b) => a.price - b.price);
          break;
        case "Price (High to Low)":
          result.sort((a, b) => b.price - a.price);
          break;
        case "Newer":
          result.sort(
            (a, b) =>
              new Date(b.createdAt || b.publicationDate) -
              new Date(a.createdAt || a.publicationDate)
          );
          break;
        case "Older":
          result.sort(
            (a, b) =>
              new Date(a.createdAt || a.publicationDate) -
              new Date(b.createdAt || b.publicationDate)
          );
          break;
        default:
          break;
      }
    }

    setFilteredBooks(result);
  }, [searchTerm, filterOption, books]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const handleFilter = () => {
    // Filter is handled by useEffect
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterOption("");
  };

  return (
    <div>
      <header>
        <PageHero title="Books" />
      </header>
      <main className="w-[95%] md:w-4/5 mx-auto">
        <div className="mt-6 md:mt-10 px-2 md:px-0">
          <p className="text-sm md:text-base">
            Showing {filteredBooks?.length || 0} of {books?.length || 0} Books
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-5 md:gap-10 mt-3 px-2 md:px-0">
          <aside className="lg:col-span-3">
            <div className="bg-base-200 px-4 md:px-8 rounded-lg mb-5 md:mb-10 pt-3 pb-5">
              <h2 className="text-lg md:text-[22px] font-bold text-secondary mb-2">
                Search
              </h2>
              <form onSubmit={handleSearch}>
                <label className="input w-full bg-base-100">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="search"
                    placeholder="Search by title or author"
                    className=""
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>
              </form>
            </div>
            <div className="bg-base-200 px-4 md:px-8 rounded-lg mb-5 pt-3 pb-5">
              <h2 className="text-lg md:text-[22px] font-bold text-secondary mb-2">
                Sort By
              </h2>
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="select w-full bg-base-100"
              >
                <option value="">Select option</option>
                <option value="Newer">Newer</option>
                <option value="Older">Older</option>
                <option value="Price (Low to High)">Price (Low to High)</option>
                <option value="Price (High to Low)">Price (High to Low)</option>
              </select>
              <button
                onClick={handleReset}
                className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold duration-400 w-full mt-3"
              >
                Reset Filters
              </button>
            </div>
          </aside>
          {filteredBooks?.length > 0 && (
            <section className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-x-7 md:gap-y-10">
              {filteredBooks?.map((book) => (
                <BookCard key={book._id} book={book}></BookCard>
              ))}
            </section>
          )}
          {filteredBooks?.length === 0 && (
            <div className="text-center py-12 lg:col-span-8 row-span-2 flex items-center justify-center">
              <div>
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
              </div>
              {/* <div className="mt-6">
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
                </div> */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Books;
