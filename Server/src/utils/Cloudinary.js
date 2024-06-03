import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../constants.js";

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, path) => {
  if (!localFilePath) {
    throw new Error("Local file path is required");
  }
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: path,
      public_id: `${Date.now()}`,
    });

    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw new Error(error.message);
  }
};

export default uploadOnCloudinary;
