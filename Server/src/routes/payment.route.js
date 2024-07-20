import { Router } from "express";
import { createPaymentIntent } from "../controllers/payment.controller.js";
import Authentication from "../middlewares/Authentication.js";

const router = Router();

router.post("/", Authentication, createPaymentIntent);

export default router;
