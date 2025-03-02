import React, { useContext, useEffect } from "react";
import banner from "/banner-img.jpg";
import { courseCategories } from "@/config";
import {
  fetchStudentCoursesListService,
  isCourseAlreadyPurchasedService,
} from "@/services/courseServices";
import { StudentContext } from "@/context/student";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth";

const Home = () => {
  const { studentCoursesList, setStudentCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchStudentCoursesList() {
    const data = await fetchStudentCoursesListService();
    if (data.success) {
      setStudentCoursesList(data.coursesList);
    }
  }
  async function isCoursePurchased(userId, courseId) {
    const data = await isCourseAlreadyPurchasedService(userId, courseId);
    data, "progress click";
    if (data?.success) {
      if (data?.isPurchased) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    fetchStudentCoursesList();
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-evenly p-2 m-8">
        <div className="w-[50%]">
          <h1 className="text-3xl text-wrap capitalize font-bold my-2">
            Learning that gets you
          </h1>
          <p className="text-md capitalize text-wrap ">
            skill for your present and your future. Get started with us
          </p>
        </div>
        <img src={banner} className="aspect-2/1 w-[60%]" />
      </div>
      <section className="p-8 bg-gray-200 w-full">
        <h1 className="text-2xl font-bold">Course Categories </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {courseCategories.map((category) => (
            <div
              key={category.id}
              className="m-4 bg-white rounded-lg p-2 flex items-center font-semibold cursor-pointer"
              onClick={() => {
                const filters = { category: [category.id] };
                localStorage.setItem("filters", JSON.stringify(filters));
                navigate("/explore-courses");
              }}
            >
              {category.label}
            </div>
          ))}
        </div>
      </section>
      <section className="m-6 px-4 ">
        <h1 className="text-2xl font-bold mb-6">Featured Courses </h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {studentCoursesList && studentCoursesList.length > 0 ? (
            studentCoursesList.map((course) => (
              <div
                onClick={async () => {
                  (await isCoursePurchased(auth?.user?._id, course?._id))
                    ? navigate(`/course-progress/${course?._id}`)
                    : navigate(`/course-details/${course?._id}`);
                }}
                className="border border-gray-300 p-2 pb-6 shadow-md rounded-lg cursor-pointer"
              >
                <img
                  src={course.image}
                  alt="course image "
                  className="aspect-2/1 w-full cursor-pointer"
                />
                <h1 className="text-xl font-bold capitalize py-2">
                  {course.title}
                </h1>
                <h1 className="text-[16px] text-gray-500 font-semibold capitalize pb-2">
                  {course.instructorName}
                </h1>
                <h1 className="font-semibold pb-4  text-md">
                  ${course.pricing}
                </h1>
              </div>
            ))
          ) : (
            <h1 className="text-xl font-bold">No Course Found</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
