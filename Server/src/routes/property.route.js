import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";
import isValidLandlord from "../middlewares/isValidLandlord.js";

const router = Router();
const client = new PrismaClient();

//GET Request to get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await client.property.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        rent: true,
        status: true,
      },
    });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST Request to create a new property by Landlord only
router.post("/", isValidLandlord, async (req, res) => {
  const result = Validation.propertySchemaValidation(req.body);
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    const PropertyAddress = await client.propertyAddress.create({
      data: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
      },
    });

    const property = await client.property.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        rent: req.body.rent,
        status: req.body.status,
        landlord: {
          connect: {
            id: req.user.id,
          },
        },
        PropertyAddress: {
          connect: {
            id: PropertyAddress.id,
          },
        },
        addressId: PropertyAddress.id,
      },
    });
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Request to get a property by ID
router.get("/prop", async (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ message: "Property ID is required" });
  }
  try {
    const property = await client.property.findUnique({
      where: {
        id: String(req.query.id),
      },
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    //JOIN with landlord to get landlord details

    let landlord = await client.landlord.findUnique({
      where: {
        id: property.landlordId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });
    landlord = {
      ...landlord,
      phone: String(landlord.phone),
    };
    property.landlord = landlord;

    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    //JOIN with address
    property.PropertyAddress = await client.propertyAddress.findUnique({
      where: {
        id: property.addressId,
      },
    });

    if (!property.PropertyAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// GET Request to get a property by Address
router.get("/search", async (req, res) => {
  if (!req.query.city || !req.query.state) {
    return res.status(400).json({ message: "Address is required" });
  }
  try {
    //Search for address in propertyAddress table
    const address = await client.propertyAddress.findMany({
      where: {
        city: req.query.city,
        state: req.query.state,
      },
    });
    //If address not found return 404
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    // Get all id's of address in single array
    const addressId_s = address.map((add) => add.id);

    //Search for properties with addressId
    const property = await client.property.findMany({
      where: {
        addressId: {
          in: addressId_s,
        },
      },
    });
    //If property not found return 404
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
