import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { ArrowRight, ShoppingCart } from "lucide-react";
import BookCard from "../../books/BookCard";
import Loading from "../../shared/Loading";

const LatestBooks = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_server_url}/books`);
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Get only the latest 8 books
  const latestBooks = books.slice(0, 4);

  return (
    <div className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-secondary mb-2">
              Latest Books
            </h2>
            <p className="text-secondary-content">
              Discover our newest additions to the collection
            </p>
          </div>
          <Link
            to="/books"
            className="hidden md:flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            View All Books
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {latestBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            <div className="flex justify-center mt-8 md:hidden">
              <Link
                to="/books"
                className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                View All Books
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-secondary-content mx-auto mb-4" />
            <p className="text-xl text-secondary-content">
              No books available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestBooks;
