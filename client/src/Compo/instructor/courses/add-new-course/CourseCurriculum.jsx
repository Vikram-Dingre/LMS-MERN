import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor";
import {
  deleteMediaService,
  uploadMediaService,
} from "@/services/mediaService";
import React, { useContext, useState } from "react";

const CourseCurriculum = () => {
  const { courseCurriculumFormData, setCourseCurriculumFormData } =
    useContext(InstructorContext);

  const [showFreePreview, setShowFreePreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function hnadleAddNewLecture() {
    let cpyCurriculumFormData = [...courseCurriculumFormData];
    cpyCurriculumFormData = [
      ...cpyCurriculumFormData,
      { ...courseCurriculumInitialFormData[0] },
    ];
    cpyCurriculumFormData;
    setCourseCurriculumFormData(cpyCurriculumFormData);
  }
  function handleTitleValueChange(e, index) {
    let cpyCurriculumFormData = [...courseCurriculumFormData];
    cpyCurriculumFormData[index] = {
      ...cpyCurriculumFormData[index],
      title: e.target.value,
    };
    setCourseCurriculumFormData(cpyCurriculumFormData);
  }

  function handleFreePreviewValueChange(isChecked, index) {
    let cpyCurriculumFormData = [...courseCurriculumFormData];
    cpyCurriculumFormData[index] = {
      ...cpyCurriculumFormData[index],
      freePreview: isChecked,
    };
    setCourseCurriculumFormData(cpyCurriculumFormData);
  }

  async function handleUploadSingleLecture(event, index) {
    const selectedFile = event?.target?.files[0];
    if (selectedFile) {
      setIsUploading(true);
      const imageFormData = new FormData();
      imageFormData?.append("file", selectedFile);

      try {
        const data = await uploadMediaService(imageFormData);
        if (data.success) {
          setCourseCurriculumFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData[index] = {
              ...updatedFormData[index],
              public_id: data.media.public_id,
              video_url: data.media.url,
            };
            return updatedFormData;
          });
          setIsUploading(false);
        } else {
          alert("cannot upload lecture.");
          setIsUploading(false);
        }
      } catch (error) {}
    }
  }

  function handleDeleteLecture(index) {
    setCourseCurriculumFormData((prev) =>
      prev.filter((_, idx) => idx !== index)
    );
  }

  async function handleReplaceLectureVideo(id, index) {
    try {
      const data = await deleteMediaService(id, index);
      if (data.success) {
        setCourseCurriculumFormData((prev) => {
          let cpyCurriculumFormData = [...prev];
          cpyCurriculumFormData[index] = {
            ...prev[index],
            public_id: "",
            video_url: "",
          };
          return cpyCurriculumFormData;
        });
      }
    } catch (error) {}
  }

  function isCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) =>
      Object.keys(item).every((key) => item[key] !== "")
    );
    // return courseCurriculumFormData.every(item => Object.entries(item).map(([key,value])=> value!== ""))
  }
  courseCurriculumFormData;
  return (
    <Card className="my-4 overflow-y-auto ">
      <div className="flex flex-col ">
        <CardHeader>Create Course Curriculum</CardHeader>
        <Button
          onClick={() => hnadleAddNewLecture()}
          className="text-white w-[100px] mx-6 mb-7 -mt-2 cursor-pointer"
          disabled={!isCurriculumFormDataValid()}
        >
          Add Lecture
        </Button>
      </div>
      <CardContent>
        {courseCurriculumFormData.map((lecture, index) => {
          return (
            <Card className="mb-6" key={index}>
              <div className="flex items-center">
                <CardHeader className="font-bold capitalize text-nowrap">
                  Lecture {index + 1}
                </CardHeader>
                <Input
                  placeholder="Enter Lecture Title..."
                  type="text"
                  className="w-[40%] mr-4"
                  value={courseCurriculumFormData[index].title}
                  onChange={(e) => {
                    handleTitleValueChange(e, index);
                  }}
                />

                <Switch
                  checked={courseCurriculumFormData[index].freePreview}
                  onCheckedChange={(isChecked) => {
                    handleFreePreviewValueChange(isChecked, index);
                  }}
                  className="mr-1"
                  id={`freePreview-${index + 1}`}
                />
                <label htmlFor={`freePreview-${index + 1}`}>freePreview</label>
              </div>
              <CardContent>
                {/* this loader is for the course settings image uploadation. */}

                {/* {isUploading ? (
                  <div className="w-full bg-gray-300 rounded-full h-3 mt-2 relative overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-1/3 h-full bg-blue-500 animate-slide"></div>
                    </div>
                  </div>
                ) :null }

                <style>
                  {`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          .animate-slide {
            animation: slide 2s infinite linear;
          }
        `}
                </style> */}
                {!lecture.video_url ? (
                  <Input
                    accept="video/*"
                    type="file"
                    onChange={(event) => {
                      handleUploadSingleLecture(event, index);
                    }}
                  />
                ) : null}

                {lecture.video_url ? (
                  <div className="p-2 bg-neutral-800 rounded-2xl my-4">
                    <video
                      className="aspect-2/1 my-4 border rounded-xl p-3"
                      controls
                      width="100%"
                      height="100px"
                    >
                      {(lecture.video_url, "ldkfjs")}
                      <source src={lecture.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <p className="my-3 font-semibold">Video not uploaded yet.</p>
                )}

                {lecture.video_url ? (
                  <div className="flex items-center gap-6 text-white">
                    <Button
                      className="cursor-pointer"
                      onClick={() =>
                        handleReplaceLectureVideo(lecture.public_id, index)
                      }
                    >
                      Replace Video
                    </Button>
                    <Button
                      className="bg-red-800 hover:bg-red-900 cursor-pointer"
                      onClick={() => {
                        handleDeleteLecture(index);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
