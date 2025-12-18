import React from "react";
import { LuBookMarked } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user);

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
  }
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary duration-300">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books" className="hover:text-primary duration-300">
          Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="hover:text-primary duration-300">
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className=" bg-base-100 flex justify-center py-5 ">
      <div className="navbar lg:w-4/5 w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2  shadow z-50"
            >
              {navLinks}
            </ul>
          </div>
          <Logo textSize="text-3xl" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-5 px-1 text-[18px] font-semibold text-secondary">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          {user && (<div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost btn-sm"
            >
              <div className="w-8 rounded-full ring-2 ring-blue-500 ring-offset-2">
                <img
                  alt="User avatar"
                  src={user?.photoURL}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-52 rounded-box bg-base-200 p-2 shadow-lg">
                    <li><a>Profile</a></li>
                    {/* <li><a>Settings</a></li> */}
                    <li
                    onClick={handleLogout}
                      ><a>Logout</a></li>
                  </ul>
          </div>)}

          {!user && (
            <div>
              <Link
                to="/signin"
                className="text-base-100 bg-primary px-5 py-3 rounded-md font-bold mr-2 hover:bg-secondary duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-base-100 bg-primary px-5 py-3 rounded-md font-bold mr-2 hover:bg-secondary duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
