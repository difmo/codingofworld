import React from "react";
import CarouselContent from "../components/Carosoul";
import img from "../assets/images/about.jpg"
import Internships from "../components/Interns";
import { useNavigate } from "react-router-dom";

const InternshipsSection = () => {
    const navigate  = useNavigate();
    return (
        <>
            <section className="hero-sub pt-40 ">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between max-w-screen-xl">
                    {/* Text Content */}
                    <div className="hero-text-wrapper md:w-1/2">
                        <h2 className="hero-title text-3xl font-bold mb-4">Internships</h2>
                        <div className="text-wrapper">
                            <p className="hero-text text-lg mb-2">
                                Internships in business, engineering, technology, and more
                            </p>
                            <p className="hero-subtext text-md mb-4">
                                You can explore all open internships on the Google Careers site.
                            </p>
                          <button onClick={()=> navigate("/internshipform")} className="bg-primary py-2 px-4 hover:bg-primary/60 transition-all duration-300 rounded-xl text-white"> FILL THE FORM </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="images-wrapper md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
                        <div className="relative">
                            <div className="absolute inset-0 flex justify-center items-center">
                                <div className="bg-white rounded-full w-64 h-64 flex justify-center items-center overflow-hidden transform -translate-y-16">
                                    <img
                                        src={img}
                                        alt="Google interns"
                                        className="w-full h-full object-cover"
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
