import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../page/sign up/SignUp";
import SignIn from "../page/sign in/SignIn";
import Home from "../page/home/Home";
import ResetPassword from "../page/reset-password/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/password-reset",
        element: <ResetPassword/>,
      }
    ],
  },

  {
    path: "/dashboard",
    element: <h2>Dashboard Page</h2>,
    // children: [
    //     {
    //         path: ''
    //     }
    // ]
  },
]);
