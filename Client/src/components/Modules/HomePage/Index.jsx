import React from "react";
import { Container } from "../../Index";
import { Link } from "react-router-dom";

function Index() {
  const words = ["Rooms", "Houses", "Apartments", "Offices", "Spaces"];

  const SkeletonOne = () => (
    <div>
      <p classNameName="font-bold text-4xl text-white">Easy Room Renting</p>
      <p classNameName="font-normal text-base my-4 max-w-lg text-neutral-200">
        Renting a room has never been easier. With Brokerless, you can find a
        room that suits your needs and budget without the hassle of brokers.
      </p>
    </div>
  );

  const SkeletonTwo = () => (
    <div>
      <p classNameName="font-bold text-4xl text-white">
        We care about your comfort
      </p>
      <p classNameName="font-normal text-base my-4 max-w-lg text-neutral-200">
        At Brokerless, we care about your comfort. We provide you with the best
        rooms at the best prices. Renting a room has never been easier.
      </p>
    </div>
  );

  const SkeletonThree = () => (
    <div>
      <p classNameName="font-bold text-4xl text-white">No more broker fees</p>
      <p classNameName="font-normal text-base my-4 max-w-lg text-neutral-200">
        With Brokerless, you can rent a room without paying any broker fees.
        Save time and money by renting directly from the owner.
      </p>
    </div>
  );

  const SkeletonFour = () => (
    <div>
      <p classNameName="font-bold text-4xl text-white">
        We provide the best rooms
      </p>
      <p classNameName="font-normal text-base my-4 max-w-lg text-neutral-200">
        At Brokerless, we provide you with the best rooms at the best prices.
        Renting a room has never been easier.
      </p>
    </div>
  );

  const Cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      classNameName: "md:col-span-2",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661754912055-05f3dfa8c48e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      classNameName: "col-span-1",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661510281120-91ed4ae73925?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      content: <SkeletonThree />,
      classNameName: "col-span-1",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661658492194-9f5478a44bb8?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      content: <SkeletonFour />,
      classNameName: "md:col-span-2",
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
    <div className="relative">
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
              Brokerless{" "}
              <span className="text-primary dark:text-white">
                Room Rental Service
              </span>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              Discover Brokerless. Rent rooms broker-free. Save time and money
              with direct owner connections. Rent smarter with Brokerless. We
              provide you with the best rooms at the best prices. Renting a room
              has never been easier.
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                href="#"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <Link to={"/auth/login-user"}>
                  <span className="relative text-base font-semibold text-white">
                    Get started
                  </span>
                </Link>
              </a>
              <a
                href="#"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <Link to={"/about"}>
                  <span className="relative text-base font-semibold text-primary dark:text-white">
                    Learn more
                  </span>
                </Link>
              </a>
            </div>
            <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  The best rooms
                </h6>
                <p className="mt-2 text-gray-500">
                  Get the best rooms at the best prices
                </p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  The most affordable
                </h6>
                <p className="mt-2 text-gray-500">
                  Rent rooms at affordable prices
                </p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  The most convenient
                </h6>
                <p className="mt-2 text-gray-500">Rent rooms conveniently</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Index;

// return (
//   <div classNameName="h-screen bg-background-image-2 bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50">
//     <div classNameName="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:pb-0 pb-52 px-5 md:px-20 pt-20 h-screen w-full">
//       <div classNameName="flex flex-col gap-4 w-fit">
//         <div classNameName="flex flex-col gap-2">
//           <h1 classNameName="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
//             Brokerless
//           </h1>
//           <H3>
//             Rent
//             <span>
//               <FlipWords
//                 words={words}
//                 classNameName="text-2xl md:text-3xl font-semibold text-secondary"
//               />
//             </span>
//           </H3>
//         </div>
//         <p classNameName="text-justify font-semibold md:leading-7 text-xs md:text-lg text-whiteish">
//           Discover Brokerless. Rent rooms broker-free. Save time and money
//           with direct owner connections. Rent smarter with Brokerless.
//         </p>
//         <Link to="/auth/login-user">
//           <ButtonMove
//             borderRadius="1.75rem"
//             classNameName="bg-primary text-white border-neutral-400 text-base font-semibold"
//           >
//             <span>Get Started</span>
//           </ButtonMove>
//         </Link>
//       </div>
//       <div classNameName="hidden 2xl:flex">
//         <img
//           classNameName="object-contain absolute bottom-70 top-10 left-90 right-10 w-[900px] z-20"
//           src={background}
//           alt="Background"
//         />
//       </div>
//     </div>
//     <section classNameName="bg-background-image-2 bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50 h-screen w-full flex flex-col justify-center items-center">
//       <div classNameName="flex flex-col justify-center items-center gap-2 px-10">
//         <h1 classNameName="text-5xl font-bold text-center text-slate-800 my-1">
//           Discover Brokerless
//         </h1>
//       </div>
//       <LayoutGrid cards={Cards} />
//     </section>
//     <section classNameName="bg-background-image-2 bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50 h-screen flex flex-col justify-center items-center overflow-hidden">
//       <div classNameName="h-[40rem] rounded-md flex flex-col antialiased bg-none items-center justify-center relative ">
//         <h1 classNameName="text-5xl font-bold text-center my-4 text-slate-700">
//           Testimonials
//         </h1>
//         <InfiniteMovingCards
//           items={testimonials}
//           direction="right"
//           speed="slow"
//           classNameName="w-full p-10"
//         />
//       </div>
//     </section>
//     <PageFooter />
//   </div>
// );
