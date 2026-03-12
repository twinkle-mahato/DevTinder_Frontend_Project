import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className="navbar  bg-black/20 backdrop-blur-md px-6 shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-purple-400">Dev</span>
          <span className="text-white">Tinder</span>
          <span>🚀</span>
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
