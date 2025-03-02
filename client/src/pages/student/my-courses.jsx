import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthContext } from "@/context/auth";
import {
  fetchPurchasedCoursesList,
  fetchStudentPurchasedCourseDetails,
} from "@/services/courseServices";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentMyCoursesPage = () => {
  const [studentPurchasedCoursesList, setStudentPurchasedCoursesList] =
    useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchStudentPurchasedCoursesList() {
    auth.user._id;
    const data = await fetchPurchasedCoursesList(auth?.user?._id);
    if (data?.success) {
      setStudentPurchasedCoursesList(data.coursesList);
    }
  }

  useEffect(() => {
    if (auth?.user?._id) {
      fetchStudentPurchasedCoursesList();
    }
  }, []);

  return (
    <div className="h-full w-full p-6">
      <h1 className="text-3xl mb-4 font-bold capitalize">Your Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {!!studentPurchasedCoursesList.length &&
          studentPurchasedCoursesList.map((course) => (
            <Card className="p-4 px-2 w-full  m-4 ">
              <img
                src={course.courseImage}
                className="aspect-video border border-gray-300 shadow-sm shadow-gray-300"
                alt=""
              />
              <h1 className="text-lg  font-semibold capitalize mt-4">
                {course.title}
              </h1>
              <h1 className="text-md text-gray-500 font-semibold  capitalize my-3">
                {course.instructorName}
              </h1>
              <Button
                className="text-white w-full cursor-pointer"
                onClick={() => navigate(`/course-progress/${course?.courseId}`)}
              >
                Start Watching...
              </Button>
            </Card>
          ))}
      </div>
      {!studentPurchasedCoursesList.length && (
        <h1 className="text-2xl font-semibold underline">
          No Purchased Courses found For You...
        </h1>
      )}
    </div>
  );
};

export default StudentMyCoursesPage;
