import axios from "axios";
import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AlertDialog, Loading } from "../../../components/Index";
import { useRecoilStateLoadable } from "recoil";
import { fetchAllUserRequests } from "../../../store/UserAtom";
import ContentError from "../../../components/Modules/ContentError";
import { deleteAgreement } from "../../../api/PropertyApi";

function UserRequests() {
  const [requests, setRequests] = useRecoilStateLoadable(
    fetchAllUserRequests()
  );
  const [deleteRequest, setDeleteRequest] = useState(false);

  const DeleteRequest = async (id) => {
    return deleteAgreement(id).then((response) => {
      window.location.href = "/user/requests";
      if (response.status === 200) {
        setRequests(requests.filter((request) => request.id !== id));
      }
    });
  };

  useEffect(() => {
    if (deleteRequest) {
      DeleteRequest(deleteRequest.id);
      setDeleteRequest(false);
    }
  }, [deleteRequest]);

  if (requests.state === "loading") return <Loading />;
  else if (requests.state === "hasError")
    return (
      <ContentError
        heading={"Error Fetching User Requests"}
        message={"Please try again later"}
      />
    );
  else if (requests.state === "hasValue" && requests.contents.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-xl py-2 mt-4 font-bold">User Requests</h1>
        <div className="w-full flex flex-col items-center justify-center mt-10">
          <p className="text-lg font-light">No Requests Found</p>
        </div>
      </main>
    );
  } else if (requests.state === "hasValue") {
    console.log(requests.contents);
    return (
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-xl py-2 mt-4 font-bold">User Requests</h1>
        <div className="w-full flex flex-col items-center justify-center mt-10">
          {requests.contents?.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onClick={() => setDeleteRequest({ id: request.id })}
            />
          ))}
          {deleteRequest && (
            <AlertDialog
              title={"Delete Request"}
              message={"Are you sure you want to delete this request?"}
              onConfirm={() => DeleteRequest(deleteRequest.id)}
              onCancel={() => setDeleteRequest(false)}
            />
          )}
        </div>
      </main>
    );
  }
}

export default UserRequests;

import { loadStripe } from "@stripe/stripe-js";
export function RequestCard({ request, onClick }) {
  let stripe = null;
  const handlePayment = async (id) => {
    if (!stripe) {
      stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    }
    const item = {
      email: request.User.email,
      userId: request.User.id,
      requestId: request.id,
      Tenant: request.User.name,
      propertyName: request.Property.name,
      rent: request.rent,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const response = await fetch(import.meta.env.VITE_LOCALHOST + "/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ item }),
    });
    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
  };
  return (
    <div className="flex items-center justify-between p-4 rounded-md ring-1 ring-gray-300 my-4 w-full flex-1 px-20 text-center">
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-bold">{request?.Property?.name}</h1>
        <p className="text-sm font-light">
          {request?.Property?.PropertyAddress[0]?.city},
          {request?.Property?.PropertyAddress[0]?.state}
        </p>
      </div>
      <div>
        <p>
          {request?.status == "PAYMENT" ? (
            <>
              <p className="text-sm font-light">
                Your request has been approved, please click to pay the rent
              </p>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                onClick={() => handlePayment(request.id)}
              >
                <p>Pay ₹{request?.rent}</p>
              </button>
            </>
          ) : (
            request?.status
          )}
        </p>

        <p>
          {new Date(request?.startDate).toLocaleDateString()}
          {" to "}
          {new Date(request?.endDate).toLocaleDateString()}
        </p>
      </div>

      {request?.status == "APPROVED" ? null : (
        <button onClick={onClick}>
          <Trash2Icon color="red" />
        </button>
      )}
    </div>
  );
}
