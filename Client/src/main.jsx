import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import {
  HomePage,
  AboutPage,
  ContactPage,
  ServicesPage,
  ErrorPage,
  EmailVerificationPage,
  UserRegistrationPage,
  UserLoginPage,
  LandLordRegistrationPage,
  ForgetPasswordPage,
  ResetPasswordPage,
} from "./pages/Index";
import Dashboard from "./components/User/Dashboard";
import Auth from "./components/Auth";
import Loading from "./components/Modules/Loading";
import UserAuth from "./layout/UserAuth";
import Protected from "./components/Protected";

const router = createBrowserRouter([
  { path: "*", element: <ErrorPage /> },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Auth>
          <RootLayout />
        </Auth>
      </Suspense>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <Auth>
          <AuthLayout />
        </Auth>
      </Suspense>
    ),
    children: [
      { path: "register-landlord", element: <LandLordRegistrationPage /> },
      { path: "register-user", element: <UserRegistrationPage /> },
      { path: "login-user", element: <UserLoginPage /> },
      { path: "forget-password", element: <ForgetPasswordPage /> },
      {
        path: "reset-password/:verificationToken",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <Suspense fallback={<Loading />}>
        <Protected>
          <UserAuth />
        </Protected>
      </Suspense>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <div>Profile</div> },
      { path: "settings", element: <div>Settings</div> },
    ],
  },
  {
    path: "/email-verification/:verificationToken",
    element: <EmailVerificationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="bottom-center" />
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </>
);
