import React, { useState } from "react";
import demo from "../../assets/01.png";
import { CiHeart } from "react-icons/ci";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const BookCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };
  return (
    <div>
      <div className="relative group">
        <figure className="bg-base-200 rounded-lg flex items-center justify-center h-65">
          <img
            className="h-[180px] w-[120px] group-hover:h-[200px] group-hover:w-[140px] duration-600"
            src={demo}
            alt=""
          />
        </figure>
        {!isFavorite ? (
          <span
            onClick={handleFavoriteClick}
            className="absolute top-4 right-3 text-3xl text-primary cursor-pointer border border-primary rounded-full p-1 hover:bg-primary hover:text-white duration-300"
          >
            <CiHeart />
          </span>
        ) : (
          <span
            onClick={handleFavoriteClick}
            className="absolute top-4 right-3 text-3xl cursor-pointer border border-primary rounded-full p-1 bg-primary text-white duration-300"
          >
            <CiHeart />
          </span>
        )}
      </div>
      <h2 className="text-primary font-semibold mt-4 mb-2 text-[18px]">
        Flovely and Unicom Erna
      </h2>
      <div className="flex justify-between text-secondary-content items-center">
        <p className="font-bold">$19.99</p>
        <span className="flex items-center gap-2 ">
          <span className="text-yellow-500 text-xl">
            <FaStar />
          </span>{" "}
          <p className="font-semibold">3.4 (12)</p>
        </span>
      </div>
      <button
        to="/books"
        className="bg-primary hover:bg-secondary text-white py-3 rounded-full font-semibold duration-400 w-full mt-7"
      >
        Details
      </button>
    </div>
  );
};

export default BookCard;
