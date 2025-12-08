import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Logo from "../../components/shared/Logo";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router";
import { createUserInDB } from "../../utils/GoogleSignIn";
import toast from "react-hot-toast";

const SignIn = () => {
  const { signInWithGoogle, user, signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  if(user){
    navigate(from, { replace: true });
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        toast.success("Sign In Successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
      <div className="bg-base-200/70 w-fit p-10 rounded-lg shadow-[0_6px_30px_rgba(0,0,0,0.25)] mt-20 mb-40">
        <figure className="flex justify-center mb-4">
          <Logo className="text-xl" />
        </figure>
        <h1 className="text-3xl font-bold text-center mb-4 text-secondary">
          Sign In
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] min-w-[350px]"
        >
          <fieldset className="fieldset">
            <label className="label text-secondary">Email <span style={{color:"red"}}>*</span></label>
            <input
              type="email"
              className="input w-full text-primary"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
            <div className="flex items-start text-secondary">
              <Link to={"/password-reset/"} className="link link-hover">
                Forgot password?
              </Link>
            </div>
            <button className="text-white font-semibold bg-secondary py-2.5 rounded-sm px-[26px] hover:bg-primary duration-400 cursor-pointer mt-5 text-center inline-block">
              <span className="flex gap-2 items-center justify-center text-[16px]">
                <span>
                  <SiGnuprivacyguard />
                </span>
                Sign In
              </span>
            </button>
          </fieldset>
        </form>
        <p className="flex items-start text-secondary-content font-semibold">
          Don't have an Account?{" "}
          <Link
            to={"/signup"}
            className="text-secondary hover:text-primary ml-2 font-semibold underline"
          >
            Sign Up
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

export default SignIn;
