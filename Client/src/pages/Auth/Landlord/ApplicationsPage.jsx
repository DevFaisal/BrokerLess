import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Index";


function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setApplications(response.data);
    };
    fetchApplications();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1>Applications Page</h1>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </main>
  );
}

export default ApplicationsPage;

export function ApplicationCard({ application }) {
  return (
    <div className="w-full flex bg-red-300 items-center gap-1 justify-between ring-1 ring-violet-300 px-5 py-2 my-2 shadow-md rounded-md">
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-bold">{application?.name}</h1>
        <p>{application?.status}</p>
      </div>
      <div className="flex flex-col w-1/2 items-center">
        {application?.agreements?.map((agreement) => (
          <div
            className="flex items-center justify-between w-full p-4 my-2  rounded-md"
            key={agreement.id}
          >
            <div>
              <p>{agreement.tenant.name}</p>
              <p>{agreement.tenant.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <p>{new Date(agreement.startDate).toLocaleDateString()}</p>
                <p>{new Date(agreement.endDate).toLocaleDateString()}</p>
              </div>
              <p>₹{agreement.rent}</p>
              <select className="p-1 h-10 bg-red-100 rounded-md" name="" id="">
                <option value="">{agreement.status}</option>
                <option value="approved">APPROVED</option>
                <option value="rejected">REJECTED</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button>Submit</Button>
      </div>
    </div>
  );
}
