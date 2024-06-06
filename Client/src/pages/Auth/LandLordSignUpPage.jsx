import React from "react";
import LandLordRegistration from "../../components/Modules/LandlordRegistration";
import logo from "../assets/logo.svg";
import AuthContainer from "../../components/AuthContainer";

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
    <AuthContainer
      logo={logo}
      text={text}
      bgColorleft={"bg-[#a8dadc]"}
      bgColorright={"bg-[#faedcd]"}
    >
      <LandLordRegistration />
    </AuthContainer>
  );
}

export default LandLordSignUpPage;
