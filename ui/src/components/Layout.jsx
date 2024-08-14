import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdTranslate, MdAttachMoney } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { ImHome } from "react-icons/im";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const menuItems = [
    { path: "/", label: "Home", icon: <ImHome /> },
    { path: "/translate", label: "Translator", icon: <MdTranslate /> },
    { path: "/pricing", label: "Pricing", icon: <MdAttachMoney /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="h-[70px] w-full bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 flex items-center justify-between px-4">
        <h1 className="font-bold text-2xl font-serif text-white border-2 rounded-full px-4 py-2 ml-4">
          Translator
        </h1>
        <div className="flex items-center space-x-2">
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-slate-800 text-2xl text-white font-bold mr-4">
            <GoPersonFill />
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-70px)] ">
        <div className="w-48 pt-14 px-4 overflow-auto  bg-gradient-to-b from-pink-500 via-pink-400 to-pink-500">
          <ul className="px-4 flex flex-col gap-2">
            {menuItems.map(({ path, label, icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`text-[#e0ddddd] p-2 flex justify-start items-center gap-2 rounded-[4px] ${
                    pathname === path ? "active" : ""
                  }`}
                >
                  <span
                    className={`text-xl p-1 ${
                      pathname === path
                        ? "bg-pink-700 text-white rounded-md "
                        : "bg-white rounded-md"
                    }`}
                  >
                    {icon}
                  </span>
                  <span
                    className={`text-md ${
                      pathname === path ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-4 bg-pink-100">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
