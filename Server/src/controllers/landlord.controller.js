import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import Validation from "../utils/Validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import VerificationEmail from "../utils/verificationEmail.js";
import cookieParser from "cookie-parser";

const router = Router();
const prisma = new PrismaClient();

const registerLandlord = async (req, res) => {
  //Validate the request body
  const result = Validation.landlordRegistration(req.body);
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
    // Generate a random 6 digit number
    const verificationToken = jwt.sign(
      {
        exp: Math.floor((Date.now() + 5 * 60000) / 1000), // Verification token expires in 5 minutes
        email: req.body.email,
      },
      process.env.JWT_SECRET
    );

    // const mail = await VerificationEmail(
    //   req.body.email,
    //   verificationToken,
    //   "Landlord " + req.body.name
    // );
    // if (mail.error) {
    //   return res.status(500).json({
    //     message: "error: " + mail.error.message,
    //   });
    // }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new landlord
    const newLandlord = await prisma.landlord.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        isVerified: true, //Change this to false to enable email verification
        Landlordaddress: {
          create: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
          },
        },
        verificationToken: {
          create: {
            token: verificationToken,
          },
        },
      },
    });
    if (!newLandlord) {
      return res.status(500).json({
        message: "Failed to create landlord",
      });
    }

    return res.status(201).json({
      message: "Landlord created successfully. Please verify your email",
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
    const landlord = await prisma.landlord.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!landlord) {
      return res.status(400).json({
        message: "Landlord not found",
      });
    }
    //Check if the landlord has verified their email
    if (!landlord.isVerified) {
      return res.status(400).json({
        message: "Email not verified",
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
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   maxAge: 3600000,
    // };

    // res.cookie("Authentication", `Bearer ${token}`, cookieOptions);
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
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
        properties: {
          include: {
            Agreement: true,
          },
        },
      },
    });
    landlord = {
      name: landlord.name,
      email: landlord.email,
      phone: landlord.phone.toString(),
      isVerified: landlord.isVerified,
      address: landlord.Landlordaddress.map((address) => {
        return {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country,
        };
      }),
      agreement: landlord.properties
        .map((property) => {
          return {
            agreement: property.Agreement.filter((agreement) => {
              return agreement.status === "PENDING";
            }).length,
          };
        })
        .reduce((acc, curr) => {
          return acc + curr.agreement;
        }, 0),
      properties: landlord.properties.map((property) => {}).length,
    };
    return res.status(200).json(landlord);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateLandlordProfile = async (req, res) => {
  //Validate the request body
  const result = Validation.landlordUpdate(req.body);

  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Update the landlord
    const updatedLandlord = await prisma.landlord.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: req.body.name,
        phone: req.body.phone,
        // Landlordaddress: {
        //   update: {
        //     street: req.body.street,
        //     city: req.body.city,
        //     state: req.body.state,
        //     zip: req.body.zip,
        //     country: req.body.country,
        //   },
        // },
      },
    });
    if (!updatedLandlord) {
      return res.status(500).json({
        message: "Failed to update landlord",
      });
    }
    return res.status(200).json({
      message: "Landlord updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout landlord
const logoutLandlord = async (req, res) => {
  try {
    res.clearCookie("Authentication");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  registerLandlord,
  loginLandlord,
  getLandlordProfile,
  logoutLandlord,
  updateLandlordProfile,
};
