import { PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";

const client = new PrismaClient();

// ------------------- Property Routes -------------------

const getRecentProperties = async (req, res) => {
  try {
    const properties = await client.property.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        rent: true,
        status: true,
        imageUrl: true,
        landlord: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        PropertyAddress: {
          select: {
            street: true,
            city: true,
            state: true,
            zip: true,
            country: true,
          },
        },
      },
    });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllProperties = async (req, res) => {
  try {
    const properties = await client.property.findMany();
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
    let property = await client.property.findUnique({
      where: {
        id: req.query.id,
      },
      select: {
        name: true,
        description: true,
        imageUrl: true,
        rent: true,
        status: true,
        tenant: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        createdAt: true,
      },
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
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
    const property = await client.property.findMany({
      where: {
        PropertyAddress: {
          some: {
            city: req.query.city,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        rent: true,
        status: true,
        imageUrl: true,
        addressId: true,
        landlordId: true,
        PropertyAddress: {
          select: {
            street: true,
            city: true,
            state: true,
            zip: true,
            country: true,
          },
        },
        landlord: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

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

const getLandlordProperties = async (req, res) => {
  try {
    const properties = await client.property.findMany({
      where: {
        landlordId: req.user.id,
      },
    });
    if (!properties) {
      return res.status(404).json({ message: "Properties not found" });
    }

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProperty = async (req, res) => {
  const result = Validation.propertySchemaValidation(req.body);
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  //Check if Image is uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    //Upload Image on Cloudinary
    const imageUrl = await uploadOnCloudinary(
      req.file.path,
      `Property/${req.user.id}/${Date.now()}`
    );
    if (!imageUrl) {
      return res.status(500).json({ message: "Image Upload Failed" });
    }
    const property = await client.property.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        rent: req.body.rent,
        imageUrl: imageUrl,
        landlord: {
          connect: {
            id: req.user.id,
          },
        },
        PropertyAddress: {
          create: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
          },
        },
      },
    });
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProperty = async (req, res) => {
  const data = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    rent: String(req.body.rent),
  };
  const result = Validation.UpdatePropertySchemaValidation(data);

  if (!result.success) {
    return res.status(400).json({ message: result.error.errors });
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
        id: req.query.id,
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

const getTenantsOfSpecificProperty = async (req, res) => {
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

    return res.status(200).json(tenants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllTenants = async (req, res) => {
  try {
    const tenant = await client.landlord.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        properties: {
          select: {
            id: true,
            Agreement: {
              select: {
                tenantId: true,
              },
            },
          },
        },
        // properties: {
        //   select: {
        //     name: true,
        //     tenant: {
        //       select: {
        //         id: true,
        //         name: true,
        //         email: true,
        //         phone: true,
        //       },
        //     },
        //     Agreement: {
        //       select: {
        //         id: true,
        //         status: true,
        //         startDate: true,
        //         endDate: true,
        //       },
        //     },
        //   },
        // },
      },
    });
    const tenants = await client.user.findMany({
      where: {
        id: tenant.properties.Agreement?.map((agreement) => agreement.tenantId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        Agreement: {
          select: {
            id: true,
            status: true,
            startDate: true,
            endDate: true,
            Property: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!tenants) {
      return res.status(404).json({ message: "No Tenants Found" });
    }

    // const refinedTenants = tenants.properties.filter(
    //   (tenant) => tenant.tenant !== null
    // );
    return res.status(200).json(tenants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ------------------- Tenant Routes -------------------
const getPropertyByIdToTenant = async (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ message: "Property ID is required" });
  }
  try {
    let property = await client.property.findUnique({
      where: {
        id: req.query.id,
      },
      select: {
        name: true,
        description: true,
        imageUrl: true,
        rent: true,
        status: true,
        landlord: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        PropertyAddress: {
          select: {
            street: true,
            city: true,
            state: true,
            zip: true,
            country: true,
          },
        },
      },
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
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
};
