import React from 'react';
import { CgAddR } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuBookCopy, LuShoppingCart, LuUserRoundCog } from "react-icons/lu";
import { MdCardGiftcard, MdOutlineDashboard } from "react-icons/md";
import { PiBooksLight, PiUserFocus } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";

const Dashboard = () => {
    return (
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-black is-drawer-close:w-14 is-drawer-open:w-64 text-white">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                {/* Home icon */}
                <IoHomeOutline className="text-xl" />
                <span className="is-drawer-close:hidden">Home</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                {/* Home icon */}
                <MdOutlineDashboard className="text-xl" />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </button>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Orders"
              >
                {/* Settings icon */}
                <LuShoppingCart className="text-xl" />
                <span className="is-drawer-close:hidden">My Orders</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Invoices"
              >
                {/* Settings icon */}
                <TbFileInvoice className="text-xl" />
                <span className="is-drawer-close:hidden">Invoice</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Wishlist"
              >
                {/* Settings icon */}
                <FaRegHeart className="text-xl" />
                <span className="is-drawer-close:hidden">Wishlist</span>
              </button>
            </li>

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Book"
              >
                {/* Settings icon */}
                <CgAddR className="text-xl" />
                <span className="is-drawer-close:hidden">Add Book</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Books"
              >
                {/* Settings icon */}
                <LuBookCopy className="text-xl" />
                <span className="is-drawer-close:hidden">My Books</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Orders"
              >
                {/* Settings icon */}
                <MdCardGiftcard className="text-xl" />
                <span className="is-drawer-close:hidden">Orders</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Users"
              >
                {/* Settings icon */}
                <LuUserRoundCog className="text-xl" />
                <span className="is-drawer-close:hidden">Manage Users</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Books"
              >
                {/* Settings icon */}
                <PiBooksLight className="text-xl" />
                <span className="is-drawer-close:hidden">Manage Books</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                {/* Settings icon */}
                <PiUserFocus className="text-xl" />
                <span className="is-drawer-close:hidden">Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Dashboard;