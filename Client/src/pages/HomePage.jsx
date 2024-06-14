import React from "react";
import Button from "../components/Buttons/Button";
import background from "../assets/Images/backgroundNew.png";
import { Link } from "react-router-dom";
import { FlipWords } from "../utils/flip-words";
import H1 from "../components/Inputs/H1";
import H3 from "../components/Inputs/H3";
import { Container, H2, Loading, PageFooter } from "../components/Index";
import { LayoutGrid } from "../utils/layout-grid";
import { TextGenerateEffect } from "../utils/text-generate-effect";
import { InfiniteMovingCards } from "../utils/infinite-moving-cards";
import { ButtonMove } from "../utils/moving-border";

function HomePage() {
  const words = ["Rooms", "Houses", "Apartments", "Offices", "Spaces"];

  const SkeletonOne = () => (
    <div>
      <p className="font-bold text-4xl text-white">Easy Room Renting</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Renting a room has never been easier. With Brokerless, you can find a
        room that suits your needs and budget without the hassle of brokers.
      </p>
    </div>
  );

  const SkeletonTwo = () => (
    <div>
      <p className="font-bold text-4xl text-white">
        We care about your comfort
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        At Brokerless, we care about your comfort. We provide you with the best
        rooms at the best prices. Renting a room has never been easier.
      </p>
    </div>
  );

  const SkeletonThree = () => (
    <div>
      <p className="font-bold text-4xl text-white">No more broker fees</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        With Brokerless, you can rent a room without paying any broker fees.
        Save time and money by renting directly from the owner.
      </p>
    </div>
  );

  const SkeletonFour = () => (
    <div>
      <p className="font-bold text-4xl text-white">We provide the best rooms</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        At Brokerless, we provide you with the best rooms at the best prices.
        Renting a room has never been easier.
      </p>
    </div>
  );

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
      name: "Brokerless Admin",
      title: "Team Brokerless",
    },
    {
      quote:
        "Customer satisfaction is our top priority. We provide you with the best rooms at the best prices. Renting a room has never been easier.",
      name: "Brokerless User",
      title: "Team Brokerless",
    },
    {
      quote:
        "With Brokerless, you can rent a room without paying any broker fees. Save time and money by renting directly from the owner.",
      name: "Brokerless New User",
      title: "Team Brokerless",
    },
  ];

  return (
    <div className="h-screen bg-background-image-2 bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:pb-0 pb-52 px-5 md:px-20 pt-20 h-screen w-full">
        <div className="flex flex-col gap-4 w-fit">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
              Brokerless
            </h1>
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
          <p className="text-justify font-semibold md:leading-7 text-xs md:text-lg text-whiteish">
            Discover Brokerless. Rent rooms broker-free. Save time and money
            with direct owner connections. Rent smarter with Brokerless.
          </p>
          <Link to="/auth/login-user">
            <ButtonMove
              borderRadius="1.75rem"
              className="bg-primary text-white border-neutral-400 text-base font-semibold"
            >
              <span>Get Started</span>
            </ButtonMove>
          </Link>
        </div>
        <div className="hidden 2xl:flex">
          <img
            className="object-contain absolute bottom-70 top-10 left-90 right-10 w-[900px] z-20"
            src={background}
            alt="Background"
          />
        </div>
      </div>
      <section className="bg-background-image-2 bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50 h-screen w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 px-10">
          <h1 className="text-5xl font-bold text-center text-slate-800 my-1">
            Discover Brokerless
          </h1>
        </div>

        <LayoutGrid cards={Cards} />
      </section>
      <section className="bg-background-image-2 bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50 h-screen w-full flex flex-col justify-center items-center">
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-none items-center justify-center relative overflow-hidden">
          <h1 className="text-5xl font-bold text-center my-4 text-slate-700">
            Testimonials
          </h1>
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            className="w-full p-10"
          />
        </div>
      </section>
      <PageFooter />
    </div>
  );
}

export default HomePage;
