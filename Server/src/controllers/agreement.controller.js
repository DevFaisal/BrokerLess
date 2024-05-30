import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";

const route = Router();
const prisma = new PrismaClient();

const generateAgreement = async (req, res) => {
  const result = Validation.agreementSchemaValidation(req.body);
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    const agreement = await client.agreement.create({
      data: {
        propertyId: req.body.propertyId,
        tenantId: req.user.id,
        startDate: req.body.startDate, //TODO: Change to Date
        endDate: req.body.endDate, //TODO: Change to Date
        rent: req.body.rent,
        status: "PENDING",
      },
    });
    res.status(200).json(agreement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAgreements = async (req, res) => {
  try {
    const agreements = await prisma.property.findMany({
      where: {
        landlordId: req.user.id,
      },
      select: {
        Agreement: true,
      },
    });
    if (agreements.length === 0) {
      return res.status(404).json({ message: "No agreements found" });
    }
    return res.status(200).json(agreements);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const approveAgreement = async (req, res) => {
  try {
    const agreement = await prisma.agreement.findUnique({
      where: {
        id: req.body.id,
      },
    });
    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }
    const landlord = await prisma.landlord.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
      },
    });

    if (landlord.id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await prisma.agreement.update({
      where: {
        id: req.body.id,
      },
      data: {
        status: "APPROVED",
      },
    });
    await prisma.property.update({
      where: {
        id: agreement.propertyId,
      },
      data: {
        status: "RENTED",
      },
    });
    return res.status(200).json({ message: "Agreement approved" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

export { generateAgreement, getAgreements, approveAgreement };
