import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Loading } from "../../../components/Index";
import { useRecoilStateLoadable } from "recoil";
import { fetchApplications } from "../../../store/LandLordAtom";
import ContentError from "../../../components/Modules/ContentError";
import { LoaderCircle, School } from "lucide-react";
import Header from "../../../components/Modules/Header";
import toast from "react-hot-toast";

function ApplicationsPage() {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] =
    useRecoilStateLoadable(fetchApplications());

  if (applications.state === "loading") {
    return <Loading />;
  }

  if (applications.state === "hasError") {
    return (
      <ContentError
        heading={"Error"}
        message={"An error occurred while fetching applications"}
      />
    );
  }

  if (applications.state === "hasValue") {
    if (applications.contents.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-black">
            No Applications Found
          </h1>
        </div>
      );
    }

    const ProcessApplication = (applicationId) => async () => {
      setLoading(true);
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_LOCALHOST}/api/agreement/process?applicationId=${applicationId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        toast.success("Application Processed successfully");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error approving application", error);
      }
    };

    return (
      <main className="w-full p-2">
        <Header name="Applications" />
        <div className="w-full h-screen gap-2 p-4 flex flex-col items-center justify-start overflow-scroll">
          {applications.contents?.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onApprove={ProcessApplication(application.id)}
              loading={loading}
              status={application.status}
            />
          ))}
        </div>
      </main>
    );
  }
}
export default ApplicationsPage;

export function ApplicationCard({ application, onApprove, loading, status }) {
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement/download/${application.id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Verification_documents.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Documents downloaded successfully");
    } catch (error) {
      console.error("Error downloading documents:", error);
      toast.error("An error occurred while downloading documents");
    }
  };

  const startDateFormatted = new Date(
    application.startDate
  ).toLocaleDateString();
  const endDateFormatted = new Date(application.endDate).toLocaleDateString();
  const daysDifference =
    (new Date(application.endDate) - new Date(application.startDate)) /
    (1000 * 60 * 60 * 24);

  return (
    <div className="flex h-20 w-full justify-between items-center ring-1 ring-violet-200 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-20">
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-bold text-black">
          {application.User.name}
        </h1>
        <p className="text-sm text-gray-400">{application.User.phone}</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm text-slate-700">
          Start Date {startDateFormatted}
        </p>
        <p className="text-sm text-slate-700">End Date {endDateFormatted}</p>
        <p className="text-xs text-slate-700">{daysDifference} Days</p>
      </div>
      <div className="flex gap-1 items-center">
        <School className="w-6 h-6" />
        <p>{application.Property.name}</p>
        <p>Rent ₹{application.rent}</p>
      </div>
      <div>
        <Button onClick={handleDownload}>Download</Button>
      </div>
      <div>
        <Button
          className={"flex justify-center w-full mt-5 "}
          type="submit"
          disabled={loading}
          onClick={onApprove}
        >
          {loading ? (
            <LoaderCircle size={20} className="text-white animate-spin" />
          ) : (
            "Proceed"
          )}
        </Button>
      </div>
      <div>
        <h1 className="text-lg font-bold text-black">{status}</h1>
      </div>
    </div>
  );
}
