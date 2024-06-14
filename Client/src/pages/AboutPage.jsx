import React from "react";
import { Container, PageFooter } from "../components/Index";

function AboutPage() {
  return (
    <>
      <Container>
        <section className="py-16 px-6 mx-auto max-w-screen-xl lg:px-8">
          <div className="gap-16 items-center lg:grid lg:grid-cols-2">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                About Us
              </h2>
              <p className="mb-6 leading-relaxed">
                Brokerless is a room rental platform that connects landlords and
                tenants directly. We are a team of experienced professionals
                dedicated to providing a seamless and efficient rental
                experience for both landlords and tenants.
              </p>
              <p className="leading-relaxed">
                We are committed to providing a platform that is easy to use and
                understand. Our goal is to make the rental process as simple and
                transparent as possible. We believe that by connecting landlords
                and tenants directly, we can create a more efficient and
                cost-effective rental experience for everyone involved.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-0">
              <img
                className="w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="Office content 1"
              />
              <img
                className="mt-6 w-full lg:mt-12 rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="Office content 2"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="py-16 px-6 mx-auto max-w-screen-xl text-center lg:px-8">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
              We are here to find the best solutions for you
            </h1>
            <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400 leading-relaxed">
              Brokerless's mission is to provide a seamless and efficient rental
              experience for both landlords and tenants. We are committed to
              providing a platform that is easy to use and understand. Our goal
              is to make the rental process as simple and transparent as
              possible.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <a
                href="#"
                className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Get started
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="py-3 px-6 sm:ml-4 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>
      </Container>
      <PageFooter />
    </>
  );
}

export default AboutPage;
