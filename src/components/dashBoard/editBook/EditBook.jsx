import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utils/UploadImage";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router";

const EditBook = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bookId } = useParams();
  //   const [bookData, setBookData] = useState(null);
  //   console.log("Editing book with ID:", bookId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server_url}/allbooks/${bookId}`, {
      headers: {
        authorization: `bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setValue("bookTitle", data.bookTitle);
        setValue("author", data.author);
        setValue("price", data.price);
        setValue("visibility", data.visibility);
        setValue("description", data.description);
        setValue("bookCover", data.bookCover);
        setImagePreview(data.bookCover);
        // console.log("Fetched book data:", data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, [bookId, user, setValue]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      let bookCoverUrl = imagePreview; // keep existing image

      const file = data.bookCover?.[0];

      if (file instanceof File) {
        bookCoverUrl = await imageUpload(file);
      }

      const payload = {
        bookTitle: data.bookTitle,
        author: data.author,
        price: parseFloat(data.price),
        visibility: data.visibility,
        description: data.description,
        bookCover: bookCoverUrl,
        updatedAt: new Date(),
      };

      const response = await fetch(
        `${import.meta.env.VITE_server_url}/allbooks/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user?.accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      toast.success("Book updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-base-200 via-white to-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-primary">
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
                Add New Book
              </h1>
              <p className="text-secondary-content mt-1">
                Fill in the details to add a new book to your collection
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-base-200">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-secondary-focus">
                    Basic Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-secondary-focus mb-2">
                      Book Title <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter book title"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all border-gray-200 hover:border-gray-300"
                      {...register("bookTitle", {
                        required: "Book title is required",
                      })}
                    />
                    {errors.bookTitle && (
                      <p className="text-sm text-error mt-1">
                        {errors.bookTitle.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-focus mb-2">
                      Author <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter author name"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all border-gray-200 hover:border-gray-300"
                      {...register("author", {
                        required: "Author name is required",
                      })}
                    />
                    {errors.author && (
                      <p className="text-sm text-error mt-1">
                        {errors.author.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-focus mb-2">
                      Price ($) <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all border-gray-200 hover:border-gray-300"
                        {...register("price", {
                          required: "Price is required",
                          min: {
                            value: 0,
                            message: "Price must be at least 0",
                          },
                        })}
                      />
                      {errors.price && (
                        <p className="text-sm text-error mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-focus mb-2">
                      Visibility <span className="text-primary">*</span>
                    </label>
                    <select
                      {...register("visibility")}
                      defaultValue="public"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none bg-white cursor-pointer border-gray-200 hover:border-gray-300"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-secondary-focus mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Write a detailed description of the book..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:border-gray-300 transition-all resize-none"
                      {...register("description")}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300 sticky top-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-base-200">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-secondary-focus">
                    Book Cover
                  </h2>
                </div>

                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center h-80 border-3 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 border-gray-300 bg-gray-50 overflow-hidden">
                    {imagePreview ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={imagePreview}
                          alt="Book cover preview"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white font-semibold">
                            Click to change image
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <svg
                          className="w-16 h-16 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                          Upload Book Cover
                        </p>
                        <p className="text-sm text-gray-500 text-center px-4">
                          Click to browse or drag and drop
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      {...register("bookCover", {
                        // required: "Book cover image is required",
                        onChange: handleImageChange,
                      })}
                    />
                  </label>
                  {errors.bookCover && (
                    <p className="text-sm text-error mt-1">
                      {errors.bookCover.message}
                    </p>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-2 mb-2">
                      <svg
                        className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-blue-900">
                          Image Guidelines
                        </p>
                        <ul className="text-xs text-blue-800 mt-2 space-y-1 list-disc list-inside">
                          <li>Max file size: 5MB</li>
                          <li>Formats: JPG, PNG, WEBP</li>
                          <li>Recommended: 600x900px</li>
                          <li>Clear, high-quality images</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
              {/* <button
                onClick={() => {
                  reset();
                  setImagePreview(null);
                }}
                type="button"
                className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset Form
              </button> */}

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-primary to-primary/80 text-white rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Updating
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                    Update
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
