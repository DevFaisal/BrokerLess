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
      },
    });
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
