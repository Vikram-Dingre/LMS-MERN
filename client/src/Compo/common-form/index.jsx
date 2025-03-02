import React from "react";
import FormControls from "./FormControls";
import { Button } from "@/components/ui/button";

const CommonForm = ({
  handleSubmit,
  buttonText,
  formData,
  setFormData,
  formControls,
}) => {
  formData, "formdata";
  return (
    <div className="flex flex-col gap-5">
      <FormControls
        formData={formData}
        setFormData={setFormData}
        formControls={formControls}
      />
      <div className="flex items-center justify-center">
        <Button
          className="bg-black text-white w-full cursor-pointer"
          onClick={handleSubmit}
        >
          {buttonText || "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default CommonForm;
