import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { imageUpload } from '../../utils/UploadImage';
import { useLocation, useNavigate } from 'react-router';


const SignUp = () => {
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Name:</label>
          <input type="text" id="name" name="name" {...register("name")} />
          <label htmlFor="">Email:</label>
          <input type="email" id="email" name="email" {...register("email")} />
          <label htmlFor="">Password:</label>
          <input type="password" id="password" name="password" {...register("password")} />
          <input type="file" id="file" name="file" {...register("file")} />
            <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
};

export default SignUp;