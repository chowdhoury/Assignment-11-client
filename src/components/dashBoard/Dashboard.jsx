import React from 'react';
import { CgAddR } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuBookCopy, LuShoppingCart, LuUserRoundCog } from "react-icons/lu";
import { MdCardGiftcard, MdOutlineDashboard } from "react-icons/md";
import { PiBooksLight, PiUserFocus } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { Link } from 'react-router';

const Dashboard = () => {
    return (
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-black is-drawer-close:w-18 is-drawer-open:w-64 text-white">
          {/* Sidebar content here */}
          <ul className="menu w-full grow flex flex-col gap-2 p-4 text-base ">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                {/* Home icon */}
                <IoHomeOutline className="text-xl" />
                <span className="is-drawer-close:hidden">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                {/* Home icon */}
                <MdOutlineDashboard className="text-xl" />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <Link
                to="/dashboard/my-orders"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Orders"
              >
                {/* Settings icon */}
                <LuShoppingCart className="text-xl" />
                <span className="is-drawer-close:hidden">My Orders</span>
              </Link>
            </li>
            <li>
              <Link
              to="/dashboard/invoices"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Invoices"
              >
                {/* Settings icon */}
                <TbFileInvoice className="text-xl" />
                <span className="is-drawer-close:hidden">Invoice</span>
              </Link>
            </li>
            <li>
              <Link
                  to="/dashboard/wishlist"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Wishlist"
              >
                {/* Settings icon */}
                <FaRegHeart className="text-xl" />
                <span className="is-drawer-close:hidden">Wishlist</span>
              </Link>
            </li>

            <li>
              <Link
                  to="/dashboard/add-book"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Book"
              >
                {/* Settings icon */}
                <CgAddR className="text-xl" />
                <span className="is-drawer-close:hidden">Add Book</span>
              </Link>
            </li>
            <li>
              <Link
                  to="/dashboard/my-books"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Books"
              >
                {/* Settings icon */}
                <LuBookCopy className="text-xl" />
                <span className="is-drawer-close:hidden">My Books</span>
              </Link>
            </li>
            <li>
              <Link
                  to="/dashboard/orders"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Orders"
              >
                {/* Settings icon */}
                <MdCardGiftcard className="text-xl" />
                <span className="is-drawer-close:hidden">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                  to="/dashboard/manage-users"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Users"
              >
                {/* Settings icon */}
                <LuUserRoundCog className="text-xl" />
                <span className="is-drawer-close:hidden">Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                  to="/dashboard/manage-books"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Books"
              >
                {/* Settings icon */}
                <PiBooksLight className="text-xl" />
                <span className="is-drawer-close:hidden">Manage Books</span>
              </Link>
            </li>
            <li>
              <Link
                  to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                {/* Settings icon */}
                <PiUserFocus className="text-xl" />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Dashboard;