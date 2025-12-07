import React from 'react';
import Logo from '../../components/shared/Logo';

const ResetPassword = () => {
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