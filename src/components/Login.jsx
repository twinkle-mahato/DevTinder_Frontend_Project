import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLogInForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearFields = () => {
    setEmailId("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleLogin = async () => {
    setError("");
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
      clearFields();
    }
  };

  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something Went wrong");
      clearFields();
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash shadow-2xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-md w-96">
        <h2 className="card-title text-xl justify-center font-medium mt-7">
          {isLogInForm ? "🔐 Login" : "🚀 SignUp"}
        </h2>

        <div className="card-body m-2">
          {!isLogInForm && (
            <>
              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text my-1">
                    First Name <span className="text-red-800">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter Your First Name"
                  className="input w-full max-w-xs bg-white/5 border border-white/15 focus:outline-none focus:border-purple-400"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError("");
                  }}
                />
              </label>

              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text my-1">
                    Last Name<span className="text-red-800">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter Your Last Name"
                  className="input w-full max-w-xs bg-white/5 border border-white/15 focus:outline-none focus:border-purple-400"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                  }}
                />
              </label>
            </>
          )}

          <label className="form-control w-full max-w-xs my-1">
            <div className="label my-1">
              <span className="label-text">
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
                setError("");
              }}
            />
          </label>

          <label className="form-control w-full max-w-xs my-1">
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
                setError("");
              }}
            />
          </label>

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

          <div className="card-actions justify-center my-5">
            <button
              className="btn w-full rounded-full bg-linear-to-r from-violet-600 to-purple-500 border-0 text-white hover:from-violet-800 hover:to-purple-600"
              onClick={isLogInForm ? handleLogin : handleSignUp}
            >
              {isLogInForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <div className="divider text-base-content/30 text-xs my-1">OR</div>

          <p className="text-sm text-base-content/50 text-center">
            {isLogInForm
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              className="text-primary font-semibold ml-1 hover:underline cursor-pointer"
              onClick={() => {
                setIsLoginForm((v) => !v);
                setError("");
                clearFields();
              }}
            >
              {isLogInForm ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
