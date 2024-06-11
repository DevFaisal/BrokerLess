import React, { useEffect, useState } from "react";
import { Container } from "../../Index";
import { BookUser, School } from "lucide-react";
import axios from "axios";

function Tenants() {
  const [tenants, setTenants] = useState([
    {
      name: "",
    },
    {
      name: "",
      email: "",
      phone: "",
    },
  ]);

  useEffect(() => {
    const getAllTenants = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/property/tenants`,
        {
          withCredentials: true,
        }
      );
      setTenants(response.data);
    };
    getAllTenants();
  }, []);
  console.log(tenants);
  return (
    <>
      {tenants.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-black">No Tenant Found</h1>
        </div>
      ) : (
        <div className="w-full p-2">
          <div className="flex  my-2  p-4 rounded-md ring-1 ring-violet-100">
            <BookUser className="w-6 h-6 inline-block" />
            <h1 className=" font-bold text-black ml-2">Tenants</h1>
          </div>
          <div className="flex flex-col gap-2 w-full h-screen p-4 overflow-y-scroll">
            {tenants.map((tenant, index) => (
              <TenantCard key={index} tenant={tenant} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default Tenants;

export function TenantCard({ tenant }) {
  return (
    <main className="flex h-20 flex-row justify-between items-center ring-1 ring-violet-200 bg-white p-4 rounded-lg shadow-lg">
      <div>
        <h1 className="text-l font-bold text-black">{tenant.tenant?.name}</h1>
        <p className="text-sm text-gray-400">{tenant.tenant?.email}</p>
        <p className="text-sm text-gray-400">{tenant.tenant?.phone}</p>
      </div>

      <div className="flex w-1/2 justify-evenly items-center">
        <div>
          <School size={30} color="green" className="inline-block" />
          <span className="text-md text-green-800 font-bold pl-3">
            {tenant?.name}
          </span>
        </div>
      </div>
    </main>
  );
}
