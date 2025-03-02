import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/index";
import Navbar from "./Compo/Navbar";
import { AuthContext } from "./context/auth";
import ProtectedRoute from "./Compo/ProtectedRoute/index.jsx";
import Home from "./pages/student/Home";
import { ToastContainer } from "react-toastify";
import InstructorDashboardPage from "./pages/instructor";
import AddNewCourse from "./pages/instructor/add-new-course";
import StudentViewCommonLayout from "./Compo/student-view/common-layout";
import StudentMyCoursesPage from "./pages/student/my-courses";
import StudentCourseDetailsPage from "./pages/student/course-details";
import ExploreCourses from "./pages/student/courses/ExploreCourses";
import StudentExploreCoursesPage from "./pages/student/courses/ExploreCourses";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import CourseProgressPage from "./pages/student/CourseProgressPage";
import InstructorViewCommonLayout from "./Compo/instructor/CommonLayout";
function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <ProtectedRoute
              element={<AuthPage />}
              isAuthenticated={auth?.isAuthenticated}
              user={auth?.user}
            />
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* student routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={<StudentViewCommonLayout />}
              isAuthenticated={auth?.isAuthenticated}
              user={auth?.user}
            />
          }
        >
          <Route
            path="home"
            element={
              <ProtectedRoute
                element={<Home />}
                isAuthenticated={auth.isAuthenticated}
                user={auth.user}
              />
            }
          />
          <Route
            path=""
            element={
              <ProtectedRoute
                element={<Home />}
                isAuthenticated={auth.isAuthenticated}
                user={auth.user}
              />
            }
          />
          <Route
            path="my-courses"
            element={
              <ProtectedRoute
                element={<StudentMyCoursesPage />}
                isAuthenticated={auth.isAuthenticated}
                user={auth.user}
              />
            }
          />
          <Route
            path="course-progress/:id"
            element={
              <ProtectedRoute
                element={<CourseProgressPage />}
                isAuthenticated={auth?.isAuthenticated}
                user={auth?.user}
              />
            }
          />

          <Route
            path="course-details/:id"
            element={
              <ProtectedRoute
                element={<StudentCourseDetailsPage />}
                isAuthenticated={auth.isAuthenticated}
                user={auth.user}
              />
            }
          />
          <Route
            path="explore-courses"
            element={
              <ProtectedRoute
                element={<StudentExploreCoursesPage />}
                isAuthenticated={auth.isAuthenticated}
                user={auth.user}
              />
            }
          />

          <Route
            path="course-progress/:id"
            element={
              <ProtectedRoute
                element={<StudentMyCoursesPage />}
                isAuthenticated={auth.isAuthenticated}
                user={auth.user}
              />
            }
          />
        </Route>

        {/* instructor routes */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute
              element={<InstructorViewCommonLayout />}
              isAuthenticated={auth?.isAuthenticated}
              user={auth?.user}
            />
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute
                isAuthenticated={auth?.isAuthenticated}
                user={auth?.user}
                element={<InstructorDashboardPage />}
              />
            }
          />
          <Route
            path="add-new-course"
            element={
              <ProtectedRoute
                isAuthenticated={auth?.isAuthenticated}
                user={auth?.user}
                element={<AddNewCourse />}
              />
            }
          />

          <Route
            path="edit-course/:id"
            element={
              <ProtectedRoute
                isAuthenticated={auth?.isAuthenticated}
                user={auth?.user}
                element={<AddNewCourse />}
              />
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
