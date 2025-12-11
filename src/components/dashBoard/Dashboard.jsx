import React from "react";
import { CgAddR } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuBookCopy, LuShoppingCart, LuUserRoundCog } from "react-icons/lu";
import { MdCardGiftcard, MdOutlineDashboard } from "react-icons/md";
import { PiBooksLight, PiUserFocus } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { Link, useLocation } from "react-router";
import { HiOutlineLogout } from "react-icons/hi";

const Dashboard = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Main",
      items: [
        { to: "/", icon: IoHomeOutline, label: "Home", tip: "Go to Home" },
        {
          to: "/dashboard",
          icon: MdOutlineDashboard,
          label: "Dashboard",
          tip: "Dashboard Home",
        },
      ],
    },
    {
      title: "User Section",
      items: [
        {
          to: "/dashboard/my-orders",
          icon: LuShoppingCart,
          label: "My Orders",
          tip: "View your orders",
        },
        {
          to: "/dashboard/invoices",
          icon: TbFileInvoice,
          label: "Invoices",
          tip: "View invoices",
        },
        {
          to: "/dashboard/wishlist",
          icon: FaRegHeart,
          label: "Wishlist",
          tip: "Your wishlist",
        },
      ],
    },
    {
      title: "Book Management",
      items: [
        {
          to: "/dashboard/add-book",
          icon: CgAddR,
          label: "Add Book",
          tip: "Add new book",
        },
        {
          to: "/dashboard/my-books",
          icon: LuBookCopy,
          label: "My Books",
          tip: "Your books",
        },
        {
          to: "/dashboard/orders",
          icon: MdCardGiftcard,
          label: "Orders",
          tip: "Manage orders",
        },
      ],
    },
    {
      title: "Admin",
      items: [
        {
          to: "/dashboard/manage-users",
          icon: LuUserRoundCog,
          label: "Manage Users",
          tip: "User management",
        },
        {
          to: "/dashboard/manage-books",
          icon: PiBooksLight,
          label: "Manage Books",
          tip: "Book management",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          to: "/dashboard/profile",
          icon: PiUserFocus,
          label: "Profile",
          tip: "Your profile",
        },
      ],
    },
  ];

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside className="flex min-h-full w-80 flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-700 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <PiBooksLight className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">BookStore</h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="mx-4 mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="w-12 rounded-full ring-2 ring-white ring-offset-2 ring-offset-gray-900">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">John Doe</h3>
              <p className="text-xs text-blue-100">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <li key={itemIdx}>
                      <Link
                        to={item.to}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                            : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                        }`}
                        title={item.tip}
                      >
                        <item.icon
                          className={`text-xl transition-transform duration-200 ${
                            isActive ? "scale-110" : "group-hover:scale-110"
                          }`}
                        />
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-white"></span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-700 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-red-500/20 hover:text-red-400">
            <HiOutlineLogout className="text-xl" />
            <span>Logout</span>
          </button>
          <div className="mt-3 rounded-lg bg-gray-800 p-3">
            <p className="text-xs text-gray-400">Need help?</p>
            <a
              href="#"
              className="text-xs font-medium text-blue-400 hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
