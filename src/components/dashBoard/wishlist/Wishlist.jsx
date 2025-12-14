import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import BookCard from "../../books/bookCard";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_server_url}/wishlist`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setWishlistItems(data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 md:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <FaRegHeart className="text-3xl text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">My Wishlist</h1>
              <p className="text-secondary-content mt-1">
                {wishlistItems.length > 0
                  ? `${wishlistItems.length} ${
                      wishlistItems.length === 1 ? "item" : "items"
                    } saved for later`
                  : "No items in your wishlist yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Items Grid */}
      {wishlistItems.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {wishlistItems.map((item) => (
              <BookCard key={item.id} book={item} />
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-12 bg-base-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-1">
                Ready to purchase?
              </h3>
              <p className="text-secondary-content">
                Add all items to cart and proceed to checkout
              </p>
            </div>
            {/* <button className="btn btn-primary gap-2">
              <MdOutlineShoppingCart className="text-xl" />
              Add All to Cart
            </button> */}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-base-200 rounded-full p-8 mb-6">
            <FaRegHeart className="text-6xl text-primary/40" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-secondary-content text-center mb-6 max-w-md">
            Start adding books to your wishlist by clicking the heart icon on
            any book card
          </p>
          <a href="/books" className="btn btn-primary gap-2">
            Browse Books
          </a>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
