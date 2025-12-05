import React from 'react';

const SignUp = () => {
    return (
      <div>
        <form action="">
          <label htmlFor="">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="">Password:</label>
          <input type="password" id="password" name="password" />
          <input type="file" id="file" name="file" />
        </form>
      </div>
    );
};

export default SignUp;