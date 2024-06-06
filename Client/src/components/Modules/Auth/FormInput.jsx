import React from "react";
import H3 from "./Inputs/H3";
import H4 from "./Inputs/H4";

function FormInput({
  Inputs,
  register,
  errors,
  className,
  Heading,
  Subheading,
}) {
  return (
    <div>
      <H3 className="text-center mb-4">{Heading}</H3>
      <span className="h-[1px] w-auto bg-background mb-5" />
      <H4>{Subheading}</H4>
      {Inputs.map((input, index) => (
        <div key={index}>
          <label className="block md:font-semibold text-black">
            {input.label}
          </label>
          <input
            id={input.name}
            key={index}
            {...register(input.name, { required: input.required })}
            type={input.type}
            placeholder={input.placeholder}
            aria-invalid={errors[input.name] ? "true" : "false"}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
          <p className="text-red-500 text-sm pt-1 md:font-bold">
            {errors[input.name] &&
              errors[input.name].type === "required" &&
              `${input.label} is required`}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FormInput;
