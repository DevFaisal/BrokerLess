import React from "react";
import { Container, PageFooter } from "../components/Index";
import { Link } from "react-router-dom";

function ServicesPage() {
  const services = [
    {
      title: "Property Listings",
      description:
        "Find the perfect property with our extensive listings. We provide detailed information to help you make the best choice.",
      image:
        "https://www.mckissock.com/wp-content/uploads/2018/11/blog-image-real-estate-listing-descriptions.jpg",
    },
    {
      title: "Tenant Screening",
      description:
        "Our comprehensive tenant screening process ensures you find reliable and trustworthy tenants for your property.",
      image:
        "https://integrity-asia.com/wp-content/uploads/tenant-screening.jpg",
    },
    {
      title: "Rental Management",
      description:
        "We offer rental management services to help you handle day-to-day tasks, ensuring a smooth rental experience.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh5O_tbNmKVKtG-aNfuwB65uJW_jx0XLWkqA&s",
    },
  ];

  return (
    <>
      <Container>
        <section className="py-16 px-6 mx-auto max-w-screen-xl text-center">
          <h1 className="mb-12 text-4xl font-extrabold tracking-tight text-gray-900  md:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mb-16 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">
            We offer a range of services to make the rental process easy and
            efficient for both landlords and tenants. Explore our services to
            see how we can help you.
          </p>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="max-w-sm mx-auto bg-white rounded-lg shadow-lg "
              >
                <img
                  className="w-full h-48 rounded-t-lg"
                  src={service.image}
                  alt={service.title}
                />
                <div className="p-6">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    {service.title}
                  </h2>
                  <p className="text-gray-700 ">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 ">
          <div className="px-6 mx-auto max-w-screen-xl text-center lg:px-8">
            <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900  md:text-5xl lg:text-5xl">
              Ready to get started?
            </h2>
            <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl ">
              Join us today and experience the benefits of our comprehensive
              rental services.
            </p>
            <Link
              to="/auth/login-user"
              className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
            >
              Get Started
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
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}

export default ServicesPage;
