import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../page/sign up/SignUp";
import SignIn from "../page/sign in/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <h2>Home Page</h2>,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/signin",
    element: <SignIn/>
  },
  {
    path: "/dashboard",
    element: <h2>Dashboard Page</h2>,
    // children: [
    //     {
    //         path: ''
    //     }
    // ]
  }
]);
