import React from "react";
import Hero from "../components/Hero/Hero";
import Services from '../components/Services/Services'
import Banner from '../components/Banner/Banner'
import Banner2 from '../components/Banner/Banner2'
import Subscribe from '../components/Subscribe/Subscribe'
import ContactUs from "./ContactUs";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const HomeScreen = () => {
  return (
    <div>
        <Hero />
        <Services />
        <Banner />
        <Subscribe />
        <Banner2 />
    </div>
  );
};

export default HomeScreen;
