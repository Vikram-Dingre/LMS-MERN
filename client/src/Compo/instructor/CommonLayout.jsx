import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const InstructorViewCommonLayout = () => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <Outlet />
        <ToastContainer />
      </div>
    </>
  );
};

export default InstructorViewCommonLayout;
