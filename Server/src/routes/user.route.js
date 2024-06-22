import { Router } from "express";
import Authentication from "../middlewares/Authentication.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
  refreshToken,
  resendVerificationEmail,
  forgetPassword,
  resetPassword,
  checkVerificationToken,
} from "../controllers/user.controller.js";

const router = Router();

// POST User Registration API Endpoint
router.route("/register").post(registerUser);

// Resend Verification Email API Endpoint
router.route("/resend-verification-email").post(resendVerificationEmail);

// POST User Login API Endpoint
router.route("/login").post(loginUser);

// POST User Logout API Endpoint
router.route("/logout").get(Authentication, logoutUser); 

// POST User forgot password API Endpoint
router.route("/forgot-password").post(forgetPassword);

// GET User to check Reset Password Token API Endpoint
router.route("/reset-password/:verificationToken").get(checkVerificationToken);

// POST User Reset Password API Endpoint
router.route("/reset-password").post(resetPassword);

// GET User Profile API Endpoint
router.route("/me").get(Authentication, userProfile);

//UPDATE User Profile API Endpoint
router.route("/profile").put(Authentication, updateUserProfile);

//GET Refresh Token API Endpoint
router.route("/refresh-token").get(Authentication, refreshToken);

export default router;
