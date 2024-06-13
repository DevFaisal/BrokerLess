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
    // Check weather if any agreement already exists for the property
    const agreementExists = await prisma.agreement.findFirst({
      where: {
        propertyId: req.body.propertyId,
        User: {
          id: req.user.id,
        },
      },
    });
    if (agreementExists) {
      return res.status(400).json({ message: "Agreement already exists" });
    }

    //Check weather the Agreement is already hold by another tenant for the same period
    const property = await prisma.property.findUnique({
      where: {
        id: req.body.propertyId,
      },
      select: {
        Agreement: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (property.Agreement.length > 0) {
      for (let i = 0; i < property.Agreement.length; i++) {
        if (
          (new Date(req.body.startDate) >=
            new Date(property.Agreement[i].startDate) &&
            new Date(req.body.startDate) <=
              new Date(property.Agreement[i].endDate)) ||
          (new Date(req.body.endDate) >=
            new Date(property.Agreement[i].startDate) &&
            new Date(req.body.endDate) <=
              new Date(property.Agreement[i].endDate))
        ) {
          return res
            .status(400)
            .json({ message: "Property already rented for the given period" });
        }
      }
    }

    const agreement = await prisma.agreement.create({
      data: {
        propertyId: req.body.propertyId,
        tenantId: req.user.id,
        startDate: new Date(req.body.startDate).toISOString(),
        endDate: new Date(req.body.endDate).toISOString(),
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
    const agreements = await prisma.property.findMany({
      where: {
        landlordId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        status: true,
        PropertyAddress: {
          select: {
            city: true,
            state: true,
          },
        },
        Agreement: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            rent: true,
            status: true,
            User: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (agreements.length === 0) {
      return res.status(404).json({ message: "No agreements found" });
    }
    const refinedData = agreements.map((agreement) => {
      return {
        id: agreement.id,
        name: agreement.name,
        status: agreement.status,
        city: agreement.PropertyAddress.city,
        state: agreement.PropertyAddress.state,
        agreements: agreement.Agreement.map((agreement) => {
          return {
            id: agreement.id,
            startDate: agreement.startDate,
            endDate: agreement.endDate,
            rent: agreement.rent,
            status: agreement.status,
            tenant: agreement.User,
          };
        }),
      };
    });
    return res.status(200).json(refinedData);
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
