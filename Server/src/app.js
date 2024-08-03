import express, { query } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middlewares
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

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;

          if (paymentIntent.status === "succeeded") {
            // Update your database with the payment information
            const customer = await stripe.customers.retrieve(
              paymentIntent.customer
            );

            const payment = {
              id: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
              customer: customer.metadata,
            };
            updateDB(payment);
          } else {
            console.log(`Payment intent failed: ${paymentIntent.status}`);
          }
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.send();
    } catch (error) {
      console.error(`Webhook error: ${error.message}`);
      res.status(400).send(`Webhook error: ${error.message}`);
    }
  }
);

const prisma = new PrismaClient();

async function updateDB(payment) {
  try {
    const agreement = await prisma.agreement.findUnique({
      where: {
        id: payment.customer.requestId,
      },
    });
    if (!agreement) {
      console.log("Agreement not found");
      return null;
    }

    const db = await prisma.payment.create({
      data: {
        id: payment.id,
        amount: payment.amount,
        status: "PAID",
        Agreement: {
          connect: {
            id: agreement.id,
          },
        },
        user: {
          connect: {
            id: payment.customer.userId,
          },
        },
        paymentId: payment.id,
      },
    });

    const landlord = await prisma.landlord.findUnique({
      where: {
        id: payment.customer.userId,
      },
      select: {
        id: true,
      },
    });

    const updatedAgreement = await prisma.agreement.update({
      where: {
        id: payment.customer.requestId,
      },
      data: {
        status: "APPROVED",
      },
    });
    await prisma.property.update({
      where: {
        id: agreement.propertyId,
      },
      data: {
        status: "RENTED",
        tenant: {
          connect: {
            id: agreement.tenantId,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error updating database:", error);
  }
}

app.use(express.json());

// Routes
app.use("/auth/user", userRouter);
app.use("/auth/landlord", landlordRouter);
app.use("/api/property", propertyRoute);
app.use("/api/agreement", agreementRoute);
app.use("/api/verification", verificationRoute);
app.use("/payment", PaymentRoute);

export { app };
