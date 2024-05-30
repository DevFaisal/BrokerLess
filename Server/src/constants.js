import dotenv from "dotenv";
dotenv.config();

const RESEND_API_KEY = String(process.env.RESEND_API_KEY);

export { RESEND_API_KEY };
