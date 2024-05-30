import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validation from "../utils/Validation.js";
import verificationEmail from "../utils/verificationEmail.js";
import z from "zod";

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  //Validate the request body
  const result = Validation.UserRegistration(req.body);
  //Check if the request body is valid
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Check weather the email or phone number already exists
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    if (user) {
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

    const mail = await verificationEmail(
      req.body.email,
      verificationToken,
      req.body.name
    );
    if (mail.error) {
      return res.status(500).json({
        message: "error: " + mail.error.message,
      });
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: BigInt(req.body.phone),
        verificationToken: verificationToken,
      },
    });

    return res.status(201).json({
      message: "User registered successfully and verification email sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.query;
  const email = jwt.verify(
    verificationToken,
    process.env.JWT_SECRET,
    (error, decoded) => {
      if (error) {
        return res.status(400).json({
          message: "Invalid Token or Token expired",
        });
      }
      if (decoded) {
        return decoded.email;
      }
    }
  );
  /* Here we are checking if the email is valid or not because if the token is expired
  it sends the server error data which can become true in if-else condition so we are
  checking weather it is email type or not */
  if (!z.string().email().safeParse(email).success) {
    // Here i am returning without sending any response because
    //the error message is already sent in the above code
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        isVerified: true,
        verificationToken: "",
      },
    });
    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }
    const verificationToken = jwt.sign(
      {
        exp: Math.floor((Date.now() + 5 * 60000) / 1000), // Verification token expires in 5 minutes
        email: email,
      },
      process.env.JWT_SECRET
    );

    const mail = await verificationEmail(email, verificationToken, user.name);
    if (mail.error) {
      return res.status(500).json({
        message: "error: " + mail.error.message,
      });
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verificationToken: verificationToken,
      },
    });

    return res.status(200).json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  //Validate the request body
  const result = Validation.UserLogin(req.body);
  //Check if the request body is valid
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    //Check if the User exists
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    //Check if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    //Check if the email is verified
    if (!user.isVerified) {
      return res.status(400).json({
        message: "Email not verified",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.header("Authentication", `Bearer ${token}`);

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const logoutUser = async (req, res) => {
  try {
    res.header("Authentication", "");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const userProfile = async (req, res) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        UserAddress: {
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

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user = {
      ...user,
      phone: user.phone.toString(),
    };

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const updateUserProfile = async (req, res) => {
  const result = Validation.UserProfile(req.body);
  if (!result.success) {
    return res
      .status(400)
      .send(result.error.errors?.map((error) => error.message));
  }
  try {
    await prisma.userAddress.create({
      data: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        User: {
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
};

const refreshToken = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.header("Authentication", `Bearer ${token}`);
    return res.status(200).json({
      message: "Token refreshed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
  refreshToken,
  verifyEmail,
  resendVerificationEmail,
};
