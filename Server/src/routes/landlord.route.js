import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import isValidLandlord from "../middlewares/isValidLandlord.js";
import {
  registerLandlord,
  loginLandlord,
  getLandlordProfile,
  logoutLandlord,
} from "../controllers/landlord.controller.js";

const router = Router();
const prisma = new PrismaClient();

// POST Landlord Registration API Endpoint
router.route("/register").post(registerLandlord);

// POST Landlord Login API Endpoint
router.route("/login").post(loginLandlord);

// GET Landlord Logout API Endpoint
router.route("/logout").get(isValidLandlord, logoutLandlord); //http://localhost:5000/api/landlord/logout

// GET Landlord Profile API Endpoint
router.route("/me").get(isValidLandlord, getLandlordProfile);

export default router;
