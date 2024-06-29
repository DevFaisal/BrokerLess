import React from "react";
import Index from "../components/Modules/HomePage/Index";
import Features from "../components/Modules/HomePage/Features";
import Testimonials from "../components/Modules/HomePage/Testimonials";
import CallToAction from "../components/Modules/HomePage/CallToAction";

function HomePage() {
  return (
    <main class="space-y-40 mb-40">
      <Index />
      <Features />
      <Testimonials />
      <CallToAction />
    </main>
  );
}

export default HomePage;
