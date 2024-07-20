import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Import Routes
import userRouter from "./routes/user.route.js";
import landlordRouter from "./routes/landlord.route.js";
import propertyRoute from "./routes/property.route.js";
import agreementRoute from "./routes/agreement.route.js";
import verificationRoute from "./routes/verification.route.js";
import Authentication from "./middlewares/Authentication.js";
import PaymentRoute from "./routes/payment.route.js";

// Routes
app.use("/auth/user", userRouter);
app.use("/auth/landlord", landlordRouter);
app.use("/api/property", propertyRoute);
app.use("/api/agreement", agreementRoute);
app.use("/api/verification", verificationRoute);
app.use("/payment", PaymentRoute);

export { app };
