import React from "react";
// import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Banner from "../components/Banner/Banner";
import Banner2 from "../components/Banner/Banner2";
import Subscribe from "../components/Subscribe/Subscribe";
import Features from "./WhatWeOffer";
import FAQ from "./Faq";
import AdComponent from "./GoogleAdd";
import TimerButton from "../components/TimerButton";
import Pricing from "./Pricing";
import Video from "./VideoPage/Video";
import Testimonials from "./Testimonials/Testimonials";
import Brands from "./OurPartnears/OurPartnears";
import Hero from "../components/Hero/Hero";

const HomeScreen = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Banner />
{/* 
      <div>
        <iframe
          src="http://localhost:3001"  // URL of the Course Project
          width="100%"
          height="600px"
          title="Course Component"
          style={{ border: "none" }}
        />
      </div> */}

      <Subscribe />
      <Banner2 />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Brands />
    </div>
  );
};

export default HomeScreen;
