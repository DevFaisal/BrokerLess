import React from "react";
import AuthContainer from "../../components/Containers/AuthContainer";
import { UserRegistration } from "../../components/Index";
import { logo } from "../../assets/Index";

function UserRegistrationPage() {
  const text = [
    {
      text: "Find your dream home with us",
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
      bgColorleft={"bg-[#ccd5ae]"}
      bgColorright={"bg-[#83c5be]"}
    >
      <UserRegistration />
    </AuthContainer>
  );
}

export default UserRegistrationPage;
