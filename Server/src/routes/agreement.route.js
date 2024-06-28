import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import Authentication from "../middlewares/Authentication.js";
import isValidLandlord from "../middlewares/isValidLandlord.js";
import {
  generateAgreement,
  getAgreements,
  approveAgreement,
  getTenantAgreement,
  deleteAgreement,
  getAgreementDate,
} from "../controllers/agreement.controller.js";

const router = Router();
const prisma = new PrismaClient();

//-----------------Agreement Tenant Routes-----------------

// POST Request to create a new Agreement
router.route("/generate").post(Authentication, generateAgreement);

//GET Agreement of a Specific Tenant
router.route("/tenant").get(Authentication, getTenantAgreement);

//DELETE Agreement of a Specific Tenant
router.route("/tenant").delete(Authentication, deleteAgreement);

//GET Agreement Date of a Specific Property
router.route("/date").get(Authentication, getAgreementDate);

//------------Agreement Landlord Routes------------

// GET All Agreement Applications API Endpoint
router.route("/").get(isValidLandlord, getAgreements);

// Approve Agreement Application API Endpoint
router.route("/approve").put(isValidLandlord, approveAgreement);

export default router;
