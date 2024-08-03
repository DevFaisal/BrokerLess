import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import isValidLandlord from "../middlewares/isValidLandlord.js";
import Authentication from "../middlewares/Authentication.js";
import {
  getAllProperties,
  getPropertyById,
  searchProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getTenantsOfSpecificProperty,
  getLandlordProperties,
  getAllTenants,
  getPropertyByIdToTenant,
  getRecentProperties,
} from "../controllers/property.controller.js";
import { uploadImage } from "../middlewares/multer.js";

const router = Router();
const client = new PrismaClient();

// ------------------- Property Routes -------------------

//GET Request to get all recently added properties
router.route("/recent").get(getRecentProperties);

//GET Request to get all properties
router.route("/").get(getAllProperties);

// GET Request to get a property by ID
router.route("/detail").get(isValidLandlord, getPropertyById);

// GET Request to get a property by Address
router.route("/search").get(searchProperty);

// ------------------- Landlord Routes -------------------

// GET Request to get all properties by Landlord only
router.route("/landlord").get(isValidLandlord, getLandlordProperties);

// POST Request to create a new property by Landlord only
router.route("/").post(isValidLandlord, uploadImage, createProperty);

// PUT Request to update a property by Landlord only
router.route("/update").put(isValidLandlord, updateProperty);

// DELETE Request to delete a property by Landlord only
router.route("/").delete(isValidLandlord, deleteProperty);

// GET List of TENANTS for a specific property
router
  .route("/tenants/propertyId")
  .get(isValidLandlord, getTenantsOfSpecificProperty);

//GET all tenants of landlord
router.route("/tenants").get(isValidLandlord, getAllTenants);

// ------------------- Tenant Routes -------------------

// GET Request to get properties by ID
router.route("/info").get(Authentication, getPropertyByIdToTenant);

export default router;
