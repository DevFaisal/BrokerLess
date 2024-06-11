import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();

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
  //  Here we are checking if the email is valid or not because if the token is expired
  // it sends the server error data which can become true in if-else condition so we are
  //  checking weather it is email type or not
  if (!z.string().email().safeParse(email).success) {
    //   Here i am returning without sending any response because
    //   the error message is already sent in the above code
    return;
  }
  try {
    const response = await prisma.verificationToken.findFirst({
      where: {
        token: verificationToken,
      },
      include: {
        User: true,
        Landlord: true,
      },
    });
    if (!response) {
      return res.status(400).json({
        message: "Invalid Token or Token expired",
      });
    }

    const { User, Landlord } = response;
    const verification = (User || Landlord).isVerified;

    if (verification) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }
    const isVerified = await verifyUser(User, Landlord);
    if (isVerified) {
      return res.status(200).json({
        message: "Email verified successfully",
      });
    } else {
      return res.status(400).json({
        message: "Error verifying email",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyUser = async (User, Landlord) => {
  switch (true) {
    case User !== null:
      const user = await prisma.user.update({
        where: {
          email: User.email,
        },
        data: {
          isVerified: true,
        },
      });
      // Fetch the verification token associated with the user
      const token = await prisma.verificationToken.findMany({
        where: { userId: User.id },
      });
      const delToken = await prisma.verificationToken.delete({
        where: {
          id: token[0].id,
        },
      });
      return true;
    case Landlord !== null:
      const { id } = Landlord;
      const landlord = await prisma.landlord.update({
        where: {
          id,
        },
        data: {
          isVerified: true,
        },
      });
      // Fetch the verification token associated with the landlord
      const tokens = await prisma.verificationToken.findMany({
        where: { landlordId: id },
      });

      const deleteTokens = await prisma.verificationToken.delete({
        where: {
          id: tokens[0].id,
        },
      });

      return true;

    default:
      return false;
  }
};

export { verifyEmail };
