import express from "express";
import userRouter from "./routes/user.route.js";
import landlordRouter from "./routes/landlord.route.js";
import propertyRoute from "./routes/property.route.js";
import cookieParser from "cookie-parser";
import agreementRoute from "./routes/agreement.route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth/user", userRouter);
app.use("/auth/landlord", landlordRouter);
app.use("/api/property", propertyRoute);
app.use("/api/agreement", agreementRoute);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
