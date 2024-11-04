import React from "react";
import CarouselContent from "../components/Carosoul";
import img from "../assets/images/about.jpg"
import Internships from "../components/Interns";
import { useNavigate } from "react-router-dom";

const InternshipsSection = () => {
    const navigate  = useNavigate();
    return (
        <>
            <section className="pt-4 hero-sub ">
                <div className="container flex flex-col items-center justify-between max-w-screen-xl mx-auto md:flex-row">
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
                    <div className="flex justify-center mt-8 images-wrapper md:w-1/2 md:justify-end md:mt-0">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center justify-center w-64 h-64 overflow-hidden transform -translate-y-16 bg-white rounded-full">
                                    <img
                                        src={img}
                                        alt="Google interns"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                            <img
                                src="https://lh3.googleusercontent.com/S16VBbAJsdSohSo_KfzucG70IGH2qcEt_4MMZLseQQK7bXc2MC6wiJrXXcaMnU7IzCZzFz3seMInrKsR4AsCvRol75jCnsEDbwwKLxzW_1FfHatFnhc=w800"
                                alt="Google interns"
                                className="w-full h-auto mt-8 rounded-lg md:hidden"
                            />
                        </div>
                    </div>
                </div>
            </section>
                <CarouselContent />
                <Internships/>
        </>
    );
};

export default InternshipsSection;
