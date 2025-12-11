import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils/UploadImage";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../components/shared/Logo";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { createUserInDB } from "../../utils/GoogleSignIn";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  if(user){
    // navigate(from, { replace: true });
  }
  const onSubmit = async (data) => {
    const { name, email, userImage, password } = data;
    try {
      const imageFile = userImage[0];
      const imageURL = await imageUpload(imageFile);
      await createUser(email, password);
      await updateUserProfile(name, imageURL);
      await createUserInDB({
        user: { name: name, email: email, photoURL: imageURL },
      });
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const loggedUser = result.user;
        await createUserInDB({
        user: { name: loggedUser.displayName, email: loggedUser.email, photoURL: loggedUser.photoURL },
      });
        toast.success("Sign In Successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="min-h-screen w-full bg-base-200/30 flex justify-center items-center -mb-40">
      <div className="bg-base-200 w-fit p-10 rounded-lg shadow-[0_6px_30px_rgba(0,0,0,0.25)] mt-20 mb-40">
        <figure className="flex justify-center mb-4">
          <Logo className="text-xl" />
        </figure>
        <h1 className="text-3xl font-bold text-center mb-4 text-secondary">
          Sign Up
        </h1>
        <form className="max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label text-secondary">
              Name <span style={{color:"red"}}>*</span>
            </label>
            <input
              type="text"
              className="input w-full text-primary"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
            <label className="label text-secondary">Email <span style={{color:"red"}}>*</span></label>
            <input
              type="email"
              className="input w-full text-primary"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            <label className="label text-secondary">Password <span style={{color:"red"}}>*</span></label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input w-full  text-primary z-20"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    message:
                      "Include 1 uppercase letter, 1 number, and 1 special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 mt-1">{errors.password.message}</p>
              )}
              <span
                className="absolute text-2xl right-3 top-2.5 text-primary cursor-pointer z-30"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </span>
            </div>
            <label className="label text-secondary">Photo</label>
            <input
              type="file"
              placeholder="JPG"
              className="file-input file-input-primary w-full"
              {...register("userImage", {
                validate: (file) =>
                  !file[0] ||
                  ["image/jpeg", "image/png", "image/jpg"].includes(
                    file[0].type
                  ) ||
                  "Only JPG or PNG images are allowed",
              })}
            />
            {errors.userImage && (
              <p className="text-red-600 mt-1">{errors.userImage.message}</p>
            )}
            <button className="text-white font-semibold bg-secondary py-2.5 rounded-sm px-[26px] hover:bg-primary duration-400 cursor-pointer mt-5 text-center inline-block">
              <span className="flex gap-2 items-center justify-center text-[16px]">
                <span>
                  <SiGnuprivacyguard />
                </span>
                Sign Up
              </span>
            </button>
          </fieldset>
        </form>
        <p className="flex items-start text-secondary-content font-semibold">
          Already have an Account?{" "}
          <Link
            to={"/signin"}
            className="text-secondary hover:text-primary ml-2 font-semibold underline"
          >
            Sign In
          </Link>
        </p>
        <div className="divider text-secondary-content">OR</div>

        <Link
          onClick={handleGoogleSignIn}
          className="text-secondary bg-transparent font-semibold border-2 primary hover:text-white hover:border-primary py-2.5 rounded-sm px-[26px] hover:bg-primary duration-400 cursor-pointer text-center inline-block justify-center w-full"
        >
          <span className="flex gap-2 items-center justify-center">
            <span>
              <FcGoogle />
            </span>
            Continue with Google
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
