import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils/UploadImage";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../components/shared/Logo";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const onSubmit = async (data) => {
    const { name, email, image, password } = data;
    const imageFile = image[0];
    const imageURL = await imageUpload(imageFile);
    try {
      const result = await createUser(email, password);

      //3. Save username & profile photo
      await updateUserProfile(name, imageURL);
      console.log(result);

      navigate(from, { replace: true });
      // toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      // toast.error(err?.message);
    }
  };
  return (
    <div className="min-h-screen w-full bg-primary flex justify-center items-center -mb-40">
      <div className="bg-base-200/70 w-fit p-10 rounded-lg shadow-lg mt-20 mb-40">
        <figure className="flex justify-center mb-4">
          <Logo className="text-xl" />
        </figure>
        <h1 className="text-3xl font-bold text-center mb-4 text-secondary">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px]">
          <fieldset className="fieldset">
            <label className="label text-secondary">Name</label>
            <input
              type="text"
              className="input w-full text-primary"
              placeholder="Name"
              name="name"
              required
            />
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
            <label className="label text-secondary">Photo</label>
            <input
              type="file"
              className="file-input file-input-primary w-full"
            />
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
            to={"/authentication/sign-in"}
            className="text-secondary hover:text-primary ml-2 font-semibold underline"
          >
            Sign In
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
  );
};

export default SignUp;
