import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { Loading } from "./components/Index";
import { Suspense } from "react";

import Routes from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Suspense fallback={<Loading />}>
      <Routes />
    </Suspense>
  </RecoilRoot>
);
