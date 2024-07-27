import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { Loading } from "../components/Index";

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
  LandlordLoginPage,
  LandlordLordDashboardPage,
  UserDashboardPage,
  PropertyInfo,
  UserRequests,
  ApplicationsPage,
} from "../pages/Index";
import Layout from "../layout/Layout";
import {
  UserPrivateRoute,
  LandLordPrivateRoute,
  Tenants,
  LandLordPropertiesWrapper,
  Property,
  Properties,
  AddProperty,
  AllProperties,
  UserPropertiesWrapper,
} from "../components/Index";
import LandLordProfilePage from "../pages/Auth/Landlord/LandLordProfilePage";
import UserProfilePage from "../pages/Auth/User/UserProfilePage";
import Success from "../pages/Payment/Success";
import Failure from "../pages/Payment/Failure";
import UserDashboardIndex from "../pages/Auth/User/UserDashboardIndex";
import LandLordDashboardIndex from "../pages/Auth/Landlord/LandLordDashboardIndex";

const RootRouter = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <Router>
          <Toaster position="bottom-center" />
          <Routes>
            {/* GENERAL ROUTES */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            <Route path="/auth" element={<Layout />}>
              <Route path="register-user" element={<UserRegistrationPage />} />
              <Route path="login-user" element={<UserLoginPage />} />
              <Route
                path="forget-password-user"
                element={<ForgetPasswordPage />}
              />
              <Route
                path="reset-password/:verificationToken"
                element={<ResetPasswordPage />}
              />
              <Route
                path="register-landlord"
                element={<LandLordRegistrationPage />}
              />
              <Route path="login-landlord" element={<LandlordLoginPage />} />
              <Route
                path="forget-password-landlord"
                element={<div>LL Forget Password</div>}
              />
              <Route
                path="reset-password/landlord/:verificationToken"
                element={<div>LL Reset Password</div>}
              />
            </Route>
            {/* LANDLORD ROUTES */}
            <Route path="/landlord" element={<LandLordPrivateRoute />}>
              <Route path="" element={<LandlordLordDashboardPage />}>
                <Route path="dashboard" element={<LandLordDashboardIndex/>} />
                <Route
                  path="properties"
                  element={<LandLordPropertiesWrapper />}
                >
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                  <Route path="add" element={<AddProperty />} />
                </Route>
                <Route path="tenants" element={<Tenants />} />
                <Route path="applications" element={<ApplicationsPage />} />
                <Route path="maintenance" element={<div>Maintenance</div>} />
                <Route path="profile" element={<LandLordProfilePage />} />
              </Route>
              <Route path="profile" element={<div>Profile</div>} />
              <Route path="settings" element={<div>Settings</div>} />
            </Route>
            {/* USER ROUTES */}
            <Route path="/user" element={<UserPrivateRoute />}>
              <Route path="" element={<UserDashboardPage />}>
                <Route path="dashboard" element={<UserDashboardIndex />} />
                <Route path="properties" element={<UserPropertiesWrapper />}>
                  <Route index element={<AllProperties />} />
                  <Route path=":propertyId" element={<PropertyInfo />} />
                </Route>
                <Route path="requests" element={<UserRequests />} />
                <Route path="maintenance" element={<div>Maintenance</div>} />
                <Route path="profile" element={<UserProfilePage />} />
                <Route path="payment-success" element={<Success />} />
                <Route path="payment-failed" element={<Failure />} />
              </Route>
            </Route>
            <Route
              path="/email-verification/:verificationToken"
              element={<EmailVerificationPage />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Suspense>
    </RecoilRoot>
  );
};

export default RootRouter;
