import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div className="min-h-screen bg-base-100 bg-linear-to-br from-purple-900/20 via-base-100/50 to-violet-900/15">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
