import jwt from "jsonwebtoken";

export default function Authentication(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
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
