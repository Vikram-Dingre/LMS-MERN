import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstructorContext } from "@/context/instructor";
import {
  deleteInstructorCourseService,
  fetchInstructorCoursesService,
} from "@/services/courseServices";
import { FaRegEdit } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const InstructorViewCourses = () => {
  const navigate = useNavigate();
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function handleDeleteCourse(id) {
    const data = await deleteInstructorCourseService(id);
    if (data.success) {
      toast.success(data.message, { position: "top-left" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <div>
      <Card className="bg-white ">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">All Courses</CardTitle>
            <CardTitle>
              <Button
                className="bg-black text-white cursor-pointer"
                onClick={() => {
                  navigate("/instructor/add-new-course");
                }}
              >
                <FiPlus />
                Add New Course
              </Button>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="text-gray-700">
                A list of your recent Courses.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructorCoursesList.map((course, index) => (
                  <TableRow
                    key={index}
                    className="text-[14px] hover:bg-gray-100"
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.students.length}</TableCell>
                    <TableCell>₹{course.pricing}</TableCell>
                    <TableCell className=" flex items-center justify-center">
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(`/instructor/edit-course/${course?._id}`)
                        }
                      >
                        <FaRegEdit />
                      </Button>
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => handleDeleteCourse(course?._id)}
                      >
                        {" "}
                        <LuDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default InstructorViewCourses;
