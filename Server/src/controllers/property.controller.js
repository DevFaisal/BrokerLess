import { PrismaClient } from "@prisma/client";
import Validation from "../utils/validation.js";

const client = new PrismaClient();

// ------------------- Property Routes -------------------
const getAllProperties = async (req, res) => {
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
};

const getPropertyById = async (req, res) => {
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
};

const searchProperty = async (req, res) => {
  if (!req.query.city) {
    return res.status(400).json({ message: "Address is required" });
  }
  try {
    //Search for address in propertyAddress table
    const address = await client.propertyAddress.findMany({
      where: {
        city: req.query.city,
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
};

// ------------------- Landlord Routes -------------------
const createProperty = async (req, res) => {
  console.log(req.body);
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
        // status: req.body.status,
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
};

const updateProperty = async (req, res) => {
  const result = Validation.UpdatePropertySchemaValidation(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid Input" });
  }
  try {
    const property = await client.property.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        rent: req.body.rent,
      },
    });
    if (!property) {
      return res.status(401).json({ message: "Invalid Property" });
    }
    return res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await client.property.delete({
      where: {
        id: req.body.id,
      },
    });

    if (!deletedProperty) {
      return res.status(400).json({ message: "Invalid Property" });
    }
    res.status(201).json({ message: "Property Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTenants = async (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ message: "Property ID is required" });
  }
  try {
    const property = await client.property.findUnique({
      where: {
        id: String(req.query.id),
        status: "RENTED",
      },
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    let tenants = await client.user.findMany({
      where: {
        Agreement: {
          some: {
            propertyId: property.id,
            status: "APPROVED",
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
    if (!tenants) {
      return res.status(404).json({ message: "No Tenants Found" });
    }
    tenants = tenants.map((tenant) => {
      return {
        ...tenant,
        phone: String(tenant.phone),
      };
    });

    return res.status(200).json(tenants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getAllProperties,
  getPropertyById,
  searchProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getTenants,
};
