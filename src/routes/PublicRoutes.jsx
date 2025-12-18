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
import PaymentSuccess from "../components/dashBoard/myOrders/PaymentSuccess";
import PaymentFailed from "../components/dashBoard/myOrders/PaymentFailed";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import LibrariansRoute from "./LibrariansRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../page/NotFound/NotFound";
import EditBook from "../components/dashBoard/editBook/EditBook";

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
        loader: () => fetch(`${import.meta.env.VITE_server_url}/books`),
      },
      {
        path: "/books/:bookId",
        element: <BookDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "my-orders",
        element: (
          <UserRoute>
            <MyOrders />
          </UserRoute>
        ),
      },
      {
        path: "invoices",
        element: (
          <UserRoute>
            <Invoices />
          </UserRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <UserRoute>
            <Wishlist />
          </UserRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <LibrariansRoute>
            <AddProducts />
          </LibrariansRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrariansRoute>
            <MyBooks />
          </LibrariansRoute>
        ),
      },
      {
        path: ":bookId/edit-book",
        element: (
          <LibrariansRoute>
            <EditBook />
          </LibrariansRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <LibrariansRoute>
            <Orders />
          </LibrariansRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-failed",
        element: <PaymentFailed />,
      },
    ],
  },
]);
