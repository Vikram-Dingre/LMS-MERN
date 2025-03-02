import React from "react";
import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ element, isAuthenticated, user }) {
  const location = useLocation();
  const path = location.pathname;
  //   const authenticated = localStorage.getItem("token")
  // console.log(authenticated,isAuthenticated,"trueorfalse")
  if (!isAuthenticated) {
    if (
      path.includes("home") ||
      path.includes("instructor") ||
      !path.includes("auth")
    ) {
      /*path.includes("home") || path.includes("instructor") || */
      // !path.includes("auth") this is important
      return <Navigate to={"/auth"} />;
    }
  }

  if (isAuthenticated) {
    if (user?.role === "user") {
      if (path.includes("instructor") || path.includes("auth")) {
        return <Navigate to="/home" />;
      }
    }
    if (user?.role === "admin") {
      if (path.includes("home") || path.includes("auth")) {
        return <Navigate to="/instructor" />;
      }
    }
  }

  return <div>{element}</div>;
}

export default ProtectedRoute;
