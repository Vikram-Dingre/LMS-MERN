import CommonForm from "../../Compo/common-form/index.jsx";
import { Card } from "@/components/ui/card";
import { LoginFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "../../context/auth/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

const AuthPage = () => {
  const {
    signupFormData,
    loginFormData,
    setSignupFormData,
    setLoginFormData,
    handleLogin,
    handleSignUp,
  } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="h-[90vh] w-100% flex items-center justify-center ">
      <Tabs
        className=" min-w-[300px] px-4 py-2"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="border border-gray-400 flex items-center justify-evenly  gap-4 rounded-t-sm p-2">
          <TabsTrigger
            value="login"
            className={`cursor-pointer ${
              activeTab === "login" ? "border-1 bg-gray-100" : ""
            } px-3 py-1 rounded `}
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className={`cursor-pointer ${
              activeTab === "signup" ? "border-1 bg-gray-100" : ""
            } px-3 py-1 rounded`}
          >
            signUp
          </TabsTrigger>
        </TabsList>
        <Card className="p-4 rounded-b-md rounded-t-none">
          <TabsContent value="login">
            <CommonForm
              formData={loginFormData}
              setFormData={setLoginFormData}
              buttonText={"login"}
              handleSubmit={handleLogin}
              formControls={LoginFormControls}
            />
          </TabsContent>
          <TabsContent value="signup">
            <CommonForm
              formData={signupFormData}
              setFormData={setSignupFormData}
              buttonText={"signUp"}
              handleSubmit={handleSignUp}
              formControls={signUpFormControls}
            />
          </TabsContent>
        </Card>
      </Tabs>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
