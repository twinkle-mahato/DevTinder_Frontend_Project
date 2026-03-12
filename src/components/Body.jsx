import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      // it will give me the information of logged in user
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      //if user is unauthorised navigate to login page
      if (err.status === 401 ) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 bg-linear-to-br from-purple-900/20 via-base-100/50 to-violet-900/15">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
