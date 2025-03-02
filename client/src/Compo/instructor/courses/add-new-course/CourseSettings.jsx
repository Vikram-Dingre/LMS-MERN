import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InstructorContext } from "@/context/instructor";
import { uploadMediaService } from "@/services/mediaService";
import React, { useContext, useState } from "react";

const CourseSettings = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageUpload(event) {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setIsUploading(true);
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);
      const data = await uploadMediaService(imageFormData);
      if (data.success) {
        setCourseLandingFormData({
          ...courseLandingFormData,
          image: data.media.url,
        });
        setIsUploading(false);
      }
    }
  }

  async function handleReplaceCourseImage() {
    setCourseLandingFormData({ ...courseLandingFormData, image: "" });
  }

  courseLandingFormData;
  return (
    <div className="border rounded p-4 my-4">
      <h1 className="text-xl font-bold mb-2">Course Settings</h1>
      <div>
        <h1 className="my-2 font-semibold ">Course Image </h1>

        {/* this loader is for the course settings image uploadation. */}

        {isUploading ? (
          <div className="w-full bg-gray-300 rounded-full h-3 mt-2 relative overflow-hidden mb-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-1/3 h-full bg-blue-500 animate-slide"></div>
            </div>
          </div>
        ) : null}

        <style>
          {`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
          .animate-slide {
            animation: slide 1.5s infinite linear;
          }
        `}
        </style>

        {courseLandingFormData.image ? (
          <div className="flex items-center gap-6 text-white">
            {/* className="bg-red-800 hover:bg-red-900 cursor-pointer" */}
            <Button
              className="cursor-pointer"
              onClick={() => handleReplaceCourseImage()}
            >
              Replace Image
            </Button>
          </div>
        ) : null}

        {!courseLandingFormData.image ? (
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
        ) : null}
        {courseLandingFormData.image ? (
          <img
            className="aspect-2/1 my-4 border rounded-xl"
            src={courseLandingFormData?.image}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CourseSettings;
