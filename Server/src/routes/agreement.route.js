import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import Authentication from "../middlewares/Authentication.js";
import isValidLandlord from "../middlewares/isValidLandlord.js";
import {
  generateAgreement,
  getAgreements,
  approveAgreement,
} from "../controllers/agreement.controller.js";

const router = Router();
const prisma = new PrismaClient();

//-----------------Agreement Tenant Routes-----------------

// POST Request to create a new Agreement
router.route("/generate").post(Authentication, generateAgreement);




//------------Agreement Landlord Routes------------

// GET All Agreement Applications API Endpoint
router.route("/").get(isValidLandlord, getAgreements);

// Approve Agreement Application API Endpoint
router.route("/approve").post(isValidLandlord, approveAgreement);

export default router;
