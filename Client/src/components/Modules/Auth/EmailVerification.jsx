import React, { useEffect, useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { H4, P } from "../../Index";

function EmailVerification() {
  const { verificationToken } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/auth/user/verify-email?verificationToken=${verificationToken}`
        );
        if (response.status === 200) {
          setIsVerified(true);
        }
      } catch (error) {
        setError(error.response.data.message);
        console.log(error);
      }
      setTimeout(() => {
        navigate("/auth/login-user");
      }, 2000);
    };
    verifyEmail();
  }, [verificationToken]);

  return (
    <div>
      {isVerified ? (
        <>
          <div className="flex py-4 flex-col gap-2 text-center items-center justify-center">
            <CircleCheck className="h-16 w-16 md:h-36 md:w-32" color="green" />

            <H4>Email Verified Successfully!</H4>

            <P>
              Thank you for verifying your email address. You can now login to
              your account.
            </P>
          </div>
        </>
      ) : (
        <div className="flex gap-2 py-4 flex-col text-center items-center justify-center">
          <CircleAlert className="h-16 w-16 md:h-36 md:w-32" color="red" />
          <H4>{error}</H4>
        </div>
      )}
    </div>
  );
}

export default EmailVerification;
