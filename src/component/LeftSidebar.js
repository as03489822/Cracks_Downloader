'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSettings } from "react-icons/fi";
import { MdDashboard, MdOutlineContactMail, MdLogout } from "react-icons/md";
import {
  FaPlus,
  FaUser,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { path: "/crack-dashboard", label: "Dashboard", icon: <MdDashboard /> },
    // { path: "/transfers", label: "Transfers", icon: <FaExchangeAlt /> },
    { path: "/crack-dashboard/add-crack", label: "Add Crack", icon: <FaPlus /> },
    { path: "/crack-dashboard/cracks", label: "Cracks", icon: <FaUser /> },
    // { path: "/profile", label: "Profile", icon: <FaUserAlt /> },
    // { path: "/analytics", label: "Analytics", icon: <FaChartBar /> },
    // { path: "/savings", label: "Savings", icon: <FaPiggyBank /> },
    // { path: "/records", label: "Records", icon: <FaRegFileAlt /> },
    // { path: "/history", label: "History", icon: <FaHistory /> },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/"); // Go back to login/home
  };

  const linkClasses = (path) =>
    `flex items-center gap-2 p-2 rounded-md transition-all ${
      pathname === path
        ? "bg-green-700 text-white font-semibold"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <div className="w-[20%] h-full bg-[#242e24] text-white flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl">Breath Natural</div>

        <nav className="flex flex-col space-y-2 px-4">
          {menu.map((item) => (
            <Link href={item.path} key={item.path} className={linkClasses(item.path)}>
              <div className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-4 pb-6 flex flex-col space-y-2">
        <button
          className="flex gap-3 items-center p-2 text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={logout}
        >
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
