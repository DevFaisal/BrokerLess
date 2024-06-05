import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

const registerLandlord = async (req, res) => {
  //Validate the request body
  const result = Validation.landlordRegistration(req.body);
  console.log(req.body);
  //Check if the request body is valid
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Check weather the email or phone number already exists
    const landlord = await prisma.landlord.findFirst({
      where: {
        OR: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    if (landlord) {
      return res.status(400).json({
        message: "Email or phone number already exists",
      });
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new landlord
    const newLandlord = await prisma.landlord.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: BigInt(req.body.phone),
        Landlordaddress: {
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

    return res.status(201).json({
      message: "Landlord created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginLandlord = async (req, res) => {
  //Validate the request body
  const result = Validation.landlordLogin(req.body);
  //Check if the request body is valid
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Check if the landlord exists
    const landlord = await prisma.landlord.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!landlord) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    //Check if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      landlord.password
    );
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    //Create a token
    const token = jwt.sign(
      { id: landlord.id, email: landlord.email },
      process.env.JWT_SECRET
    );

    res.header("Authorization", "Bearer " + token);

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLandlordProfile = async (req, res) => {
  try {
    let landlord = await prisma.landlord.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        Landlordaddress: true,
      },
    });
    landlord = {
      name: landlord.name,
      email: landlord.email,
      phone: landlord.phone.toString(),
      address: landlord.Landlordaddress.map((address) => {
        return {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country,
        };
      }),
    };
    return res.status(200).json(landlord);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerLandlord, loginLandlord, getLandlordProfile };
