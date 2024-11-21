import React from "react";
import CarouselContent from "../components/Carosoul";
import img from "../assets/images/about.jpg"
import Internships from "../components/Interns";
import { useNavigate } from "react-router-dom";

const InternshipsSection = () => {
    const navigate  = useNavigate();
    return (
        <>
            <section className="pt-4 m-3 hero-sub  ">
                <div className="container border p-10 flex flex-col items-center justify-between max-w-screen-xl mx-auto md:flex-row">
                    {/* Text Content */}
                    <div className="hero-text-wrapper md:w-1/2">
                        <h2 className="mb-4 text-3xl font-bold hero-title">Internships</h2>
                        <div className="text-wrapper">
                            <p className="mb-2 text-lg hero-text">
                                Internships in business, engineering, technology, and more
                            </p>
                            <p className="mb-4 hero-subtext text-md">
                                You can explore all open internships on the Google Careers site.
                            </p>
                          <button onClick={()=> navigate("/internshipform")} className="px-4 py-2 text-white transition-all duration-300 bg-primary hover:bg-primary/60 rounded-xl"> FILL THE FORM </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    
                </div>
            </section>
                <CarouselContent />
                <Internships/>
        </>
    );
};

export default InternshipsSection;
