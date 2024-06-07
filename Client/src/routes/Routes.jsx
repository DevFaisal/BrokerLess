import React from "react";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../store/UserAtom";
import { createBrowserRouter } from "react-router-dom";
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
} from "../pages/Index";
import { Dashboard } from "../components/Index";
import { RootLayout, UserAuth } from "../layout/Index";

const Routes = () => {
  const user = useRecoilValue(UserSelector);

  const router = createBrowserRouter([
    {
      // General pages
      path: "/",
      element: <RootLayout user={user} />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "services", element: <ServicesPage /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },
    {
      // Authentication pages
      path: "/auth",
      element: <RootLayout user={user} />,
      children: [
        { path: "register-user", element: <UserRegistrationPage /> },
        { path: "login-user", element: <UserLoginPage /> },
        { path: "forget-password-user", element: <ForgetPasswordPage /> },
        {
          path: "reset-password/:verificationToken",
          element: <ResetPasswordPage />,
        },
      ],
    },
    {
      // User pages
      path: "/user",
      element: <UserAuth user={user} />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <div>Profile</div> },
        { path: "settings", element: <div>Settings</div> },
      ],
    },
    {
      // Landing pages
      path: "/auth",
      element: <RootLayout user={user} />,
      children: [
        { path: "register-landlord", element: <LandLordRegistrationPage /> },
        { path: "login-landlord", element: <>Login Landlord</> },
        { path: "forget-password-landlord", element: <>LL Forget Password</> },
        {
          path: "reset-password/landlord/:verificationToken",
          element: <>LL Reset Password</>,
        },
      ],
    },
    {
      path: "/email-verification/:verificationToken",
      element: <EmailVerificationPage />,
    },
    { path: "*", element: <ErrorPage /> },
  ]);

  return (
    <>
      <Toaster position="bottom-center" />
      <RouterProvider router={router} />
    </>
  );
};
export default Routes;
