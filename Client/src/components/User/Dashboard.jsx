import React from "react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../store/UserAtom";
import { NavBar } from "../Index";

function Dashboard() {
  const user = useRecoilValue(UserSelector);
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Welcome {user?.name}</h3>
    </div>
  );
}

export default Dashboard;
