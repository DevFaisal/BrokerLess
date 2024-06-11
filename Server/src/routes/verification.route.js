import { Router } from "express";
import { verifyEmail } from "../controllers/verification.controller.js";

const router = Router();

// Verify Email API Endpoint
router.route("/verify-email").get(verifyEmail);

// Resend Verification Email API Endpoint
// router.route("/resend-verification-email").post(resendVerificationEmail);

export default router;
