import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "react-hot-toast";
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

const router = createBrowserRouter([
  { path: "*", element: <ErrorPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
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
    path: "/email-verification/:verificationToken",
    element: <EmailVerificationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="bottom-center" />
    <RouterProvider router={router} />
  </>
);
