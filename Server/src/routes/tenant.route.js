import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Authentication from "../middlewares/Authentication.js";

const router = Router();
const prisma = new PrismaClient();

// POST Tenant Registration API Endpoint
router.post("/register", async (req, res) => {
  //Validate the request body
  const result = Validation.tenantRegistration(req.body);
  //Check if the request body is valid
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Check weather the email or phone number already exists
    const tenant = await prisma.tenant.findFirst({
      where: {
        OR: [{ email: req.body.email }, { phone: BigInt(req.body.phone) }],
      },
    });
    if (tenant) {
      return res.status(400).json({
        message: "Email or phone number already exists",
      });
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new tenant
    const newTenant = await prisma.tenant.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: BigInt(req.body.phone),
      },
    });

    return res.status(201).json({
      message: "Tenant created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});
// POST Tenant Login API Endpoint
router.post("/login", async (req, res) => {
  //Validate the request body
  const result = Validation.tenantLogin(req.body);
  //Check if the request body is valid
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Check if the tenant exists
    const tenant = await prisma.tenant.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!tenant) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    //Check if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      tenant.password
    );
    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }
    const token = jwt.sign({ id: tenant.id }, process.env.JWT_SECRET);

    res.header("Authentication", `Bearer ${token}`);

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

// POST Tenant Logout API Endpoint
router.post("/logout", Authentication, async (req, res) => {
  try {
    res.header("Authentication", "");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

// GET Tenant Profile API Endpoint
router.get("/profile", Authentication, async (req, res) => {
  try {
    let tenant = await prisma.tenant.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: {
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

    tenant = {
      ...tenant,
      phone: tenant.phone.toString(),
    };

    return res.status(200).json(tenant);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

//UPDATE Tenant Profile API Endpoint
router.put("/profile", Authentication, async (req, res) => {
  const result = Validation.tenantProfile(req.body);
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    await prisma.address.create({
      data: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        Tenant: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

//GET Refresh Token API Endpoint
router.get("/refresh-token", Authentication, async (req, res) => {
  try {
    const token = jwt.sign({ id: req.tenant.id }, process.env.JWT_SECRET);
    res.header("Authentication", `Bearer ${token}`);
    return res.status(200).json({
      message: "Token refreshed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

export default router;
