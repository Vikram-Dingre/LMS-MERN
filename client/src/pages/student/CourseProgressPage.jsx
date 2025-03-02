import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth";
import { StudentContext } from "@/context/student";
import {
  fetchStudentCourseDetailsService,
  fetchStudentPurchasedCourseDetails,
  markdCurrentLectureAsViewed,
  resetCurrentCourseProgress,
} from "@/services/courseServices";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { LiaGooglePlay } from "react-icons/lia";
import { PiPlay } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";

const CourseProgressPage = () => {
  const { auth } = useContext(AuthContext);
  const { currentCourseProgress, setCurrentCourseProgress } =
    useContext(StudentContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentCourseProgressId, setCurrentCourseProgressId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [activeTab, setActiveTab] = useState("content");

  // const location = useLocation()

  async function fetchCurrentProgressCourseDetails() {
    const data = await fetchStudentPurchasedCourseDetails(
      auth?.user?._id,
      currentCourseProgressId
    );
    data, "progress data";
    if (data.success) {
      if (!data.isPurchased) {
        setIsPurchased(true);
        alert("you need to purchase this course first");
      } else {
        setCurrentCourseProgress({
          courseDetails: data.courseDetails,
          progress: data.progress,
        });
        if (data?.completed) {
          setIsCompleted(data.completed);
          return;
        }
        if (data?.progress?.length === 0) {
          setCurrentLecture(data?.courseDetails?.curriculum[0]);
        } else {
          const lastIndexOfViewedLecture = data?.progress?.findLastIndex(
            (lecture) => lecture.viewed
          );
          // const lastIndexOfViewedLecture = data?.progress?.reduceRight(
          //   (acc, obj, index) => {
          //     return acc === -1 && obj.viewed ? index : acc;
          //   },
          //   -1
          // );
          lastIndexOfViewedLecture, "lastIndexOfViewedLecture";
          setCurrentLecture(
            data.courseDetails.curriculum[lastIndexOfViewedLecture + 1]
          );
        }
      }
    }
  }
  async function handleCurrenVideoEnd() {
    currentLecture?._id, "currentlectue id";
    const data = await markdCurrentLectureAsViewed(
      auth?.user?._id,
      currentCourseProgressId,
      currentLecture?._id
    );
    if (data.success) {
      fetchCurrentProgressCourseDetails();
    }
  }
  async function handleRewatchCourse() {
    const data = await resetCurrentCourseProgress(
      auth.user._id,
      currentCourseProgress.courseDetails._id
    );
    if (data.success) {
      fetchCurrentProgressCourseDetails();
      // window.location.reload()
      setIsCompleted(false);
    }
  }

  useEffect(() => {
    if (currentCourseProgressId) {
      fetchCurrentProgressCourseDetails();
    }
  }, [currentCourseProgressId]);

  useEffect(() => {
    if (id) {
      setCurrentCourseProgressId(id);
    }
  }, [id]);

  currentLecture, "lecturedata";

  // if (isCompleted) {
  //   alert("course is completed!");
  // }
  return (
    <div className="h-full w-full">
      <div>
        <div className="flex items-center gap-10 mb-0 bg-black p-4 text-white">
          <Button
            variant="outline"
            className="cursor-pointer mx-4"
            onClick={() => navigate("/my-courses")}
          >
            <FaArrowLeftLong /> Go Back To My Courses Page
          </Button>
          <h1 className="text-xl font-bold">
            {currentCourseProgress.courseDetails?.title}
          </h1>
        </div>
        <div className="flex h-screen bg-neutral-900  text-white">
          <div className="w-[67%]  h-full bg-neutral-900 p-4 text-white rounded-2xl">
            <video
              className="aspect-2/1 my-4 rounded-2xl h-[70vh] shadow shadow-neutral-500"
              onEnded={() => handleCurrenVideoEnd()}
              controls
              width="100%"
            >
              {currentLecture && (
                <source
                  className=" rounded-xl"
                  src={currentLecture?.video_url}
                  type="video/mp4"
                />
              )}
            </video>

            <div className="text-4xl font-bold capitalize">
              {currentLecture?.title}
            </div>
          </div>
          <div className="border-l bg-neutral-900 py-8 p-4 border-neutral-800 shadow shadow-neutral-400 w-[33%] h-full">
            {/* {currentCourseProgress?.courseDetails?.curriculum?.map(
              (lecture, index) => (
                <div key={index}>
                  {lecture?._id ===
                  currentCourseProgress?.progress?.[index]?.lectureId
                    ? "✅"
                    : null}
                  {lecture?.title}
                </div>
              )
            )} */}
            <Tabs
              defaultValue="content"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList>
                <div className="flex bg-neutral-800  items-center justify-evenly w-[100%] mb-4">
                  <TabsTrigger
                    value="content"
                    className={`cursor-pointer transition-bg duration-700 p-2 rounded-sm px-16 ${
                      activeTab === "content" ? "bg-neutral-700" : ""
                    }`}
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="overview"
                    className={`cursor-pointer transition-bg duration-700 p-2 rounded-sm px-16 ${
                      activeTab === "overview" ? "bg-neutral-700" : ""
                    }`}
                  >
                    Overview
                  </TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="content">
                <div className="flex flex-col gap-4">
                  {currentCourseProgress?.courseDetails?.curriculum?.map(
                    (lecture, index) => (
                      <div key={index} className="hover:bg-neutral-800">
                        {lecture?._id ===
                        currentCourseProgress?.progress?.[index]?.lectureId ? (
                          <TiTick className="text-green-600 inline-block text-2xl" />
                        ) : (
                          <IoPlayOutline className="inline-block text-lg ml-1" />
                        )}{" "}
                        {lecture?.title}
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="overview">
                <div className="text-xl font-semibold capitalize text-wrap">
                  {currentCourseProgress?.courseDetails?.description}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {isCompleted && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.4) " }}
          className="h-full w-full flex items-center justify-center absolute top-0 -left-[3%]"
        >
          <div className="text-black p-4 bg-gray-300 rounded-2xl text-center">
            <h1 className="m-4 font-bold text-3xl ">
              🎉🎊Congratulations!🎉🎊
            </h1>
            <h2 className="text-[22px] font-semibold my-4">
              You have Completed this Course.
            </h2>
            <div className="flex gap-4 items-center justify-center">
              <Button
                onClick={() => handleRewatchCourse()}
                className="text-white cursor-pointer"
              >
                Wan't to Watch Again!
              </Button>
              <Button
                onClick={() => navigate("/my-courses")}
                className="text-white cursor-pointer"
              >
                No Don't Wan't!
              </Button>
            </div>
          </div>
        </div>
      )}
      {isPurchased && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.6) " }}
          className="h-full w-full flex items-center justify-center absolute top-0 "
        >
          <div className="text-black p-4 bg-white rounded-2xl text-center">
            {/* <h1 className="m-4 font-bold text-3xl ">🎉🎊Congratulations!🎉🎊</h1>
            <h2 className="text-[22px] font-semibold my-4">You have Completed this Course.</h2> */}
            <div className="flex gap-4 items-center justify-center">
              <Button
                onClick={() => handleRewatchCourse()}
                className="text-white cursor-pointer"
              >
                Wan't to Watch Again!
              </Button>
              <Button
                onClick={() => navigate("/my-courses")}
                className="text-white cursor-pointer"
              >
                No Don't Wan't!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseProgressPage;
