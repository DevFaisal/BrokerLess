import React from "react";
import { Outlet } from "react-router-dom";

function LandlordAuth({ landlord }) {
  return (
    <div>{landlord.isVerified ? <Outlet /> : "You are not a landlord"}</div>
  );
}

export default LandlordAuth;
