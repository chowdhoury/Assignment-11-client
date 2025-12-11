import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  FaUser,
  FaEnvelope,
  FaCamera,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const UserProfile = () => {
  const { user, updateUserProfile, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      // Update the user state
      setUser({
        ...user,
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-focus mb-2">
            My Profile
          </h1>
          <p className="text-secondary-content">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Background */}
          <div className="h-32 md:h-40 bg-linear-to-r from-primary to-secondary"></div>

          {/* Profile Content */}
          <div className="relative px-6 md:px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
              <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-base-200">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <FaUser className="text-5xl md:text-6xl text-primary" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg">
                      <FaCamera />
                    </div>
                  )}
                </div>

                <div className="mb-4 md:mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary-focus">
                    {user?.displayName || "Anonymous User"}
                  </h2>
                  <p className="text-secondary-content flex items-center gap-2 mt-1">
                    <FaEnvelope className="text-primary" />
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary mt-4 md:mt-0 w-full md:w-auto"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Information */}
            {!isEditing ? (
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-base-200 p-6 rounded-xl">
                  <h3 className="text-sm font-semibold text-secondary-content mb-2">
                    DISPLAY NAME
                  </h3>
                  <p className="text-lg font-medium text-secondary-focus">
                    {user?.displayName || "Not set"}
                  </p>
                </div>

                <div className="bg-base-200 p-6 rounded-xl">
                  <h3 className="text-sm font-semibold text-secondary-content mb-2">
                    EMAIL ADDRESS
                  </h3>
                  <p className="text-lg font-medium text-secondary-focus break-all">
                    {user?.email}
                  </p>
                </div>

                <div className="bg-base-200 p-6 rounded-xl">
                  <h3 className="text-sm font-semibold text-secondary-content mb-2">
                    ACCOUNT CREATED
                  </h3>
                  <p className="text-lg font-medium text-secondary-focus">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Unknown"}
                  </p>
                </div>

                <div className="bg-base-200 p-6 rounded-xl">
                  <h3 className="text-sm font-semibold text-secondary-content mb-2">
                    LAST SIGN IN
                  </h3>
                  <p className="text-lg font-medium text-secondary-focus">
                    {user?.metadata?.lastSignInTime
                      ? new Date(
                          user.metadata.lastSignInTime
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </p>
                </div>

                {user?.photoURL && (
                  <div className="bg-base-200 p-6 rounded-xl md:col-span-2">
                    <h3 className="text-sm font-semibold text-secondary-content mb-2">
                      PROFILE PHOTO URL
                    </h3>
                    <p className="text-sm font-medium text-secondary-focus break-all">
                      {user.photoURL}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Edit Form
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Display Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      placeholder="Enter your display name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Profile Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      placeholder="Enter photo URL"
                      className="input input-bordered w-full"
                    />
                    <label className="label">
                      <span className="label-text-alt text-secondary-content">
                        Paste a URL to your profile picture
                      </span>
                    </label>
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                    />
                    <label className="label">
                      <span className="label-text-alt text-secondary-content">
                        Email cannot be changed
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1"
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FaSave className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="btn btn-outline flex-1"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
          <h3 className="font-semibold text-secondary-focus mb-2">
            Account Security
          </h3>
          <p className="text-secondary-content text-sm">
            Your email address is verified and secured. To change your password
            or update security settings, please use the password reset feature
            from the login page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
