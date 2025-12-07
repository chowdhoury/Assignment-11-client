import React from 'react';
import Logo from '../../components/shared/Logo';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const {resetPassword} = useAuth();
    const onSubmit = (data) => {
        const { email } = data;
        resetPassword(email)
        .then(() => {
          toast.success('Password reset email sent. Please check your inbox.');
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return (
      <div className="min-h-screen w-full bg-primary flex justify-center items-center -mb-40">
        <div className="bg-base-200/70 w-fit p-10 rounded-lg shadow-lg mt-20 mb-40">
          <figure className="flex justify-center mb-4">
            <Logo className="text-xl" />
          </figure>
          <h1 className="text-3xl font-bold text-center text-secondary">
            Reset Password
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
              <button className="text-white font-semibold bg-secondary py-2.5 rounded-sm px-[26px] hover:bg-primary duration-400 cursor-pointer mt-5 text-center inline-block">
                <span className="flex gap-2 items-center justify-center text-[16px]">
                  Reset Password
                </span>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
};

export default ResetPassword;