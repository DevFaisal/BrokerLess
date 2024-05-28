import { Router } from "express";
import Authentication from "../middlewares/Authentication.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
  refreshToken,
} from "../controllers/user.controller.js";

const router = Router();

// POST User Registration API Endpoint
router.route("/register").post(registerUser);

// POST User Login API Endpoint
router.route("/login").post(loginUser);

// POST User Logout API Endpoint
router.route("/logout", Authentication).post(logoutUser);

// GET User Profile API Endpoint
router.route("/profile", Authentication).get(userProfile);

//UPDATE User Profile API Endpoint
router.route("/profile", Authentication).put(updateUserProfile);

//GET Refresh Token API Endpoint
router.route("/refresh-token", Authentication).get(refreshToken);

export default router;
