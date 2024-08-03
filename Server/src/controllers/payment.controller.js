import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { item } = req.body;
    console.log(item);

    // Find or create a customer
    let customerId;
    const customers = await stripe.customers.list({
      email: item.email,
      limit: 1,
    });
    if (customers.data.length > 0) {
      await stripe.customers.del(customers.data[0].id);
    }
    const newCustomer = await stripe.customers.create({
      email: item.email,
      metadata: {
        name: item.name,
        email: item.email,
        userId: item.userId,
        requestId: item.requestId,
      },
    });
    customerId = newCustomer.id;
    console.log("New customer created:", newCustomer);

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.propertyName,
              images: [item.image],
            },
            unit_amount: Math.round(item.rent * 100),
          },
          quantity: 1,
        },
      ],
      customer: customerId,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      success_url: "http://localhost:5173/user/payment-success",
      cancel_url: "http://localhost:5173/user/payment-failed",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ message: "Failed to create payment intent" });
  }
};

export { createPaymentIntent };
