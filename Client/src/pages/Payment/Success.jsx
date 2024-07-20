import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Success = () => {
  useEffect(() => {
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 2000);
    const checkPayment = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_LOCALHOST + "/webhook"
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-white w-1/2 text-center p-8">
        <div className="flex items-center justify-center rounded-full p-4">
          <CheckCircle color="green" size={70} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg">
          Thank you for your payment! Your order has been successfully
          processed.
        </p>
      </div>
    </div>
  );
};

export default Success;
