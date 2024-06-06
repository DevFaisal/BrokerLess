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
import { Loading, Dashboard } from "../components/Index";
import { RootLayout, AuthLayout, UserAuth } from "../layout/Index";

const Routes = () => {
  const user = useRecoilValue(UserSelector);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <RootLayout />
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
          <AuthLayout user={user} />
        </Suspense>
      ),
      children: [
        { path: "register-user", element: <UserRegistrationPage /> },
        { path: "login-user", element: <UserLoginPage /> },
        { path: "register-landlord", element: <LandLordRegistrationPage /> },
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
          <UserAuth user={user} />
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
