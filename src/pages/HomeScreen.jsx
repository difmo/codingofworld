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
import TrainingSection from "../components/Training Programs/TrainingTypeSection";
import TrainingPrograms from "../components/Training Programs/TrainingPrograms";
import FactsSection from "../components/Statistics/FactsSection";
import ShowLatestBanner from "../popupfeature/ShowPopupBanner";
import PhotoGallery from "../components/PhotoGallery";

const HomeScreen = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Banner />
      <Subscribe />
      <Banner2 />
      <Features />
      <Pricing />
      <TrainingSection />
      <TrainingPrograms />
      <PhotoGallery />
      <Testimonials />
      <FAQ />
      <Brands />
      <FactsSection />
      <ShowLatestBanner />
    </div>
  );
};

export default HomeScreen;
