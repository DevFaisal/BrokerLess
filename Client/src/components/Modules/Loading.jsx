import React from "react";
import { Container } from "../Index";
import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-black">Loading...</p>
        <LoaderCircle size={90} color="black" className="animate-spin" />
      </div>
    </Container>
  );
}

export default Loading;
