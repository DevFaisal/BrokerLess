import React from "react";
import { Outlet } from "react-router-dom";

function PropertiesWrapper() {
  return (
    <div>
      {/* <nav>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a
                    href="/landlord/properties"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Properties
                  </a>
                  <a
                    href="/landlord/tenants"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Tenants
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav> */}
      <Outlet />
    </div>
  );
}

export default PropertiesWrapper;
