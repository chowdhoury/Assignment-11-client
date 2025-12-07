import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Logo from "../../components/shared/Logo";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="min-h-screen w-full bg-primary flex justify-center items-center -mb-40">
      <div className="bg-base-200/70 w-fit p-10 rounded-lg shadow-lg mt-20 mb-40">
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
            <label className="label text-secondary">Email</label>
            <input
              type="email"
              className="input w-full text-primary"
              placeholder="Email"
              name="email"
              required
            />
            <label className="label text-secondary">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input w-full  text-primary z-20"
                placeholder="Password"
                name="password"
                required
              />
              <span
                className="absolute text-2xl right-3 top-2.5 text-primary cursor-pointer z-30"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </span>
            </div>
            <div className="flex items-start text-secondary">
              <Link
                to={"/password-reset"}
                className="link link-hover"
              >
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

        <Link className="text-secondary bg-transparent font-semibold border-2 primary hover:text-white hover:border-primary py-2.5 rounded-sm px-[26px] hover:bg-primary duration-400 cursor-pointer text-center inline-block justify-center w-full">
          <span className="flex gap-2 items-center justify-center">
            <span>
              <FcGoogle />
            </span>
            Continue with Google
          </span>
        </Link>
      </div>
    </div>
    // <div>
    //   <form action="" onSubmit={handleSubmit(onSubmit)}>
    //     <label htmlFor="email">Email:</label>
    //     <input type="email" id="email" name="email" {...register("email")} />
    //     <label htmlFor="password">Password:</label>
    //     <input type="password" id="password" name="password" {...register("password")} />
    //     <input type="submit" value="Sign In" />
    //   </form>
    // </div>
  );
};

export default SignIn;
