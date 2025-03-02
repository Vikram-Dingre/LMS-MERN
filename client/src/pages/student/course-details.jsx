import { Card } from "@/components/ui/card";
import { StudentContext } from "@/context/student";
import { fetchStudentCourseDetailsService } from "@/services/courseServices";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdUpdate } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoLockClosedSharp } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import getKeyService from "@/services/getKeyService";
import { AuthContext } from "@/context/auth";
import createOrderService from "@/services/orderServices/createOrderService";
import { toast, ToastContainer } from "react-toastify";

const StudentCourseDetailsPage = () => {
  const {
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    studentCoursesList,
    setStudentCoursesList,
  } = useContext(StudentContext);

  const { auth, setAuth } = useContext(AuthContext);
  const { id } = useParams();
  const [popUpLectureData, setPopUpLectureData] = useState(null);
  const [isShowPopUpLecture, setIsShowPopUpLecture] = useState(false);
  const [isAlreadyPurchased, setIsAlreadyPurchased] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  async function fetchCourseDetails() {
    const data = await fetchStudentCourseDetailsService(currentCourseDetailsId);
    if (data.success) {
      setStudentViewCourseDetails(data.courseDetails);
    }
  }

  function handleShowLecture(lecture) {
    setIsShowPopUpLecture(true);
    setPopUpLectureData(lecture);
  }

  async function handlePayment(amount) {
    auth, "auh";
    const { key } = await getKeyService();
    const orderDetails = {
      userId: auth.user._id,
      userName: auth.user.userName,
      userEmail: auth.user.userEmail,
      courseId: studentViewCourseDetails?._id,
      courseTitle: studentViewCourseDetails?.title,
      courseImage: studentViewCourseDetails?.image,
      coursePricing: studentViewCourseDetails?.pricing,
      paymentId: "",
      paymentSignature: "",
      orderDate: Date.now(),
      orderStatus: "initiated",
      instructorId: studentViewCourseDetails?.instructorId,
      instructorName: studentViewCourseDetails?.instructorName,
      amount,
    };
    const data = await createOrderService(orderDetails);
    data, "data";

    if (data?.success) {
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: data.order.currency,
        name: "Vikram Dingre",
        description: "Vikram's first test transaction.",
        image: "https://example.com/your_logo",
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:3000/order/verify",
        prefill: {
          name: "Vikram Dingre",
          email: "vikram@gmail.com",
          contact: "1234567890",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = await new window.Razorpay(options);
      razor.open();
    } else if (data?.alreadyPurchased) {
      setIsAlreadyPurchased(data?.alreadyPurchased);
      toast.success(data.message, { position: "top-left" });
    }
  }

  // (studentViewCourseDetails, "course details");

  useEffect(() => {
    if (currentCourseDetailsId) {
      fetchCourseDetails();
    }
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);
  studentViewCourseDetails?.curriculum?.find((lecture) => lecture.freePreview)
    ?.video_url,
    "lecture";
  return (
    <div className="bg-gray-100 pb-8 relative">
      <Card className="bg-black text-white my-6 p-4 px-10 ">
        <h1 className="text-4xl capitalize font-semibold">
          {studentViewCourseDetails?.title}
        </h1>
        <h3 className="text-xl capitalize font-normal my-3">
          {studentViewCourseDetails?.subtitle}
        </h3>
        <div className="flex gap-5 items-center my-5">
          <p className="">
            <span className="text-gray-300 text-sm capitalize">
              Created By -{" "}
            </span>
            <span className="text-gray-200 capitalize font-bold text-md">
              {studentViewCourseDetails?.instructorName}
            </span>
          </p>
          <p className="text-sm text-gray-300">
            <MdUpdate className="inline-block " size={20} />{" "}
            {studentViewCourseDetails?.date?.split("T")[0]}
          </p>
          <p className="capitalize text-gray-300">
            <GrLanguage className="inline-block mx-2" />
            {studentViewCourseDetails?.primaryLanguage}
          </p>
          <p className="capitalize text-gray-300">
            {studentViewCourseDetails?.students?.length} Students
          </p>
        </div>
      </Card>
      <div className="flex gap-4">
        <div className="w-[60%] ml-3 mr-1">
          {/* course objectives */}
          <Card className="bg-white">
            <h1 className="text-2xl -mb-4 capitalize font-bold mt-5 mx-4 ">
              Course Objectives{" "}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 m-[3%]">
              {studentViewCourseDetails?.objectives?.split(",")?.map(
                (objective) =>
                  objective && (
                    <div className="flex items-center gap-2 font-semibold  my-2">
                      {" "}
                      <IoMdCheckmarkCircleOutline
                        className="inline-block  text-green-800"
                        size={20}
                      />
                      <span className="text-md capitalize">{objective}</span>
                    </div>
                  )
              )}
            </div>
          </Card>
          {/* course curriculum */}
          <Card className="my-4 bg-white">
            <h1 className="text-2xl -mb- capitalize font-bold mt-5  mx-4 ">
              Course Curriculum{" "}
            </h1>
            <div className="m-[3%]">
              {studentViewCourseDetails?.curriculum?.map((lecture, index) => (
                // <IoLockClosedSharp className="inline-block"/> <FaRegPlayCircle className="inline-block"/>
                /*lecture.title  &&*/
                <div
                  onClick={() => {
                    if (lecture.freePreview) {
                      handleShowLecture(lecture);
                    }
                  }}
                  className={`p-4 hover:bg-gray-100 flex gap-2 items-center border-t border-gray-300 ${
                    lecture.freePreview
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  {lecture.freePreview ? (
                    <FaRegPlayCircle className="inline-block" />
                  ) : (
                    <IoLockClosedSharp className="inline-block" />
                  )}{" "}
                  <span className="font-semibold">{lecture?.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* course preview lecture display */}

        {studentViewCourseDetails?.curriculum?.some(
          (lecture) => lecture?.freePreview
        ) ? (
          <Card className="h-full w-[35%] ml-2 mr-5 p-4 bg-white">
            <div className="bg-black x-4  rounded-2xl">
              <video
                className="aspect-2/1 my-4 rounded-2xl "
                controls
                width="100%"
              >
                <source
                  className=" rounded-xl"
                  src={
                    studentViewCourseDetails?.curriculum?.find(
                      (lecture) => lecture?.freePreview
                    )?.video_url
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 className="text-lg  font-bold my-6">
              ${studentViewCourseDetails?.pricing}
            </h1>
            <Button
              disabled={isAlreadyPurchased}
              className="text-white w-full"
              onClick={() => handlePayment(studentViewCourseDetails?.pricing)}
            >
              Buy Now
            </Button>
          </Card>
        ) : (
          <Card className="h-full w-[35%] ml-2 mr-5 p-4 py-8 bg-white">
            <h1 className="text-xl font-semibold mt-3 hover:underline">
              FrePreview Lecture is UnAvailable.
            </h1>
            <h1 className="text-lg  font-bold my-6">
              ${studentViewCourseDetails?.pricing}
            </h1>
            <Button
              onClick={() => handlePayment(studentViewCourseDetails?.pricing)}
              className="text-white w-full"
            >
              Buy Now
            </Button>
          </Card>
        )}
      </div>

      {/* popup lectures */}
      {isShowPopUpLecture && (
        <div
          style={{ background: "rgba(0,0,0,0.7)" }}
          className="h-[111%]  w-full absolute -top-[11%] flex items-end justify-center"
        >
          <Card className="p-6 bg-white w-[40%] m-8">
            <h1 className="text-xl font-bold capitalize">Course Overview </h1>
            <h1 className="font-semibold text-lg my-4">
              {popUpLectureData?.title || "title"}
            </h1>
            {popUpLectureData?.video_url ? (
              <div className="bg-black px-4 rounded-2xl   flex items-center justify-center mx-4">
                <video
                  className="aspect-2/1 my-4 rounded-2xl "
                  controls
                  width="100%"
                >
                  <source
                    className=" rounded-xl"
                    src={popUpLectureData?.video_url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <Card className="h-full ml-2 mr-5 p-4 py-8 bg-white">
                <h1 className="text-xl text-center font-semibold mt-3 hover:underline">
                  Lecture is Not Uploaded Yet.
                </h1>
              </Card>
            )}
            <div className="my-4">
              <h1 className="text-lg my-4 font-bold">Suggested Lectures</h1>
              {studentViewCourseDetails?.curriculum?.map(
                (lecture) =>
                  lecture.freePreview &&
                  lecture?._id !== popUpLectureData._id && (
                    <div
                      disabled={isAlreadyPurchased}
                      onClick={() => handleShowLecture(lecture)}
                      className={` cursor-pointer hover:bg-gray-100 p-2 border-t border-gray-300 ${
                        isAlreadyPurchased && "cursor-not-allowed"
                      } `}
                    >
                      {lecture.title}
                    </div>
                  )
              )}
            </div>
            <Button
              className="text-white cursor-pointer"
              onClick={() => setIsShowPopUpLecture(false)}
            >
              Close
            </Button>
          </Card>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default StudentCourseDetailsPage;
