import axios from "axios";
import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import AlertDialog from "../../../components/ui/AlertDialog";

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState(false);

  const DeleteRequest = async ({ id }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_LOCALHOST}/api/agreement/tenant`,
      {
        withCredentials: true,
        data: { id },
      }
    );
    if (response.status === 200) {
      setRequests(requests.filter((request) => request.id !== id));
    }
  };

  useEffect(() => {
    const fetchAllUserRequests = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement/tenant`,
        {
          withCredentials: true,
        }
      );
      setRequests(response.data);
      console.log(response.data);
    };

    fetchAllUserRequests();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-xl font-bold">User Requests</h1>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        {requests?.map((request) => (
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
            onConfirm={() => DeleteRequest({ id: deleteRequest.id })}
            onCancel={() => setDeleteRequest(false)}
          />
        )}
      </div>
    </main>
  );
}

export default UserRequests;

export function RequestCard({ request, onClick }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-md ring-1 ring-gray-300 my-4  w-full flex-1 px-20 text-center">
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-bold">{request?.Property?.name}</h1>
        <p className="text-sm font-light">
          {request?.Property?.PropertyAddress[0]?.city},
          {request?.Property?.PropertyAddress[0]?.state}
        </p>
      </div>
      <div>
        <p
          className={`${request?.status === "PENDING" ? "bg-yellow-500" : ""} 
          ${request?.status === "APPROVED" ? "bg-green-500" : ""}
            ${request?.status === "DECLINED" ? "bg-red-500" : ""}
            rounded-md p-2  font-bold
            `}
        >
          {request?.status}
        </p>
        <p>
          {new Date(request?.startDate).toLocaleDateString()}
          {" to "}
          {new Date(request?.endDate).toLocaleDateString()}
        </p>
      </div>
      <div>
        <button onClick={onClick}>
          <Trash2Icon color="red" />
        </button>
      </div>
    </div>
  );
}
