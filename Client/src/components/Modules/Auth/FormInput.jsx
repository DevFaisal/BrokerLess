import React from "react";
import { H3, H4 } from "../../Index";

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
      <H3 className="text-center mt-2 mb-5">{Heading}</H3>
      <H4 className="text-center text-gray-500 pb-5">{Subheading}</H4>
      {Inputs.map((input, index) => (
        <div key={index} className={className}>
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
