import React from "react";
import StudentViewCommonHeader from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const StudentViewCommonLayout = () => {
  return (
    <div>
      <StudentViewCommonHeader />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default StudentViewCommonLayout;
