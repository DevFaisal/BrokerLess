import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default function isValidLandlord(req, res, next) {
  if (!req.cookies.Authentication) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  const token = req.cookies.Authentication.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    req.user = decoded;
    try {
      const landlord = await prisma.landlord.findUnique({
        where: {
          id: req.user.id,
        },
      });
      if (!landlord) {
        return res.status(401).json({
          message: "Unauthorized Access Not a Valid Landlord",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
}
