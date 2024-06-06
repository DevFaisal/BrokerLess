import React from "react";

function FormInput({ Inputs, register, errors }) {
  return (
    <div className="flex flex-col  pt-10">
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
