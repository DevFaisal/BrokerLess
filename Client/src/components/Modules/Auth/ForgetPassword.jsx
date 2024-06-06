import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "../../Index";

function ForgetPassword() {
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
    <Container>
      <div>
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
        <Link to="/auth/login-user" className="text-secondary hover:underline">
          Back to Login
        </Link>
      </div>
    </Container>
  );
}

export default ForgetPassword;