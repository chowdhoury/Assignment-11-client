import React, { useState } from "react";
import Dashboard from "../components/dashBoard/Dashboard";
import { Outlet, useLocation } from "react-router";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Get page title from path
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (path === "dashboard" || path === "") return "Dashboard Home";
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Modern Header */}
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left section */}
            <div className="flex items-center gap-4">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-ghost btn-square lg:hidden"
              >
                <HiOutlineMenuAlt2 className="h-6 w-6 text-gray-700" />
              </label>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="btn btn-ghost btn-square hidden lg:flex"
                aria-label="toggle sidebar"
              >
                <HiOutlineMenuAlt2 className="h-6 w-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Welcome back to your dashboard
                </p>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search bar - hidden on mobile */}
              {/* <div className="relative hidden md:block">
                  <IoSearchOutline className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="input input-sm w-48 rounded-full border-gray-300 bg-gray-50 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div> */}

              {/* Notifications */}
              <button className="btn btn-ghost btn-circle btn-sm relative">
                <IoNotificationsOutline className="h-6 w-6 text-gray-600" />
                <span className="badge badge-error badge-xs absolute right-1 top-1"></span>
              </button>

              {/* Settings */}
              {/* <button className="btn btn-ghost btn-circle btn-sm hidden sm:flex">
                  <FiSettings className="h-5 w-5 text-gray-600" />
                </button> */}

              {/* User Avatar */}
              <div className="dropdown dropdown-end">
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
                {/* <ul tabIndex={0} className="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg">
                    <li><a>Profile</a></li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                  </ul> */}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <Dashboard isCollapsed={isCollapsed} />
    </div>
  );
};

export default DashboardLayout;
