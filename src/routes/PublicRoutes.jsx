import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

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
    element: <h2>Signup Page</h2>,
  },
  {
    path: "/signin",
    element: <h2>Signin Page</h2>,
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
