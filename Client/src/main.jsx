import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";

import Routes from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Routes />
  </RecoilRoot>
);
