import React, { useEffect, useState } from "react";
import Container from "../../Containers/Container";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../Buttons/Button";
import { useForm } from "react-hook-form";
import { FormInput } from "../../Index";

function ResetPassword() {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const Inputs = [
    {
      label: "Enter new password",
      name: "password",
      type: "password",
      placeholder: "Write your new password here",
    },
    {
      label: "Confirm new password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Write your new password here again",
    },
  ];

  useEffect(() => {
    const checkVerificationToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/auth/user/reset-password/${verificationToken}`
        );
        console.log(response);
        if (response.status === 200) {
          setError(false);
        } else {
          setError(false);
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
        console.log(error);
      }
    };
    checkVerificationToken();
  }, [verificationToken]);

  const resetPassword = async (data) => {
    const { password, confirmPassword } = data;
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/auth/user/reset-password`,
        { password, verificationToken }
      );
      if (response.status === 200) {
        setLoading(false);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/auth/login-user");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <>
      {error ? (
        <Error404 error={errorMessage} />
      ) : (
        <form onSubmit={handleSubmit(resetPassword)}>
          <div>
            <FormInput
              Inputs={Inputs}
              register={register}
              errors={errors}
              Heading={"Reset Password"}
              Subheading={"Enter your new password to reset your account"}
            />
            <Button
              className={"flex justify-center w-full mt-5 mb-5 "}
              onClick={handleSubmit(resetPassword)}
            >
              {loading ? (
                <LoaderCircle size={20} className="text-white animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
            <Link
              to="/auth/login-user"
              className="text-secondary hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </>
  );
}

export default ResetPassword;

export function Error404({ error: errorMessage }) {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl text-danger font-bold">Error 404</h1>
        <p className="text-lg text-gray-500">{errorMessage}</p>
      </div>
    </Container>
  );
}
