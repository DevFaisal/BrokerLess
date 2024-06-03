import dotenv from "dotenv";
dotenv.config();

const RESEND_API_KEY = String(process.env.RESEND_API_KEY);
const CLOUDINARY_CLOUD_NAME = String(process.env.CLOUDINARY_CLOUD_NAME);
const CLOUDINARY_API_KEY = String(process.env.CLOUDINARY_API_KEY);
const CLOUDINARY_API_SECRET = String(process.env.CLOUDINARY_API_SECRET);
const CLOUDNARY_API_ENV = String(process.env.CLOUDNARY_API_ENV);

export {
  RESEND_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDNARY_API_ENV,
};
