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
import {
  checkUserVerificationToken,
  resetUserPassword,
} from "../../../api/UserApi";

function ResetPassword() {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
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
        const res = await checkUserVerificationToken(verificationToken);
        if (res.status === 200) {
          setError(false);
        } else if (res.status === 400) {
          setErrorMessage(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkVerificationToken();
  }, [verificationToken]);

  const resetPassword = async (data) => {
    const { password, confirmPassword } = data;

    // Validate password length
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    // Validate if passwords match
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      // Call the API to reset the user's password
      const response = await resetUserPassword({ password, verificationToken });

      // Handle the response based on the status code
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/auth/login-user");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle errors gracefully
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      // Ensure loading state is reset
      setLoading(false);
    }
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
