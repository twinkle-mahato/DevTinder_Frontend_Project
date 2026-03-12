import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("twinkle@123gmail.com");
  const [password, setPassword] = useState("Twinkle@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      //console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash shadow-2xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-md w-96">
        <h2 className="card-title text-xl justify-center font-medium mt-7">
          🔐Login
        </h2>

        <div className="card-body m-2">
          <>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text my-1">
                  Email Id <span className="text-red-800">*</span>
                </span>
              </div>

              <input
                type="text"
                value={emailId}
                placeholder="Enter Your Email"
                className="input w-full max-w-xs bg-white/5 border border-white/15 focus:outline-none focus:border-purple-400"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text my-1">
                  Password <span className="text-red-800">*</span>
                </span>
              </div>

              <input
                type="password"
                value={password}
                placeholder="Enter Your Password"
                className="input w-full max-w-xs bg-white/5 border border-white/15 focus:outline-none focus:border-purple-400"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </>

          {error && (
            <div
              role="alert"
              className="alert alert-error bg-error/10 border border-error/20 text-error mt-2 py-2"
            >
              <div className="text-sm">
                {error.split(",").map((err, index) => (
                  <p key={index}>⚠️ {err.trim()}</p>
                ))}
              </div>
            </div>
          )}

          <div className="card-actions justify-center my-6">
            <button
              className="btn w-full rounded-full bg-linear-to-r from-violet-600 to-purple-500 border-0 text-white hover:from-violet-800 hover:to-purple-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
