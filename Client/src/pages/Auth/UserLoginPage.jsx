import React from "react";
import { logo } from "../../assets/Index";
import { AuthContainer, UserLogin } from "../../components/Index";

function UserLoginPage() {
  const text = [
    {
      text: "Login to your account",
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
      bgColorleft={"bg-[#8ecae6]"}
      bgColorright={"bg-[#d0f4de]"}
    >
      <UserLogin />
    </AuthContainer>
  );
}

export default UserLoginPage;
