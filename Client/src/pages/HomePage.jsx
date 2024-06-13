import React from "react";
import Button from "../components/Buttons/Button";
import background from "../assets/Images/background-1.png";
import { Link } from "react-router-dom";
import { FlipWords } from "../utils/flip-words";
import H1 from "../components/Inputs/H1";
import H3 from "../components/Inputs/H3";
import { Container, H2, PageFooter } from "../components/Index";
import { LayoutGrid } from "../utils/layout-grid";
import { TextGenerateEffect } from "../utils/text-generate-effect";
import { InfiniteMovingCards } from "../utils/infinite-moving-cards";

function HomePage() {
  const words = ["Rooms", "Houses", "Apartments", "Offices", "Spaces"];
  const SkeletonOne = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">Easy Room Renting</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Renting a room has never been easier. With Brokerless, you can find a
          room that suits your needs and budget without the hassle of brokers.
        </p>
      </div>
    );
  };

  const SkeletonTwo = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">
          We care about your comfort
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          At Brokerless, we care about your comfort. We provide you with the
          best rooms at the best prices. Renting a room has never been easier.
        </p>
      </div>
    );
  };
  const SkeletonThree = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">No more broker fees</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          With Brokerless, you can rent a room without paying any broker fees.
          Save time and money by renting directly from the owner.
        </p>
      </div>
    );
  };
  const SkeletonFour = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">
          We provide the best rooms
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          At Brokerless, we provide you with the best rooms at the best prices.
          Renting a room has never been easier.
        </p>
      </div>
    );
  };

  const Cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: "md:col-span-2",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661754912055-05f3dfa8c48e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: "col-span-1",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661510281120-91ed4ae73925?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: "col-span-1",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661658492194-9f5478a44bb8?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: "md:col-span-2",
      thumbnail:
        "https://images.unsplash.com/photo-1508330570239-ce7cabceee22?q=80&w=3393&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const testimonials = [
    {
      quote:
        "With Brokerless, you can rent a room without paying any broker fees. Save time and money by renting directly from the owner.",
      title: "Creator of Brokerless",
      name: "Faisal Farooq",
    },
    {
      quote:
        "Renting a room has never been easier. With Brokerless, you can find a room that suits your needs and budget without the hassle of brokers.",
      title: "Brokerless",
      name: "Team Brokerless",
    },
    {
      quote: "Renting a room has never been easier.",
      name: "Brokerless",
      title: "Team Brokerless",
    },
    {
      quote:
        "Customer satisfaction is our top priority. We provide you with the best rooms at the best prices. Renting a room has never been easier.",
      name: "Brokerless",
      title: "Team Brokerless",
    },
    {
      quote:
        "With Brokerless, you can rent a room without paying any broker fees. Save time and money by renting directly from the owner.",
      name: "Brokerless",
      title: "Team Brokerless",
    },
  ];

  const word = `With Brokerless, you can rent a room without paying any broker fees. Save time and money by renting directly from the owner Discover Brokerless. Rent rooms broker-free. Save time and money with direct owner connections. Rent smarter with Brokerless Renting a room has never been easier. With Brokerless, you can find a room that suits your needs and budget without the hassle of brokers`;

  return (
    <div
    className="h-screen"
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-10 items-center px-5 md:px-20 pt-20 h-screen w-full">
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
      <div className="flex flex-col justify-center items-center gap-2 px-10">
        <h1 className="text-5xl font-bold text-center text-slate-800 my-1">
          Discover Brokerless
        </h1>
      </div>
      <LayoutGrid cards={Cards} />
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
        <h1 className="text-5xl font-bold text-center my-4 text-slate-700 ">
          Testimonials
        </h1>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>

      <PageFooter />
    </div>
  );
}

export default HomePage;
