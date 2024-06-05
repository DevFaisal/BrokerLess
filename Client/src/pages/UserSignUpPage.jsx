import React from "react";
import UserRegistration from "../components/UserRegistration";
import logoWhite from "../assets/logowhite.svg";
import AuthContainer from "../components/AuthContainer";

function UserSignUpPage() {
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
    <AuthContainer logo={logoWhite} text={text}>
      <UserRegistration />
    </AuthContainer>
  );
}

export default UserSignUpPage;
