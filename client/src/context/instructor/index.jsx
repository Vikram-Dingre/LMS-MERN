import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import React, { createContext, useState } from "react";

export const InstructorContext = createContext(null);

const InstructorContextProvider = ({ children }) => {
  const [instructorCoursesList, setInstructorCoursesList] = useState([]);
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData
  );
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );

  return (
    <InstructorContext.Provider
      value={{
        instructorCoursesList,
        setInstructorCoursesList,
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

export default InstructorContextProvider;
