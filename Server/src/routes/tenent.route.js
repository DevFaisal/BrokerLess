import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const router = Router();
const prisma = new PrismaClient();

const tenantSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),

  phone: z
    .number()
    .refine(
      (phone) => phone.toString().length >= 10 && phone.toString().length <= 10,
      {
        message: "Phone number must be at least 10 digits long",
      }
    ),
});

// POST Tenant Registration API Endpoint
router.post("/register", async (req, res) => {
  const result = tenantSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Check weather the email already exists
    const tenant = await prisma.tenant.findUnique({
      where: {
        email: req.body.email,
      },
    });
    const phone = await prisma.tenant.findUnique({
      where: {
        phone: BigInt(req.body.phone),
      },
    });
    if (phone) {
      return res.status(400).send("Phone already exists");
    }
    if (tenant) {
      return res.status(400).send("Email already exists");
    }
    //Create a new tenant
    const newTenant = await prisma.tenant.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
export default router;
