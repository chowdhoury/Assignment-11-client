import React from "react";
import { LuBookMarked } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user } = useAuth();
  console.log(user);
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2  shadow"
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
          <figure>
            {user?.photoURL ? (
              <img
              referrerPolicy="no-referrer"
                src={user.photoURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <CgProfile className="w-10 h-10 rounded-full text-primary" />
            )}
          </figure>

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
