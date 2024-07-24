import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilStateLoadable } from "recoil";
import { toast } from "react-hot-toast";
import {
  GetAgreementDate,
  GetPropertyInfo,
} from "../../../../store/PropertyAtom";
import { generateAgreement } from "../../../../api/PropertyApi";
import { Loading, ContentError } from "../../../../components/Index";
import PropertyDetails from "./PropertyDetails";
import AddressDetails from "./AddressDetails";
import RentRequestForm from "./RentRequestForm";

function PropertyInfo() {
  const { propertyId } = useParams();
  const [agreementDate, setAgreementDate] = useRecoilStateLoadable(
    GetAgreementDate(propertyId)
  );
  const [property, setProperty] = useRecoilStateLoadable(
    GetPropertyInfo(propertyId)
  );

  useEffect(() => {
    // Fetch necessary data when propertyId changes
  }, [propertyId]);

  const handleRentRequest = async (data) => {
    try {
      const days =
        (new Date(data.endDate) - new Date(data.startDate)) /
        (1000 * 60 * 60 * 24);

      const calculatedRent = CalculateRent(days, property.contents.rent);

      const newFormData = new FormData();
      newFormData.append("propertyId", propertyId);
      newFormData.append("startDate", new Date(data.startDate));
      newFormData.append("endDate", new Date(data.endDate));
      newFormData.append("rent", parseInt(calculatedRent));
      newFormData.append("aadharCard", data.aadharCard[0]);
      newFormData.append("panCard", data.panCard[0]);

      const response = await generateAgreement(newFormData);

      if (response.status === 200) {
        toast.success("Agreement Request Sent Successfully");
        window.location.href = "/user/requests";
      } else {
        toast.error(response.response?.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (property.state === "loading") {
    return <Loading />;
  } else if (property.state === "hasError") {
    return (
      <ContentError
        heading="Error"
        message="An error occurred while fetching property"
      />
    );
  } else if (property.state === "hasValue" && property.contents == undefined) {
    return (
      <ContentError
        heading="Error"
        message="No property found with the given ID"
      />
    );
  } else if (property.state === "hasValue") {
    return (
      <main className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <PropertyDetails property={property} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <AddressDetails addresses={property.contents?.PropertyAddress} />
            <RentRequestForm
              property={property}
              agreementDate={agreementDate}
              onSubmit={handleRentRequest}
            />
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h1 className="text-xl font-semibold text-gray-900 mb-4">Note</h1>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Minimum Agreement Period:</strong> 30 days
                </li>
                <li>
                  <strong>Maximum Agreement Period:</strong> 1 year
                </li>
                <li>
                  <strong>Payment:</strong> Rent will be calculated on a monthly
                  basis
                </li>
                <li>
                  <strong>Security Deposit:</strong> 1 month's rent
                </li>
                <li>
                  <strong>Agreement:</strong> Agreement will be generated after
                  the request is accepted
                </li>
                <li>
                  <strong>Uploads:</strong> Upload your Aadhar Card & PAN Card
                  for verification purposes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default PropertyInfo;

export function CalculateRent(days, rent) {
  const rentOfDay = parseInt(rent) / 30;
  return rentOfDay * days;
}
