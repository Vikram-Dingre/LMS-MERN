import React, { createContext, useState } from "react";

export const StudentContext = createContext(null);

const StudentContextProvider = ({ children }) => {
  const [studentCoursesList, setStudentCoursesList] = useState([]);
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useState(null);
  const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
  const [currentCourseProgress, setCurrentCourseProgress] = useState({});

  return (
    <StudentContext.Provider
      value={{
        studentCoursesList,
        setStudentCoursesList,
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId,
        currentCourseProgress,
        setCurrentCourseProgress,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
