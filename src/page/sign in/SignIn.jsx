import React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const SignIn = () => {
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
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" {...register("email")} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" {...register("password")} />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default SignIn;
