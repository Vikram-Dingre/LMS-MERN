import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InstructorContext } from "@/context/instructor";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
const Dashboard = () => {
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [studentsList, setStudentsList] = useState([]);
  const [inputValue, setInputVlue] = useState("");
  // useEffect(() => {
  //   if (instructorCoursesList?.length > 0) {
  //     const total = instructorCoursesList?.reduce((acc, course, index) => {
  //       return acc + course.students.length;
  //     }, 0);
  //     setTotalStudents(total);
  //   }
  // }, [instructorCoursesList]);

  // useEffect(() => {
  //   if (instructorCoursesList?.length > 0) {
  //     const total = instructorCoursesList?.reduce((acc, course, index) => {
  //       return acc + course.pricing;
  //     }, 0);
  //     setTotalRevenue(total);
  //   }
  // }, [instructorCoursesList]);

  function handleSearchChange(e) {
    setInputVlue(e.target.value);
  }

  function calculateTotalStudentCountAndRevenue() {
    const { totalStudentsCountResult, totalRevenueResult } =
      instructorCoursesList?.reduce(
        (acc, course, index) => {
          return {
            totalStudentsCountResult:
              acc.totalStudentsCountResult + course.students.length,
            totalRevenueResult:
              acc.totalRevenueResult + course.pricing * course.students.length,
          };
        },
        { totalStudentsCountResult: 0, totalRevenueResult: 0 }
      );
    setTotalStudents(totalStudentsCountResult);
    setTotalRevenue(totalRevenueResult);
  }

  function getStudentsList() {
    // instructorCoursesList?.map((course) =>
    //   course.students.map((student) =>
    //     studentsList.push({
    //       title: course.title,
    //       studentName: student.studentName,
    //       studentEmail: student.studentEmail,
    //       paidAmount: student.paidAmount,
    //     })
    //   )
    // );

    const result = instructorCoursesList?.reduce(
      (acc, course, index) => {
        course.students.forEach((student) => {
          acc?.studentListResult?.push({
            title: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
            paidAmount: student.paidAmount,
          });
        });
        return acc;
      },
      { studentListResult: [] }
    );
    result?.studentListResult, "sdkjf";
    setStudentsList(result?.studentListResult);
  }

  function highlightText(text) {
    if (inputValue === "") return <span>{text}</span>;
    const index = text.toLowerCase().indexOf(inputValue.toLowerCase());
    index, "index";
    if (index === -1) return text;
    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + inputValue.length);
    const afterMatch = text.slice(index + inputValue.length);

    return (
      <>
        {beforeMatch}
        <span className="border-2 border-yellow-500 text-blue-500  shadow-2xl">
          {match}
        </span>
        {afterMatch}
      </>
    );

    // return text.split("").map((part,index)=>{
    //   if(inputValue.charAt(index).toLowerCase().includes(part.toLowerCase())){
    //     return <span className="bg-amber-500">{part}</span>
    //   }else{
    //     return <span>{part}</span>
    //   }
    // })
  }

  useEffect(() => {
    if (inputValue !== "") {
      const filteredList = studentsList.filter((student) =>
        Object.keys(student).some((key) =>
          student[key].toLowerCase().includes(inputValue.toLowerCase())
        )
      );

      filteredList, "Filtered Students";
      setStudentsList(filteredList);
    } else {
      getStudentsList();
    }
  }, [inputValue, instructorCoursesList]); // Added instructorCoursesList as a dependency

  useEffect(() => {
    calculateTotalStudentCountAndRevenue();
    getStudentsList();
  }, [instructorCoursesList]);
  useEffect(() => {
    getStudentsList();
  }, []);

  studentsList;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 bg-white">
          <h1 className="text-md font-bold ">Total Students</h1>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </Card>
        <Card className="p-5 bg-white">
          <h1 className="text-md font-bold ">Total Revenue</h1>
          <p className="text-2xl font-bold">₹{totalRevenue}</p>
        </Card>
      </div>
      <Card className="bg-white p-4 h-full w-full my-4">
        <div className="flex justify-between items-center ">
          <CardHeader>Student List</CardHeader>
          <Input
            autoFocus
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
            className="w-[35%]"
            placeholder="Search For a Student or Course...."
          />
        </div>
        <CardContent>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsList?.map((student, index) => (
                <TableRow key={index} className="text-[14px] hover:bg-gray-100">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{highlightText(student.title)}</TableCell>
                  <TableCell>{highlightText(student.studentName)}</TableCell>
                  <TableCell>{highlightText(student.studentEmail)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
