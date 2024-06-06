import React from "react";
import AuthContainer from "../components/AuthContainer";
import logo from "../assets/logo.svg";
import ForgetPassword from "../components/ForgetPassword";

function ForgetPasswordPage() {
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
    <AuthContainer
      logo={logo}
      text={text}
      bgColorleft={"bg-[#778da9]"}
      bgColorright={"bg-[#a3b18a]"}
    >
      <ForgetPassword />
    </AuthContainer>
  );
}

export default ForgetPasswordPage;
