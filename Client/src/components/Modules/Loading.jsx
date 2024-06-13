import React from "react";
import { Container } from "../Index";
import { LoaderCircle } from "lucide-react";
import logo from "../../assets/logos/logo.svg";

function Loading() {
  return (
    <main>
      <div
        className="fixed top-0 left-0 w-full h-1 
        bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300
        ring-1 ring-blue-500 z-50 flex justify-center items-center
      animate-pulse
      "
      />
      <div className="flex justify-center items-start mt-96 h-screen">
        <LoaderCircle className="text-blue-500 w-96 h-20 animate-spin" />
      </div>
    </main>
  );
}

export default Loading;
