import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validation from "../utils/Validation.js";
import verificationEmail from "../utils/verificationEmail.js";
import z from "zod";
import resetPasswordEmail from "../utils/resetPasswordEmail.js";

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  //Validate the request body
  const result = Validation.UserRegistration(req.body);
  //Check if the request body is valid
  if (!result.success) {
    return res
      .status(400)
      .json({ message: result.error.errors.map((error) => error.message) });
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
        phone: req.body.phone,
        isVerified: false, // Change this to false to enable email verification
        verificationToken: {
          create: {
            token: verificationToken,
          },
        },
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
        verificationToken: {
          create: {
            token: verificationToken,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  //Validate the request body
  const result = Validation.UserLogin(req.body);
  //Check if the request body is valid
  if (!result.success) {
    console.log(result.error.errors);
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("Authentication");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
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

    // Generate a verification token that expires in 5 minutes
    const verificationToken = jwt.sign(
      {
        exp: Math.floor((Date.now() + 5 * 60000) / 1000), // Token expires in 5 minutes
        email: email,
      },
      process.env.JWT_SECRET
    );

    // Send the reset password email
    const mail = await resetPasswordEmail(email, verificationToken, user.name);
    if (mail.error) {
      return res.status(500).json({
        message: "Error sending email: " + mail.error.message,
      });
    }

    // Update the user's verification token in the database
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verificationToken: {
          create: {
            token: verificationToken,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkVerificationToken = async (req, res) => {
  const { verificationToken } = req.params;
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
      select: {
        email: true,
        verificationToken: {
          select: {
            token: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const length = user.verificationToken.length;
    const validToken =
      user.verificationToken[length - 1].token == verificationToken;

    if (!validToken) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }
    return res.status(200).json({
      message: "Token is valid",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { verificationToken, password } = req.body;
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
      select: {
        email: true,
        verificationToken: {
          select: {
            token: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validToken =
      user.verificationToken[user.verificationToken.length - 1].token ===
      verificationToken;

    if (!validToken) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
        verificationToken: {
          deleteMany: {
            token: verificationToken,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
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
        isVerified: true,
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
    prisma.userAddress
      .deleteMany({})
      .then(async () => {
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
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ message: "Error while updating" });
      });

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
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
  resendVerificationEmail,
  forgetPassword,
  resetPassword,
  checkVerificationToken,
};
