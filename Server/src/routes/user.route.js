import { Router } from "express";
import Authentication from "../middlewares/Authentication.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
  refreshToken,
  verifyEmail,
  resendVerificationEmail,
  forgetPassword,
  resetPassword,
} from "../controllers/user.controller.js";

const router = Router();

// POST User Registration API Endpoint
router.route("/register").post(registerUser);

// Verify Email API Endpoint
router.route("/verify-email").get(verifyEmail);

// Resend Verification Email API Endpoint
router.route("/resend-verification-email").post(resendVerificationEmail);

// POST User Login API Endpoint
router.route("/login").post(loginUser);

// POST User Logout API Endpoint
router.route("/logout").post(Authentication, logoutUser);

// POST User forgot password API Endpoint
router.route("/forgot-password").post(forgetPassword);

// POST User Reset Password API Endpoint
router.route("/reset-password").post(resetPassword);

// GET User Profile API Endpoint
router.route("/profile").get(Authentication, userProfile);

//UPDATE User Profile API Endpoint
router.route("/profile").put(Authentication, updateUserProfile);

//GET Refresh Token API Endpoint
router.route("/refresh-token").get(Authentication, refreshToken);

export default router;
