import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Tenant = () => {
  const [applicant, setApplicant] = useState({});
  const { tenantId } = useParams();

  useEffect(() => {
    const getTenant = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/api/agreement/tenant/${tenantId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApplicant(response.data);
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };
    getTenant();
  }, [tenantId]);

  const payment = applicant?.Agreement?.map((agreement) =>
    agreement.Payment?.map((payment) => payment.amount)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-400">Tenant Details</h1>
      <h2 className="text-2xl font-bold text-black">Mr {applicant?.name}</h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Property</th>
            <th className="px-4 py-2 border">Rent</th>
            <th className="px-4 py-2 border">Paid</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
          </tr>
        </thead>
        <tbody>
          {applicant?.Agreement?.map((agreement, index) => (
            <tr className="text-center">
              <td className="px-4 py-2 border">{agreement?.Property?.name}</td>
              <td className="px-4 py-2 border">₹{agreement?.rent}</td>
              <td className="px-4 py-2 border">
                ₹
                {agreement.Payment?.map((payment) => payment.amount)
                  .join(", ")
                  .slice(0, -2)}
              </td>
              <td className="px-4 py-2 border">
                {new Date(agreement.startDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                {new Date(agreement.endDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col justify-center items-center mt-4">
        <h2 className="text-2xl font-bold text-black">Payment History</h2>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Payment ID</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicant?.Agreement?.map((agreement, index) =>
              agreement.Payment?.map((payment, index) => (
                <tr className="text-center" key={index}>
                  <td className="px-4 py-2 border">{payment.paymentId}</td>
                  <td className="px-4 py-2 border">
                    ₹{payment.amount.toString().slice(0, -2)}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border font-bold">
                    {payment.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <span class="font-bold text-lg text-gray-900">
          Property:{" "}
          {applicant?.Agreement?.map(
            (agreement) => agreement?.Property?.name
          ).join(", ")}{" "}
          has a total rent of ₹
          {applicant?.Agreement?.map((agreement) => agreement?.rent).reduce(
            (a, b) => a + b,
            0
          )}{" "}
          and the tenant has paid ₹{payment?.toString().slice(0, -2)}
          till now.
        </span>
      </div>
    </div>
  );
};

export default Tenant;
