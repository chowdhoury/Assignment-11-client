import React, { useState, useEffect, use } from "react";
import PageHero from "../../components/shared/PageHero";
import { Link, useLoaderData, useNavigate, useParams } from "react-router";
import { CiHeart } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { Rating, Star } from "@smastrom/react-rating";
import ReviewCard from "../../components/bookDetails/ReviewCard";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";
import { auth } from "../../firebase/Firebase.config";

const BookDetails = () => {
  const { role, loading } = useRole();
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  const { _id, bookCover, price, bookTitle, description, author } = book;
  const { user } = useAuth();
  const [ratingValue, setRatingValue] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();
  // console.log(user?.accessToken);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        fetch(`${import.meta.env.VITE_server_url}/allbooks/${bookId}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setBook(data));
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [user]);

  useEffect(() => {
    const checkIfInWishlist = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch(
          `${import.meta.env.VITE_server_url}/wishlist?userEmail=${
            user?.email
          }&bookId=${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const text = await res.text();

        // Check if response has content before parsing
        if (!text) {
          setIsFavorite(false);
          return;
        }

        const data = JSON.parse(text);

        // If response exists (object or non-empty array)
        setIsFavorite(!!data && (Array.isArray(data) ? data.length > 0 : true));
      } catch (error) {
        console.error("Error checking wishlist:", error);
        setIsFavorite(false);
      }
    };

    if (user?.email && _id) {
      checkIfInWishlist();
    }
  }, [user?.email, _id]);

  const handleFavoriteClick = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_server_url}/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userEmail: user?.email,
            bookId: _id,
            bookTitle: bookTitle,
            bookCover: bookCover,
            author: author,
            price: price,
          }),
        }
      );
      if (response.ok) {
        setIsFavorite(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleFavoriteDeleteClick = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_server_url}/wishlist?userEmail=${
          user?.email
        }&bookId=${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setIsFavorite(false);
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleOrderClick = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Place Your Order",
      html: `
      <div class="swal-form">

        <div class="swal-group readonly">
          <label>Name</label>
          <input type="text" value="${user?.displayName || ""}" readonly />
        </div>

        <div class="swal-group readonly">
          <label>Email</label>
          <input type="email" value="${user?.email || ""}" readonly />
        </div>

        <div class="swal-group">
          <label>
            Phone Number <span class="required">*</span>
          </label>
          <input id="swal-phone" type="tel" placeholder="01XXXXXXXXX" />
        </div>

        <div class="swal-group">
          <label>
            Delivery Address <span class="required">*</span>
          </label>
          <textarea id="swal-address" rows="3" placeholder="House, Road, Area, City"></textarea>
        </div>

      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Confirm Order",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      width: 520,
      focusConfirm: false,

      customClass: {
        popup: "swal-popup",
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },

      preConfirm: () => {
        const phone = document.getElementById("swal-phone").value.trim();
        const address = document.getElementById("swal-address").value.trim();

        if (!phone || !address) {
          Swal.showValidationMessage("All required fields must be filled");
          return false;
        }

        if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(phone)) {
          Swal.showValidationMessage("Enter a valid Bangladeshi phone number");
          return false;
        }

        return {
          name: user?.displayName,
          email: user?.email,
          phone,
          address,
        };
      },
    });

    if (!formValues) return;

    // Submit order
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_server_url}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: `BM-${Math.random()
            .toString(36)
            .substr(2, 8)
            .toUpperCase()}`,
          bookId: _id,
          author,
          description,
          bookTitle,
          bookCover,
          price,
          status: "pending",
          paymentStatus: "unpaid",
          createdAt: new Date(),
          buyer: formValues,
          seller: {
            name: book.seller.name,
            email: book.seller.email,
          },
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Order Placed",
          text: "Your order has been placed successfully.",
          confirmButtonColor: "#10b981",
        });
        navigate("/dashboard/my-orders");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const customStyles = {
    itemShapes: Star,
    itemStrokeWidth: 2,
    activeFillColor: "var(--color-primary)",
    inactiveStrokeColor: "var(--color-primary)",
    activeStrokeColor: "var(--color-primary)",
  };

  // console.log(book);
  return (
    <div>
      <header>
        <PageHero title="Book Details" />
      </header>
      <main className="w-[95%] sm:w-[90%] lg:w-4/5 mx-auto mt-6 sm:mt-8 lg:mt-10 px-2 sm:px-4 lg:px-0">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-15">
            <figure className="relative lg:col-span-2 h-[400px] sm:h-[500px] lg:h-[550px] bg-base-200/50 flex justify-center items-center rounded-lg border border-primary/30">
              <img
                className="h-[300px] w-[230px] sm:h-[380px] sm:w-[290px] lg:h-[410px] lg:w-[315px] object-cover"
                src={bookCover}
                alt="Book Cover"
              />
              <p className="absolute top-3 left-3 sm:top-5 sm:left-5 text-white bg-primary px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base">
                {author}
              </p>
            </figure>
            <div className="lg:col-span-3 mt-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary">
                  {bookTitle}
                </h1>
                <h3 className="text-lg sm:text-xl font-semibold text-green-500">
                  Available
                </h3>
              </div>
              <div className="my-4 sm:my-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <Rating
                  readOnly
                  style={{ maxWidth: 120 }}
                  value={ratingValue}
                  onChange={(selectedValue) => setRatingValue(selectedValue)}
                  itemStyles={customStyles}
                />
                <p className="text-secondary-content text-sm sm:text-base">
                  (1 Customer Review)
                </p>
              </div>
              <p className="text-secondary-content font-semibold text-sm sm:text-base">
                {description}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary my-4 sm:my-5">
                ${price}
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
                <button
                  onClick={handleOrderClick}
                  disabled={role === "librarian" || role === "admin"}
                  className="bg-primary hover:bg-secondary text-white rounded-full font-semibold duration-400 px-8 sm:px-10 py-2.5 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-center"
                >
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
                    onClick={handleFavoriteDeleteClick}
                    className="text-3xl cursor-pointer border border-primary rounded-full p-1 bg-primary text-white duration-300 h-10 w-10 flex items-center justify-center"
                  >
                    <CiHeart />
                  </span>
                )}
              </div>
              <hr className="my-5 sm:my-7 border-primary/30" />
              <div className="border border-primary/30 rounded-md mt-5 sm:mt-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 bg-base-200/50 rounded-md p-3 sm:p-5 m-2">
                  <span className="flex items-center gap-2">
                    <span className="text-primary flex-shrink-0">
                      <FaCheck />
                    </span>
                    <p className="text-sm sm:text-base">
                      Free shipping orders from $150
                    </p>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary flex-shrink-0">
                      <FaCheck />
                    </span>
                    <p className="text-sm sm:text-base">
                      Mamaya Flash Discount: Starting at 30% Off
                    </p>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary flex-shrink-0">
                      <FaCheck />
                    </span>
                    <p className="text-sm sm:text-base">
                      30 days exchange & return
                    </p>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary flex-shrink-0">
                      <FaCheck />
                    </span>
                    <p className="text-sm sm:text-base">
                      Safe & Secure online shopping
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-16 lg:mt-25">
            <h2 className="text-base sm:text-lg text-primary font-bold text-center">
              Reviews (3)
            </h2>
            <hr className="my-5 sm:my-7 border-primary/30" />
            <div className="px-2 sm:px-6 lg:px-10">
              <form action="">
                <h1 className="text-secondary text-xl sm:text-2xl font-bold mb-2">
                  Your Reviews
                </h1>
                <div className="">
                  <p className="text-secondary-content mb-1 text-sm sm:text-base">
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
                <p className="text-secondary-content mt-4 sm:mt-5 mb-1 text-sm sm:text-base">
                  Your Review <span style={{ color: "red" }}>*</span>
                </p>
                <textarea
                  name=""
                  className="bg-base-200/50 border border-primary/30 rounded-md w-full h-24 sm:h-32 p-3 text-primary resize-none text-sm sm:text-base"
                  resize="none"
                  id=""
                ></textarea>
                <button className="bg-primary hover:bg-secondary text-white rounded-full font-semibold duration-400 px-8 sm:px-10 py-2.5 sm:py-3 mt-2 w-full sm:w-auto">
                  Submit Review
                </button>
              </form>
            </div>
            <hr className="my-5 sm:my-7 border-primary/30" />
            <ReviewCard />
            {/* Review Cards would go here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
