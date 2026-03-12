import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
      setTimeout(() => setError(""), 3000);
      navigate("/login");
    }
  };

  return (
    <>
      {error && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="navbar  bg-black/20 backdrop-blur-md px-6 shadow-lg sticky top-0 z-50 border-b border-white/10">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-purple-400">Dev</span>
            <span className="text-white">Tinder</span>
            <span>🚀</span>
          </Link>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-gray-300">
              👋 Welcome
              <span className="font-semibold text-purple-400">
                {user?.firstName}
              </span>
            </span>

            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-purple-700/90 ring-offset-3 overflow-hidden">
                  <img alt="User Photo" src={user.photoUrl} />
                </div>
              </div>

              <ul
                tabIndex="-1"
                className="menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    👤 Profile
                    <span className="badge badge-secondary">New</span>
                  </Link>
                </li>

                <li>
                  <Link to="/connections">🤝 Connections</Link>
                </li>

                <li>
                  <Link to="/requests">📩 Requests</Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-500 hover:bg-red-100/10"
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
