import React, { useContext, useEffect, useState } from "react";
import AuthPage from "../auth";
import InstructorViewCourses from "@/Compo/instructor/courses";
import Dashboard from "@/Compo/instructor/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { InstructorContext } from "@/context/instructor";
import { fetchInstructorCoursesService } from "@/services/courseServices";
import { AuthContext } from "@/context/auth";
import { toast } from "react-toastify";

const InstructorDashboardPage = () => {
  const { intsturctorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);
  const { auth, setAuth, handleLogout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarControls = [
    {
      value: "Dashboard",
      label: "Dashboard",
      icon: "d",
      component: <Dashboard />,
    },
    {
      value: "Courses",
      label: "Courses",
      icon: "c",
      component: <InstructorViewCourses />,
    },
    {
      value: "LogOut",
      label: "LogOut",
      icon: "L",
      component: null,
    },
  ];

  async function fetchInstructorCourses() {
    const data = await fetchInstructorCoursesService();
    if (data.success) {
      setInstructorCoursesList(data.courseList);
    }
  }

  useEffect(() => {
    fetchInstructorCourses();
  }, []);

  return (
    <div className=" flex gap-3 min-h-screen w-screen bg-gray-200">
      <aside className="p-2 border-r-1 w-64 items-center bg-white md:block hidden">
        <nav>
          {sidebarControls.map((menuItem) => {
            return (
              <Button
                key={menuItem.label}
                className="w-full bg-gray-100 py-3 border-1 my-1 hover:bg-gray-300"
                onClick={() => {
                  menuItem.component !== null
                    ? setActiveTab(menuItem.value)
                    : handleLogout();
                }}
              >
                {menuItem.label}
              </Button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="pb-8 text-3xl font-bold">
          {activeTab === "Dashboard" ? "Dashboard" : "Courses"}
        </h1>
        <div>
          <Tabs value={activeTab}>
            {sidebarControls.map((item) => (
              <TabsContent value={item.value} key={item.label}>
                {item.component !== null ? item.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;
