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

//-----------------Agreement Routes-----------------
// POST Request to create a new Agreement
router.route("/generate", Authentication).post(generateAgreement);

//------------Agreement Landlord Routes------------
// GET All Agreement Applications API Endpoint
router.route("/", isValidLandlord).get(getAgreements);

// Approve Agreement Application API Endpoint
router.route("/approve", isValidLandlord).post(approveAgreement);

export default router;
