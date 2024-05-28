import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import isValidLandlord from "../middlewares/isValidLandlord.js";
import {
  getAllProperties,
  getPropertyById,
  searchProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";

const router = Router();
const client = new PrismaClient();

// ------------------- Property Routes -------------------

//GET Request to get all properties
router.route("/").get(getAllProperties);

// GET Request to get a property by ID
router.route("/prop").get(getPropertyById);

// GET Request to get a property by Address
router.route("/search").get(searchProperty);

// ------------------- Landlord Routes -------------------

// POST Request to create a new property by Landlord only
router.route("/", isValidLandlord).post(createProperty);

// PUT Request to update a property by Landlord only
router.route("/update", isValidLandlord).put(updateProperty);

// DELETE Request to delete a property by Landlord only
router.route("/delete", isValidLandlord).delete(deleteProperty);

export default router;
