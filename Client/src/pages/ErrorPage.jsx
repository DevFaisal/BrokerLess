import React from "react";
import Container from "../components/Container";
import image from "../assets/404.png";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <Container>
      <div className="container mx-auto lg:px-8 h-screen flex flex-col justify-center items-center">
        <img src={image} width={600} />
        <p>
          Go back to{" "}
          <Link className="text-success font-bold" to="/">
            Home
          </Link>
        </p>
      </div>
    </Container>
  );
}

export default ErrorPage;
