import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const FormControls = ({ formData, setFormData, formControls }) => {
  function renderComponentByType(controlItem) {
    let element = null;
    const currentControlItemValue = formData[controlItem.name] || "";
    currentControlItemValue, "current";
    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            name={controlItem.name}
            value={currentControlItemValue}
            onChange={(event) => {
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
      case "select":
        element = (
          <Select
            className=""
            onValueChange={(value) => {
              setFormData({ ...formData, [controlItem.name]: value });
            }}
            value={formData[controlItem.name]}
          >
            <SelectTrigger>
              <SelectValue placeholder={controlItem.placeholder} />
            </SelectTrigger>
            <SelectContent className="z-10 bg-white">
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      className="hover:bg-gray-200"
                    >
                      {item.label}{" "}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      default:
        element = (
          <Input
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            name={controlItem.name}
          />
        );
        break;
    }
    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => {
        return (
          <div key={controlItem.name}>
            <label htmlFor={controlItem.name}>{controlItem.label}</label>
            {renderComponentByType(controlItem)}
          </div>
        );
      })}
    </div>
  );
};

export default FormControls;
