import CommonForm from "@/Compo/common-form";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/instructor";
import React, { useContext } from "react";

const CourseLanding = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);
  function handleSubmit() {
    alert("handling submit button...");
  }
  return (
    <div className="border rounded p-4 my-4">
      <CommonForm
        formData={courseLandingFormData}
        setFormData={setCourseLandingFormData}
        formControls={courseLandingPageFormControls}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CourseLanding;
