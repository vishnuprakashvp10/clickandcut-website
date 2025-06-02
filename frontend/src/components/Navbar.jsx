import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">BOOK NOW</li>
          <hr className="border-none outline-none h-0.5 bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/my-appointments">
          <li className="py-1">MY BOOKINGS</li>
          <hr className="border-none outline-none h-0.5 bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT US</li>
          <hr className="border-none outline-none h-0.5 bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 ">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 text-white font-bold px-8 py-3 rounded-full hidden md:block"
          >
            Welcome Guest!
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7"
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink
              to="/"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg inline-block inline-block text-center ${
                  isActive
                    ? "bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 text-white"
                    : ""
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/doctors"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg inline-block inline-block text-center ${
                  isActive
                    ? "bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 text-white"
                    : ""
                }`
              }
            >
              BOOK NOW
            </NavLink>
            <NavLink
              to="/my-appointments"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg inline-block inline-block text-center ${
                  isActive
                    ? "bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 text-white"
                    : ""
                }`
              }
            >
              MY BOOKINGS
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg inline-block inline-block text-center ${
                  isActive
                    ? "bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 text-white"
                    : ""
                }`
              }
            >
              CONTACT US
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
