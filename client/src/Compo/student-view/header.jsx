import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth";
import React, { useContext } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { LuTvMinimalPlay } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

const StudentViewCommonHeader = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("course-progress") && (
        <div className="flex items-center justify-between p-4 border-b relative bg-gray-100 ">
          <div className="flex items-center gap-8">
            {" "}
            <div
              className="font-bold flex items-center gap-2 text-lg cursor-pointer"
              onClick={() => navigate("/")}
            >
              <GiGraduateCap className="h-8 w-8 " /> LMS LEARN
            </div>
            <Button
              variant="outline"
              className=" border-hidden py-1 px-4  duration-300 rounded-md shadow-md bg-white  border-2  cursor-pointer text-md font-bold"
              onClick={() =>
                location.pathname.includes("explore-courses")
                  ? null
                  : navigate("/explore-courses")
              }
            >
              {" "}
              Explore Courses
            </Button>
          </div>
          <div className="flex items-center gap-4 ">
            <div
              className="font-bold text-md cursor-pointer border-hidden rounded bg-white p-2 shadow-md "
              onClick={() => navigate("/my-courses")}
            >
              My Courses
            </div>
            <LuTvMinimalPlay className="h-7 w-7" />
            <Button
              className="text-white cursor-pointer"
              onClick={() => handleLogout()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentViewCommonHeader;
