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
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import toast from "react-hot-toast";

const Dashboard = ({ isCollapsed }) => {
  const location = useLocation();
  const { user, logOut } = useAuth();
  const role = useRole();
  // console.log(role);

  const menuItems = [
    {
      title: "Main",
      items: [
        { to: "/", icon: IoHomeOutline, label: "Home", tip: "Go to Home" },
        // {
        //   to: "/dashboard",
        //   icon: MdOutlineDashboard,
        //   label: "Dashboard",
        //   tip: "Dashboard Home",
        // },
      ],
    },
    ...(role?.role === "user"
      ? [
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
        ]
      : []),
    ...(role?.role === "librarian"
      ? [
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
        ]
      : []),
    ...(role?.role === "admin"
      ? [
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
        ]
      : []),
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

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
  };

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside
        className={`flex min-h-full flex-col bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-80"
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex h-16 items-center gap-3 border-b border-gray-700 ${
            isCollapsed ? "justify-center px-2" : "px-6"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
            <PiBooksLight className="text-2xl" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Boimela</h2>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          )}
        </div>

        {/* User Profile Card */}
        <div
          className={`mt-6 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 shadow-lg ${
            isCollapsed ? "mx-2 p-2" : "mx-4 p-4"
          }`}
        >
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="avatar online">
              <div className="w-12 rounded-full ring-2 ring-white ring-offset-2 ring-offset-gray-900">
                <img
                  src={user?.photoURL}
                  referrerPolicy="no-referrer"
                  alt="User"
                />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  {user?.displayName}
                </h3>
                <p className="text-xs text-blue-100">
                  {role?.role?.toUpperCase()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`flex-1 overflow-y-auto py-6 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!isCollapsed && (
                <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <li key={itemIdx}>
                      <Link
                        to={item.to}
                        className={`group flex items-center rounded-lg text-sm font-medium transition-all duration-200 ${
                          isCollapsed
                            ? "justify-center p-3"
                            : "gap-3 px-3 py-2.5"
                        } ${
                          isActive
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-md"
                            : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                        }`}
                        title={item.tip}
                      >
                        <item.icon
                          className={`text-xl transition-transform duration-200 ${
                            isActive ? "scale-110" : "group-hover:scale-110"
                          }`}
                        />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {isActive && (
                              <span className="h-2 w-2 rounded-full bg-white"></span>
                            )}
                          </>
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
        <div
          className={`border-t border-gray-700 ${isCollapsed ? "p-2" : "p-4"}`}
        >
          <button
            onClick={handleLogout}
            className={`flex w-full items-center rounded-lg text-sm font-medium text-gray-300 transition-all hover:bg-red-500/20 hover:text-red-400 ${
              isCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"
            }`}
          >
            <HiOutlineLogout className="text-xl" />
            {!isCollapsed && <span>Logout</span>}
          </button>
          {!isCollapsed && (
            <div className="mt-3 rounded-lg bg-gray-800 p-3">
              <p className="text-xs text-gray-400">Need help?</p>
              <a
                href="#"
                className="text-xs font-medium text-blue-400 hover:underline"
              >
                Contact Support
              </a>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
