import Container from "../components/Container";
import React from "react";
import Button from "../components/Buttons/Button";
import background from "../assets/Images/background-1.png";
import { Link } from "react-router-dom";
import { FlipWords } from "../utils/flip-words";
import H1 from "../components/Inputs/H1";
import H3 from "../components/Inputs/H3";

function HomePage() {
  const words = ["Rooms", "Houses", "Apartments", "Offices", "Spaces"];
  return (
    <Container>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-5 md:px-20 py-20 h-screen w-full">
          <div className="flex flex-col gap-4  w-fit">
            <div className="flex flex-col gap-2 ">
              <H1 className="z-20">Brokerless</H1>
              <H3>
                Rent
                <span>
                  <FlipWords
                    words={words}
                    className="text-2xl md:text-3xl font-semibold text-secondary"
                  />
                </span>
              </H3>
            </div>
            <p className="text-justify font-semibold md:leading-7 text-xs md:text-lg text-primary">
              Discover Brokerless. Rent rooms broker-free. Save time and money
              with direct owner connections. Rent smarter with Brokerless
            </p>
            <Button
              className={
                "w-30 md:w-40 md:px-2 md:py-3  bg-primary  text-white  hover:bg-secondary transition duration-700 ease-in-out hover:scale-110 transform"
              }
            >
              <Link to="/auth/login-user">Get Started</Link>
            </Button>
          </div>
          <div className="hidden 2xl:flex ">
            <img
              className="object-contain absolute  bottom-70 top-10 left-90 right-10 w-[900px] z-20"
              src={background}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
