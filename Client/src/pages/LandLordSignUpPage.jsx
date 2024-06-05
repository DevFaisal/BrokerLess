import React from "react";
import LandLordRegistration from "../components/LandlordRegistration";
import logoWhite from "../assets/logowhite.svg";
import AuthContainer from "../components/AuthContainer";

function LandLordSignUpPage() {
  const text = [
    {
      text: "Post your property and get the best tenants",
      list: [
        "We are here to help you find the best tenants",
        "We provide you with the best options",
        "Find the best tenants with us",
      ],
    },
  ];
  return (
    <AuthContainer logo={logoWhite} text={text}>
      <LandLordRegistration />
    </AuthContainer>
  );
}

export default LandLordSignUpPage;
