import { XCircle } from "lucide-react";
import React from "react";

const Failure = () => {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-white w-1/2 text-center p-8">
        <div className="flex items-center justify-center rounded-full p-4">
          <XCircle color="red" size={70} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Failed!</h1>
        <p className="text-lg">
          Sorry, your payment has been declined. Please try again or contact our
          support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default Failure;
