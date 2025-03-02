import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import banner from "/banner-img.jpg";
import {
  courseCategories,
  courseLevelOptions,
  filterOptions,
  languageOptions,
  sortOptions,
} from "@/config";
import { StudentContext } from "@/context/student";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiSortAlt2 } from "react-icons/bi";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  fetchStudentCoursesListService,
  isCourseAlreadyPurchasedService,
} from "@/services/courseServices";
import { AuthContext } from "@/context/auth";

const StudentExploreCoursesPage = () => {
  const { studentCoursesList, setStudentCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [sortLabel, setSortLabel] = useState([sortOptions[0]]);
  const [params, setParams] = useSearchParams();

  function handleCheckBoxValueChange(filterSection, filterOption) {
    let cpyFilters = { ...filters };
    const filterSectionIndex = Object.keys(cpyFilters).indexOf(filterSection);

    if (filterSectionIndex === -1) {
      setFilters((prev) => {
        let cpyFilters = { ...prev };
        cpyFilters = { ...cpyFilters, [filterSection]: [filterOption.id] };
        return cpyFilters;
      });
    } else {
      const itemIndex = cpyFilters[filterSection].indexOf(filterOption.id);
      //muttable way
      // if (itemIndex === -1) {
      //   cpyFilters[filterSection].push(filterOption.id);
      // } else {
      //   cpyFilters[filterSection].splice(itemIndex, 1y);
      // }

      //immutable way
      if (itemIndex === -1) {
        cpyFilters[filterSection] = [
          ...cpyFilters[filterSection],
          filterOption.id,
        ];
      } else {
        cpyFilters[filterSection] = [
          ...cpyFilters[filterSection].filter(
            (_, index) => index !== itemIndex
          ),
        ];
      }
      localStorage.setItem("filters", JSON.stringify(cpyFilters));
      setFilters(cpyFilters);
    }
  }

  async function fetchAllStudentViewCourses() {
    const query = new URLSearchParams({ ...filters, sortBy: sort }).toString();
    query, "frontend query";
    const data = await fetchStudentCoursesListService(query);
    if (data.success) {
      data, "data";
      setStudentCoursesList(data?.coursesList);
    }
  }
  filters, "filters";

  function handleSortValueChange(value) {
    setSort(value);
    const sortLabelFiltered = sortOptions.filter(
      (option) => option.id === value
    );
    sortLabelFiltered, "label";
    setSortLabel(sortLabelFiltered);
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
    setParams(new URLSearchParams({ ...filters, sort }));
    localStorage.setItem("searchParams", JSON.stringify(filters));
  }, [filters, sort]);

  useEffect(() => {
    if (filters && sort) {
      fetchAllStudentViewCourses();
    }
  }, [filters, sort]);

  useEffect(() => {
    setFilters(JSON.parse(localStorage.getItem("filters")));
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("searchParams");
      localStorage.removeItem("filters");
    };
  }, []);

  studentCoursesList, "courseslist";

  return (
    <div className="flex gap-2 w-screen h-full bg-gray-100">
      <aside className="w-[25%] border-r p-4 px-5">
        {/* <h1>Filter</h1> */}
        {/* <div className="my-4">
          <h1 className="text-xl font-semibold capitalize mt-4 mb-2">
            Category
          </h1>
          <div className="mx-6">
            {Object.keys(courseCategories).map((key, index) => (
              <div className="flex gap-2 items-center my-1 ">
                <Checkbox className="cursor-pointer" id={`checkbox-${index}`} />
                <label className="cursor-pointer" htmlFor={`checkbox-${index}`}>
                  {courseCategories[key].label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold capitalize mt-4 mb-2">Level</h1>
          <div className="mx-6">
            {Object.keys(courseLevelOptions).map((key, index) => (
              <div className="flex gap-2 items-center my-1">
                <Checkbox className="cursor-pointer" id={`checkbox-${index}`} />
                <label className="cursor-pointer" htmlFor={`checkbox-${index}`}>
                  {courseCategories[key].label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold mt-4 mb-2 capitalize">
            Language
          </h1>
          <div className="mx-6">
            {Object.keys(languageOptions).map((key, index) => (
              <div className="flex gap-2 items-center my-1">
                <Checkbox className="cursor-pointer" id={`checkbox-${index}`} />
                <label className="cursor-pointer" htmlFor={`checkbox-${index}`}>
                  {courseCategories[key].label}
                </label>
              </div>
            ))}
          </div>
        </div> */}

        {Object.keys(filterOptions).map((key) => {
          return (
            <>
              <div
                key={key}
                className="text-xl font-semibold capitalize mt-4 mb-2"
              >
                {key}
              </div>
              <div>
                {filterOptions[key].map((menuItem, idx) => {
                  return (
                    <div className="flex gap-2 items-center my-1 mx-5">
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[key] &&
                          filters[key].indexOf(menuItem.id) !== -1
                        }
                        onCheckedChange={() =>
                          handleCheckBoxValueChange(key, menuItem)
                        }
                        className="cursor-pointer"
                        id={`checkbox-${idx}`}
                      />
                      <label>{menuItem.label}</label>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </aside>
      <main className="w-[70%]">
        <div>
          <h1 className="text-2xl font-bold m-4">All Courses</h1>
          <DropdownMenu>
            <div className="flex justify-end items-center gap-2">
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex border border-gray-300 shadow-md"
                  variant="outline"
                >
                  <BiSortAlt2 />
                  <span>{sortLabel[0].label}</span>
                </Button>
              </DropdownMenuTrigger>
              <div className="text-[17px] font-bold">
                {studentCoursesList?.length} Courses
              </div>
            </div>
            <DropdownMenuContent className="bg-white p-4 border border-gray-300 rounded-lg m-2 px-9">
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(value) => handleSortValueChange(value)}
              >
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          {studentCoursesList?.length > 0 ? (
            studentCoursesList?.map((course) => (
              <Card
                onClick={async () => {
                  (await isCoursePurchased(auth?.user?._id, course?._id))
                    ? navigate(`/course-progress/${course?._id}`)
                    : navigate(`/course-details/${course?._id}`);
                }}
                key={course.title}
                className="m-4 cursor-pointer w-full flex gap-4 p-2 bg-white"
              >
                <img
                  src={course.image || banner}
                  alt=""
                  className="w-[40%] aspect-2/1 object-cover cursor-pointer"
                />
                <div className="pt-">
                  <h1 className="text-2xl font-semibold capitalize py-1">
                    {course.title}
                  </h1>
                  <div className="py-1">
                    <span className="text-gray-500">Created By </span>
                    <h1 className="capitalize text-md font-semibold inline-block">
                      {" "}
                      {course.instructorName}
                    </h1>
                  </div>
                  <div className="mb-3 mt-1 text-gray-700">
                    {course.curriculum.length}{" "}
                    {course.curriculum.length > 1 ? "Lectures" : "Lecture"} -{" "}
                    <span className="uppercase">
                      {course.level || "Beginner"}
                    </span>{" "}
                    Level
                  </div>
                  <h1 className="font-bold text-md">${course.pricing}</h1>
                </div>
              </Card>
            ))
          ) : (
            <h1 className="text-xl font-bold m-8 hover:underline">
              No Course Found.
            </h1>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentExploreCoursesPage;
