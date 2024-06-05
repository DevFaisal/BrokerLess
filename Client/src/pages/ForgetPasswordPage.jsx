import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Button from "../components/Buttons/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import logo from "../assets/logo.svg";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sentEmail = async () => {
    try {
      if (!email) {
        return toast.error("Please enter your email");
      }
      if (!email.includes("@")) {
        return toast.error("Please enter a valid email");
      }
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/auth/user/forgot-password`,
        { email }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        useTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  const text = [
    {
      text: "Forget your password",
      list: [
        "We are here to help you find your dream home",
        "We provide you with the best options",
        "Find your dream home with us",
      ],
    },
  ];

  return (
    <AuthContainer logo={logo} text={text}>
      <Container>
        <div className="flex items-center justify-center h-screen w-full">
          <div className="flex flex-col items-center justify-start w-1/3 border bg-white p-10  border-gray-300 rounded-lg                         shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h1 className="text-3xl font-bold mb-32">Forget Password</h1>
            <label className=" w-full text-black font-bold">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full p-2 border border-gray-300 rounded-md"
              placeholder="Write your email here"
              aria-invalid="spelling"
              type="email"
            />
            <Button
              className={"flex justify-center w-full mt-5 mb-5 "}
              onClick={sentEmail}
            >
              {loading ? (
                <LoaderCircle size={20} className="text-white animate-spin" />
              ) : (
                "Send Email"
              )}
            </Button>
            <Link
              to="/auth/login-user"
              className="text-secondary hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </Container>
    </AuthContainer>
  );
}

export default ForgetPasswordPage;
