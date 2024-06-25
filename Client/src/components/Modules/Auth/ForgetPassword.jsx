import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "../../Index";
import { forgotPassword } from "../../../api/UserApi";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendEmail = async () => {
    try {
      if (!email) {
        return toast.error("Please enter your email");
      }
      if (!email.includes("@")) {
        return toast.error("Please enter a valid email");
      }

      setLoading(true);
      const res = await forgotPassword({ email });
      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/auth/login-user");
        }, 2000);
      } else if (res.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
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
          onClick={sendEmail}
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
