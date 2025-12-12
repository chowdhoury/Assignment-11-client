import React, { useState } from "react";
import PageHero from "../../components/shared/PageHero";
import { Link, useLoaderData } from "react-router";
import { CiHeart } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { Rating, Star } from "@smastrom/react-rating";
import ReviewCard from "../../components/bookDetails/ReviewCard";

const BookDetails = () => {
  const [ratingValue, setRatingValue] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  const customStyles = {
    itemShapes: Star,
    itemStrokeWidth: 2,
    activeFillColor: "var(--color-primary)",
    inactiveStrokeColor: "var(--color-primary)",
    activeStrokeColor: "var(--color-primary)",
  };
  const book=useLoaderData();
  const { _id, bookCover, price, bookTitle, author, description } = book;
  console.log(book);
  return (
    <div>
      <header>
        <PageHero title="Book Details" />
      </header>
      <main className="w-4/5 mx-auto mt-10">
        <div>
          <div className="grid grid-cols-5  gap-15">
            <figure className="relative col-span-2 h-[550px] bg-base-200/50 flex justify-center items-center rounded-lg border border-primary/30">
              <img
                className="h-[410px] w-[315px]"
                src={bookCover}
                alt="Book Cover"
              />
              <p className="absolute top-5 left-5 text-white bg-primary px-4 py-2">Author</p>
            </figure>
            <div className="col-span-3 mt-3">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-secondary">
                  {bookTitle}
                </h1>
                <h3 className="text-xl font-semibold text-green-500">
                  Available
                </h3>
              </div>
              <div className="my-5 flex items-center gap-3">
                <Rating
                  readOnly
                  style={{ maxWidth: 120 }}
                  value={ratingValue}
                  onChange={(selectedValue) => setRatingValue(selectedValue)}
                  itemStyles={customStyles}
                />
                <p className="text-secondary-content">(1 Customer Review)</p>
              </div>
              <p className="text-secondary-content font-semibold">
                {description}
              </p>
              <h1 className="text-3xl font-bold text-primary my-5">${price}</h1>
              <div className="flex gap-5 items-center">
                <button className="bg-primary hover:bg-secondary text-white rounded-full font-semibold duration-400 px-10 py-3">
                  Order Now
                </button>
                {!isFavorite ? (
                  <span
                    onClick={handleFavoriteClick}
                    className="text-3xl text-primary cursor-pointer border border-primary rounded-full p-1 hover:bg-primary hover:text-white duration-300 h-10 w-10 flex items-center justify-center"
                  >
                    <CiHeart />
                  </span>
                ) : (
                  <span
                    onClick={handleFavoriteClick}
                    className="text-3xl cursor-pointer border border-primary rounded-full p-1 bg-primary text-white duration-300 h-10 w-10 flex items-center justify-center"
                  >
                    <CiHeart />
                  </span>
                )}
              </div>
              <hr   className="my-7 border-primary/30" />

              {/* <div className="border border-primary/30 rounded-md">
                <div className="grid grid-cols-4 gap-y-3 bg-base-200/50 rounded-md p-5 m-2">
                  <p className="text-secondary font-bold">
                    SKU:{" "}
                    <span className="text-secondary-content font-semibold">
                      FTC1020B65D
                    </span>
                  </p>
                  <p className="text-secondary font-bold">
                    Tags:
                    <span className="text-secondary-content font-semibold">
                      Design Low Book
                    </span>
                  </p>
                  <p className="text-secondary font-bold">
                    Total page:{" "}
                    <span className="text-secondary-content font-semibold">
                      330
                    </span>
                  </p>
                  <p className="text-secondary font-bold">
                    Publish Years:{" "}
                    <span className="text-secondary-content font-semibold">
                      2021
                    </span>
                  </p>
                  <p className="text-secondary font-bold">
                    Category:{" "}
                    <span className="text-secondary-content font-semibold">
                      Kids
                    </span>
                  </p>
                  <p className="text-secondary font-bold">
                    Format:{" "}
                    <span className="text-secondary-content font-semibold">
                      Hardcover
                    </span>
                  </p>
                  <p className="text-secondary font-bold">
                    Language:{" "}
                    <span className="text-secondary-content font-semibold">
                      English
                    </span>
                  </p>
                  <p className="text-secondary font-bold">
                    Century:{" "}
                    <span className="text-secondary-content font-semibold">
                      United States
                    </span>
                  </p>
                </div>
              </div> */}
              <div className="border border-primary/30 rounded-md mt-7">
                <div className="grid grid-cols-2 gap-y-3 bg-base-200/50 rounded-md p-5 m-2">
                  <span className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaCheck />
                    </span>
                    <p>Free shipping orders from $150</p>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaCheck />
                    </span>
                    <p>Mamaya Flash Discount: Starting at 30% Off</p>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaCheck />
                    </span>
                    <p>30 days exchange & return</p>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaCheck />
                    </span>
                    <p>Safe & Secure online shopping</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-25">
            <h2 className="text-lg text-primary font-bold text-center">
              Reviews (3)
            </h2>
            <hr className="my-7 border-primary/30" />
            <div className="px-10">
              <form action="">
                <h1 className="text-secondary text-2xl font-bold mb-2">
                  Your Reviews
                </h1>
                <div className="">
                  <p className="text-secondary-content mb-1">
                    Your Rating <span style={{ color: "red" }}>*</span>
                  </p>
                  <Rating
                    isRequired
                    style={{ maxWidth: 200 }}
                    value={ratingValue}
                    onChange={(selectedValue) => setRatingValue(selectedValue)}
                    itemStyles={customStyles}
                  />
                </div>
                <p className="text-secondary-content mt-5 mb-1">
                  Your Review <span style={{ color: "red" }}>*</span>
                </p>
                <textarea
                  name=""
                  className="bg-base-200/50 border border-primary/30 rounded-md w-full h-32 p-3 text-primary resize-none"
                  resize="none"
                  id=""
                ></textarea>
                <button className="bg-primary hover:bg-secondary text-white rounded-full font-semibold duration-400 px-10 py-3 mt-2">
                  Submit Review
                </button>
              </form>
            </div>
            <hr   className="my-7 border-primary/30" />
            <div className="flex flex-col gap-5">
              <ReviewCard/>
            <hr className=" border-primary/30" />
              {/* <ReviewCard/>
            <hr class=" border-primary/30" />
              <ReviewCard/>
            <hr class=" border-primary/30" />
              <ReviewCard/>
            <hr class=" border-primary/30" />
              <ReviewCard/>
            <hr class=" border-primary/30" />
              <ReviewCard/>
            <hr class=" border-primary/30" />
              <ReviewCard/>
            <hr class=" border-primary/30" />
              <ReviewCard/>
            <hr class=" border-primary/30" /> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
