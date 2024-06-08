import React from "react";
import { logo } from "../../assets/Index";
import AuthContainer from "../../components/Containers/AuthContainer";
import { LandlordLogin } from "../../components/Index";

function LandlordLoginPage() {
  const text = [
    {
      text: "Login as Landlord",
      list: [
        "We are here to help you find best tenants",
        "We provide you with the best options",
        "Find your dream tenant with us",
      ],
    },
  ];

  return (
    <AuthContainer
      logo={logo}
      text={text}
      bgColorleft={"bg-[#81b29a]"}
      bgColorright={"bg-[#669bbc]"}
    >
      <LandlordLogin />
    </AuthContainer>
  );
}

export default LandlordLoginPage;
