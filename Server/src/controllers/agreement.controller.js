import { Router } from "express";
import { AgreementStatus, PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";

const route = Router();
const prisma = new PrismaClient();

const generateAgreement = async (req, res) => {
  const sanitizeInput = (input) => {
    return input.replace(/\0/g, "");
  };
  const data = {
    propertyId: sanitizeInput(req.body.propertyId),
    startDate: new Date(sanitizeInput(req.body.startDate)),
    endDate: new Date(sanitizeInput(req.body.endDate)),
    rent: req.body.rent,
  };

  const result = Validation.agreementSchemaValidation(data);
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }

  try {
    const minAgreementPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    if (
      new Date(data.endDate) - new Date(data.startDate) <
      minAgreementPeriod
    ) {
      return res
        .status(400)
        .json({ message: "Minimum Agreement period should be 30 days" });
    }

    const existingAgreements = await prisma.agreement.findFirst({
      where: {
        propertyId: req.body.propertyId,
        User: {
          id: req.user.id,
        },
      },
    });
    if (existingAgreements) {
      return res.status(400).json({ message: "Agreement already exists" });
    }

    const newAgreement = await prisma.agreement.create({
      data: {
        propertyId: req.body.propertyId,
        tenantId: req.user.id,
        startDate: req.body.startDate, //TODO: Change to Date
        endDate: req.body.endDate, //TODO: Change to Date
        rent: req.body.rent,
        status: "PENDING",
      },
    });

    res.status(200).json(newAgreement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTenantAgreement = async (req, res) => {
  try {
    const agreement = await prisma.agreement.findMany({
      where: {
        tenantId: req.user.id,
      },
      select: {
        id: true,
        propertyId: true,
        startDate: true,
        endDate: true,
        rent: true,
        status: true,
        Property: {
          select: {
            name: true,
            PropertyAddress: {
              select: {
                city: true,
                state: true,
              },
            },
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!agreement) {
      return res.status(404).json({ message: "No agreement found" });
    }
    return res.status(200).json(agreement);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAgreement = async (req, res) => {
  try {
    const agreement = await prisma.agreement.findFirst({
      where: {
        tenantId: req.user.id,
        id: req.body.id,
      },
    });
    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }
    await prisma.agreement.delete({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json({ message: "Agreement deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAgreements = async (req, res) => {
  try {
    const property = await prisma.property.findMany({
      where: {
        AND: [
          {
            landlordId: req.user.id,
          },
          {
            Agreement: {
              some: {
                status: "PENDING",
              },
            },
          },
        ],
      },
    });
    const agreements = await prisma.agreement.findMany({
      where: {
        propertyId: {
          in: property.map((property) => property.id),
        },
        status: "PENDING",
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        rent: true,
        status: true,
        User: {
          select: {
            name: true,
            phone: true,
          },
        },
        Property: {
          select: {
            name: true,
          },
        },
      },
    });
    if (agreements.length === 0) {
      return res.status(204).json({ message: "No agreements found" });
    }

    return res.status(200).json(agreements);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAgreementDate = async (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ message: "Property ID is required" });
  }
  try {
    const agreements = await prisma.agreement.findMany({
      where: {
        propertyId: req.query.id,
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });
    if (agreements.length === 0) {
      return res.status(404).json({ message: "No agreement found" });
    }

    return res.status(200).json(agreements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const approveAgreement = async (req, res) => {
  console.log(req.query);
  if (!req.query.applicationId) {
    return res.status(400).json({ message: "Application ID is required" });
  }
  try {
    const agreement = await prisma.agreement.findUnique({
      where: {
        id: req.query.applicationId,
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
    const updatedAgreement = await prisma.agreement.update({
      where: {
        id: req.query.applicationId,
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
        tenant: {
          connect: {
            id: agreement.tenantId,
          },
        },
      },
    });
    return res.status(200).json({ message: "Agreement approved" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  generateAgreement,
  getAgreements,
  approveAgreement,
  getTenantAgreement,
  deleteAgreement,
  getAgreementDate,
};
