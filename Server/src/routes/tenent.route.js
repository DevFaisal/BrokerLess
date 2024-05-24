import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";
import bcrypt from "bcrypt";

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
        message: "Invalid email or password",
      });
    }
    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

export default router;
