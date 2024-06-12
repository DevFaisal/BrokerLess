import React from "react";
import { ResetPassword, AuthContainer } from "../../components/Index";

import { logo } from "../../assets/Index";

function ResetPasswordPage() {
  const text = [
    {
      text: "Reset your password",
      list: [
        "Enter your new password to reset your account",
        "We are here to help you find your dream home",
        "We provide you with the best options",
        "Find your dream home with us",
      ],
    },
  ];

  return (
    <AuthContainer
      title="Reset Password"
      description="Enter your new password to reset your account"
      text={text}
      logo={logo}
      bgColorleft={"bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"}
      bgColorright={"bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500"}
    >
      <ResetPassword />
    </AuthContainer>
  );
}

export default ResetPasswordPage;
