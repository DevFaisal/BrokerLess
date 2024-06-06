import jwt from "jsonwebtoken";

export default function Authentication(req, res, next) {
  if (!req.cookies.Authentication) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }

  const token = req.cookies.Authentication.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    req.user = decoded;
    next();
  });
}
