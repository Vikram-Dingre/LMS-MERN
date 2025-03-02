import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import React from "react";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <Card className="p-6 bg-white">
        <div className="flex items-center p-6">
          <SiTicktick className="text-3xl text-green-400 m-4 my-2" />
          <span className="text-3xl font-semibold capitalize font-mono">
            Payment Successfull!
          </span>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <Button
            className="text-white cursor-pointer"
            onClick={() => navigate("/my-courses")}
          >
            My-Courses
          </Button>
          <Button
            className="text-white cursor-pointer"
            onClick={() => navigate("/explore-courses")}
          >
            Explore-Courses
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
