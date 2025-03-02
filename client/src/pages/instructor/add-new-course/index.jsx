import CommonForm from "@/Compo/common-form";
import CourseCurriculum from "@/Compo/instructor/courses/add-new-course/CourseCurriculum";
import CourseLanding from "@/Compo/instructor/courses/add-new-course/CourseLanding";
import CourseSettings from "@/Compo/instructor/courses/add-new-course/CourseSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
  courseLandingPageFormControls,
} from "@/config";
import { AuthContext } from "@/context/auth";
import { InstructorContext } from "@/context/instructor";
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
  updateInstructorCourseService,
} from "@/services/courseServices";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddNewCourse = () => {
  const [activeTab, setActiveTab] = useState("course curriculum");
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    instructorCoursesList,
    setInstructorCoursesList,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const { id } = useParams();

  async function handleAddNewCourse() {
    let finalCourseData = {
      ...courseLandingFormData,
      curriculum: courseCurriculumFormData,
      instructorId: auth.user._id,
      instructorName: auth.user.userName,
      date: Date.now(),
      students: [],
    };
    const data = await addNewCourseService(finalCourseData);
    if (data.success) {
      toast.success(data.message, { position: "top-left" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert("error while adding new course...");
    }
  }

  async function hanldeUpdateCourse() {
    let finalFormData = {
      ...courseLandingFormData,
      curriculum: courseCurriculumFormData,
      date: Date.now(),
    };
    const data = await updateInstructorCourseService(id, finalFormData);
    if (data.success) {
      toast.success(data.message, { position: "top-left" });
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      setCourseLandingFormData(courseLandingInitialFormData);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert("error while updating course...");
    }
  }

  async function fetchCourseUpdatingDetails() {
    const data = await fetchInstructorCourseDetailsService(id);
    if (data.success) {
      setCourseCurriculumFormData([...data.courseDetails.curriculum]);
      let filtered = {};
      Object.keys(courseLandingInitialFormData).map((key) => {
        filtered[key] = data.courseDetails[key];
      });
      setCourseLandingFormData(filtered);
    }
  }

  function isFormDataValidForSubmitButton() {
    // const isLandingFormDataValid = courseLandingFormData.some(
    //   (item) => item === ""
    // );
    const isLandingFormDataValid = Object.keys(courseLandingFormData).every(
      (key) => courseLandingFormData[key] !== ""
    );
    const isCurriculumFormDataValid = courseCurriculumFormData.every((obj) =>
      Object.keys(obj).every((key) => obj[key] !== "")
    );
    return isLandingFormDataValid && isCurriculumFormDataValid ? false : true;
  }

  // useEffect(()=>{

  // },[courseCurriculumFormData, courseLandingFormData])

  useEffect(() => {
    if (id) {
      fetchCourseUpdatingDetails();
    }
  }, []);

  return (
    <div className="bg-gray-100 h-[100vh] w-[100vw]  p-4">
      <Card className="bg-white m-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-3xl font-bold">
              Create New Course
            </CardTitle>
            <CardTitle>
              <Button
                className="text-white"
                onClick={() =>
                  id ? hanldeUpdateCourse() : handleAddNewCourse()
                }
                disabled={isFormDataValidForSubmitButton()}
              >
                Submit
              </Button>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="course curriculum "
            >
              <TabsList className="flex items-center gap-4 border px-4 py-2 rounded-md w-[500px]">
                <TabsTrigger
                  value="course curriculum"
                  className={`${
                    activeTab === "course curriculum"
                      ? "border border-gray-300  bg-gray-200"
                      : ""
                  }  p-1 rounded-md`}
                >
                  Course Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="course landing page"
                  className={`${
                    activeTab === "course landing page"
                      ? "border border-gray-300  bg-gray-200"
                      : ""
                  } p-1 rounded-md`}
                >
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger
                  value="course settings"
                  className={`${
                    activeTab === "course settings"
                      ? "border border-gray-300 bg-gray-200 "
                      : ""
                  }  p-1 rounded-md`}
                >
                  Course Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="course curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course landing page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="course settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AddNewCourse;
