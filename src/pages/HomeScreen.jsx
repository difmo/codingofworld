import React from "react";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Banner from "../components/Banner/Banner";
import Banner2 from "../components/Banner/Banner2";
import Subscribe from "../components/Subscribe/Subscribe";
import Features from "./WhatWeOffer";
import FAQ from "./Faq";
import AdComponent from "./GoogleAdd";



const HomeScreen = () => {
  return (
    <div>
      <Hero />
      <AdComponent/>
       <Services />
      <Banner />
      <Subscribe />
      <Banner2 />
      <Features />
      <FAQ />
      
    </div>
  );
};

export default HomeScreen;
