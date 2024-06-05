import React from "react";
import { useForm } from "react-hook-form";
import Container from "./Container";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "./Buttons/Button";
import H3 from "./Inputs/H3";
import H4 from "./Inputs/H4";

function UserLogin() {
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await axios
      .post(`${import.meta.env.VITE_LOCALHOST}/auth/user/login`, data)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
        if (error.response.data.message === "Email not verified") {
          setEmailError(true);
        }
        return error;
      });
  };

  const resendEmail = async () => {
    const response = await axios
      .post(
        `${import.meta.env.VITE_LOCALHOST}/auth/user/resend-verification-email`,
        { email: document.getElementById("email").value }
      )
      .then((res) => {
        toast.success(res.data.message);
        setEmailError(false);
        return res;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        return error;
      });
  };

  const Inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];
  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-6 py-2 md:p-5 bg-white mx-5 2xl:mx-40 rounded-md max-w-1/2 shadow-md"
      >
        <div className="flex flex-col  w-auto  gap-3">
          <H3 className="text-center">User Login</H3>
          <span className="h-[1px] w-auto bg-success mb-5" />
          <H4 className="text-center">Sign In to your account</H4>
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
          <Button
            className={"flex justify-center w-full mt-5 "}
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? (
              <LoaderCircle size={20} className="text-white animate-spin" />
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center text-sm py-3 md:text-md font-semibold text-black pt-5">
            {emailError && (
              <p className="font-bold">
                Resend verification email
                <button
                  className="text-success py-4 p-2"
                  type="button"
                  onClick={resendEmail}
                >
                  Resend
                </button>
              </p>
            )}
            <p>
              Don't have an account?{" "}
              <Link to="/auth/register-user" className="text-success">
                Register
              </Link>
            </p>
            <p>
              Forget Password?{" "}
              <Link to="/auth/forget-password" className="text-success">
                Reset Password
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default UserLogin;
