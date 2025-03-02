import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth";
import React, { useContext } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { LuTvMinimalPlay } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-4 border-b relative bg-gray-100 ">
      <div className="flex items-center gap-8">
        {" "}
        <div
          className="font-bold flex items-center gap-2 text-lg cursor-pointer"
          onClick={() => navigate("/instructor")}
        >
          <GiGraduateCap className="h-8 w-8 " /> LMS LEARN
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <LuTvMinimalPlay className="h-7 w-7" />
        <Button
          className="text-white cursor-pointer"
          onClick={() => handleLogout()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
