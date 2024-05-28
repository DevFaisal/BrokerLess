import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import Routes
import userRouter from "./routes/user.route.js";
import landlordRouter from "./routes/landlord.route.js";
import propertyRoute from "./routes/property.route.js";
import cookieParser from "cookie-parser";
import agreementRoute from "./routes/agreement.route.js";

// Routes 
app.use("/auth/user", userRouter);
app.use("/auth/landlord", landlordRouter);
app.use("/api/property", propertyRoute);
app.use("/api/agreement", agreementRoute);

export { app };
