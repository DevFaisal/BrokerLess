import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { item } = req.body;

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
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      success_url: "http://localhost:5173/user/payment-success",
      cancel_url: "http://localhost:5173/user/payment-failed",
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create payment intent" });
  }
};

export { createPaymentIntent };
