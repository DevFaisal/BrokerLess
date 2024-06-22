import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Container, FooterLinks, FormInput } from "../../Index";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const loginAPI = `${import.meta.env.VITE_LOCALHOST}/auth/user/login`;
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Login API:", loginAPI);
    setLoading(true);
    console.log("Form Data Submitted:", data);
    try {
      const response = await axios.post(loginAPI, data, {
        withCredentials: true,
      });
      console.log("API Response:", response);
      setLoading(false);
      toast.success(response.data.message);

      window.location.reload("/user/dashboard");
    } catch (error) {
      console.error("Error Details:", error);
      setLoading(false);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "An unexpected error occurred"
        );
        if (error.response.data.message === "Email not verified") {
          setEmailError(true);
        }
      } else {
        toast.error("Network error or server not responding");
      }
    }
  };

  const resendEmail = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/auth/user/resend-verification-email`,
        { email: document.getElementById("email").value }
      );
      console.log(response);
      toast.success(response.data.message);
      setEmailError(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
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

  const FooterLink = [
    {
      text: "Don't have an account?",
      link: "/auth/register-user",
      linkText: "Register",
    },
    {
      text: "Forget Password?",
      link: "/auth/forget-password-user",
      linkText: "Reset Password",
    },
  ];

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-auto">
          <FormInput
            Inputs={Inputs}
            register={register}
            errors={errors}
            Heading={"User Login"}
            Subheading={"Login as User"}
          />
          <Button
            className={"flex justify-center w-full mt-5 "}
            type="submit"
            disabled={loading}
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
          </div>
          <FooterLinks Links={FooterLink} />
        </div>
      </form>
    </Container>
  );
}

export default UserLogin;
