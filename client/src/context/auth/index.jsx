import { logiInitialFormData, signUpInitialFormData } from "@/config";
import {
  checkAuthService,
  loginService,
  signupService,
} from "@/services/authService";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [signupFormData, setSignupFormData] = useState(signUpInitialFormData);
  const [loginFormData, setLoginFormData] = useState(logiInitialFormData);
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const data = await loginService(loginFormData);
    if (data.success) {
      localStorage.setItem("token", data?.token);

      toast.success("logged in successfully", { position: "top-left" });
      data.user, "login";
      setTimeout(() => {
        setAuth({ isAuthenticated: true, user: data?.user });
        navigate("/");
      }, 2000);
    } else {
      setAuth({ isAuthenticated: false, user: null });
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    const data = await signupService(signupFormData);
    if (data.success) {
      toast.success("sign-up successfully", { position: "top-left" });
    }
  }

  async function checkAuth() {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   return setAuth({ isAuthenticated: false, user: null });
    // }

    const data = await checkAuthService();

    data, "authdata";

    if (data?.success) {
      setAuth({ isAuthenticated: true, user: data.user._doc });
    } else {
      setAuth({ isAuthenticated: false, user: null });
    }
  }

  function handleLogout() {
    toast.success("Logged out successfully...", { position: "top-left" });
    setTimeout(() => {
      localStorage.clear();
      setAuth({ isAuthenticated: false, user: null });
      window.location.reload();
    }, 2500);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signupFormData,
        loginFormData,
        setSignupFormData,
        setLoginFormData,
        handleLogin,
        handleSignUp,
        auth,
        setAuth,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
