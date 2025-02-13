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
      {/* <Hero /> */}
      <Hero />
      {/* <AdComponent /> */}
      <Services />
      <Banner />
      <Subscribe />
      {/* 
      Completed trainig students show here 
      */}
      <Banner2 />
      <Features />
      <Pricing />
      {/* <Video/> */}
      <Testimonials />
      <FAQ />
      <Brands />
    </div>
  );
};

export default HomeScreen;
