import React from "react";
import CarouselContent from "../components/Carosoul";
import img from "../assets/images/about.jpg";
import Internships from "../components/Interns";
import { useNavigate } from "react-router-dom";

const InternshipsSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <CarouselContent /> */}
      <Internships />
    </>
  );
};

export default InternshipsSection;
