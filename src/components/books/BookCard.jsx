import React, { use, useState } from "react";
import demo from "../../assets/01.png";
import { CiHeart } from "react-icons/ci";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const BookCard = ({ book }) => {
  const {user}=useAuth();
  const axios = useAxios();
  // const { data } = useQuery({
  //   queryKey: [book._id,user?.email],
  //   queryFn: async () => {
  //     const isExist = await axios.get("/wishlist", {
  //       params: { bookId: book._id, userEmail: user?.email },
  //     });
  //     if(isExist.data){
  //       setIsFavorite(true);
  //     }
  //     else{
  //       setIsFavorite(false);
  //     }
  //   },
  // });

  const {_id, bookCover, price, bookTitle, author } = book;
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      mutateAsync({ bookId: _id, bookTitle, author, bookCover, price, createdAt: new Date(), userEmail: user.email });
    }
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (newBook) => {
      await axios.post("/wishlist", newBook);
    },
    onSuccess: (data) => {
      toast.success("Book added to wishlist");
    },
    onError: (error) => {
      console.error("Error adding book", error);
    },
    onMutate: (variables) => {
      console.log("Adding book...", variables);
    },
    retry: 2,
  });
  return (
    <div>
      <div className="relative group">
        <figure className=" bg-base-200 rounded-lg flex items-center justify-center h-72 overflow-hidden">
          <img
            className="h-[250px] w-[180px] group-hover:h-[200px] group-hover:w-[140px] duration-600"
            src={bookCover}
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
      <h2 className="text-primary font-semibold mt-4 text-[18px]">
        {bookTitle}
      </h2>
      <p className="text-secondary text-sm mb-4">
        <span className="italic font-bold">by</span> {author}
      </p>
      <div className="flex justify-between text-secondary-content items-center">
        <p className="font-bold">${price}</p>
        <span className="flex items-center gap-2 ">
          <span className="text-yellow-500 text-xl">
            <FaStar />
          </span>{" "}
          <p className="font-semibold">3.4 (12)</p>
        </span>
      </div>
      <Link
        to={`/books/${_id}`}
        className="bg-primary hover:bg-secondary text-white py-3 rounded-full font-semibold duration-400 w-full mt-7 block text-center"
      >
        Details
      </Link>
    </div>
  );
};

export default BookCard;
