import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../page/sign up/SignUp";
import SignIn from "../page/sign in/SignIn";
import Home from "../page/home/Home";
import ResetPassword from "../page/reset-password/ResetPassword";
import Books from "../page/Books/Books";
import BookDetails from "../page/bookDetails/BookDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import MyOrders from "../components/dashBoard/myOrders/MyOrders";
import Invoices from "../components/dashBoard/invoices/Invoices";
import Wishlist from "../components/dashBoard/wishlist/Wishlist";
import Orders from "../components/dashBoard/orders/Orders";
import AddProducts from "../components/dashBoard/addProducts/AddProducts";
import MyBooks from "../components/dashBoard/myBooks/MyBooks";
import ManageUser from "../components/dashBoard/manageUser/ManageUser";
import ManageBooks from "../components/dashBoard/manageBooks/ManageBooks";
import UserProfile from "../components/dashBoard/userProfile/UserProfile";
import DashboardHome from "../components/dashBoard/dasboardHome/DashboardHome";

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
        element: <ResetPassword />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:bookId",
        element: <BookDetails />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome/>,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "add-book",
        element: <AddProducts />,
      },
      {
        path: "my-books",
        element: <MyBooks />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "manage-users",
        element: <ManageUser />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
]);
