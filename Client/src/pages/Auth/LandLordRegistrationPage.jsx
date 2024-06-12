import React from "react";
import { AuthContainer, LandLordRegistration } from "../../components/Index";
import { logo } from "../../assets/Index";

function LandLordRegistrationPage() {
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

export default LandLordRegistrationPage;
