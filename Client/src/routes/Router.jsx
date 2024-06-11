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
} from "../pages/Index";
import Layout from "../layout/Layout";
import { UserPrivateRoute, LandLordPrivateRoute } from "../components/Index";
import Properties from "../components/Modules/Landlord/Properties/Properties";
import Tenants from "../components/Modules/Landlord/Tenants";
import UserDashboardPage from "../pages/Auth/User/UserDashboardPage";
import PropertiesPage from "../components/Modules/PropertiesWrapper";
import Property from "../components/Modules/Landlord/Properties/Property";
import AddProperty from "../components/Modules/Landlord/Properties/AddProperty";
import AllProperties from "../components/Modules/User/AllProperties";

const RootRouter = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <Router>
          <Toaster position="bottom-center" />
          <Routes>
            //GENERAL ROUTES
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
            //LANDLORD ROUTES
            <Route path="/landlord" element={<LandLordPrivateRoute />}>
              <Route path="" element={<LandlordLordDashboardPage />}>
                <Route path="dashboard" element={<div>Dashboard</div>} />
                <Route path="properties" element={<PropertiesPage />}>
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                  <Route path="add" element={<AddProperty />} />
                </Route>
                <Route path="tenants" element={<Tenants />} />
                <Route path="payments" element={<div>Payments</div>} />
                <Route path="maintenance" element={<div>Maintenance</div>} />
                <Route path="profile" element={<div>Profile</div>} />
              </Route>
              <Route path="profile" element={<div>Profile</div>} />
              <Route path="settings" element={<div>Settings</div>} />
            </Route>
            //USER ROUTES
            <Route path="/user" element={<UserPrivateRoute />}>
              <Route path="" element={<UserDashboardPage />}>
                <Route path="dashboard" element={<div>Dashboard</div>} />
                <Route path="properties" element={<AllProperties />} />
                <Route path="payments" element={<div>Payments</div>} />
                <Route path="maintenance" element={<div>Maintenance</div>} />
                <Route path="profile" element={<div>Profile</div>} />
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
