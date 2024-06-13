import React from "react";
import { EmailVerification, AuthContainer } from "../../components/Index";
import { logo } from "../../assets/Index";

function EmailVerificationPage() {
  const text = [
    {
      text: "Verify your email",
      list: [
        "Verify your email to activate your account",
        "We are here to help you find your dream home",
        "We provide you with the best options",
        "Find your dream home with us",
      ],
    },
  ];
  return (
    <AuthContainer
      text={text}
      logo={logo}
      title="Verify Email"
      description="Verify your email to activate your account"
      bgColorleft={"bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"}
      bgColorright={"bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500"}
    >
      <EmailVerification />
    </AuthContainer>
  );
}

export default EmailVerificationPage;
