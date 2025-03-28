import React, { useEffect, useState } from "react";
import img from "../assets/image/d2.png";
import img1 from "../assets/image/d5.png";
import img7 from "../assets/image/l3.png";
import img8 from "../assets/image/l6.png";
import img9 from "../assets/image/l7.png";
import img2 from "../assets/image/d.jpg";
import img3 from "../assets/image/e.jpg";
import img4 from "../assets/image/f.jpg";
import img5 from "../assets/image/p2.png";
import img6 from "../assets/image/r.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3); // Default to 3 slides for larger screens

  // Dummy data
  const testimonials = [
    { id: 1, name: "img1", img: img6 },
    { id: 2, name: "img2", img: img2 },
    { id: 3, name: "img3", img: img },
    { id: 5, name: "img5", img: img1 },
    { id: 6, name: "img6", img: img2 },
    { id: 4, name: "img4", img: img3 },
    { id: 7, name: "img7", img: img4 },
    { id: 8, name: "img8", img: img5 },
  ];

  // Autoplay effect
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 3000);

    return () => clearInterval(autoplayInterval); // Cleanup the interval
  }, [isTransitioning]);

  // Adjust slidesPerView based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1); // Show 1 image at a time on mobile
      } else {
        setSlidesPerView(3); // Show 3 images at a time on larger screens
      }
    };

    updateSlidesPerView(); // Set initial slidesPerView
    window.addEventListener("resize", updateSlidesPerView); // Listen for resize events

    return () => window.removeEventListener("resize", updateSlidesPerView); // Clean up on unmount
  }, []);

  // Go to previous slide
  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - slidesPerView : prevIndex - 1
    );
  };

  // Go to next slide
  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - slidesPerView ? 0 : prevIndex + 1
    );
  };

  // Handle transition end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div>
      <section className="py-12  dark:bg-dark transition-all duration-700">
        <div className=" justify-center">
          <h1 className="text-5xl flex justify-center py-10 text-primary">
            Our Certification
          </h1>

          <div className="flex justify-center">
            <img
              src="src/assets/image/3.png"
              className="h-1/2 w-1/2  bg-cover"
            />
          </div>
        </div>

        <h className="flex justify-center  text-primary text-5xl py-8 font-bold">
          Gallery
        </h>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
            <div className="w-full">
              <div className="swiper overflow-hidden relative">
                <div
                  className="swiper-wrapper flex transition-transform ease-in-out"
                  style={{
                    transform: `translateX(-${
                      (currentIndex * 100) / slidesPerView
                    }%)`,
                    transition: "transform 1s ease-in-out",
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {testimonials.map((testimonia, index) => (
                    <div
                      key={index}
                      className={`swiper-slide flex-none w-full ${
                        slidesPerView === 1 ? "p-4" : "lg:w-1/3 p-6"
                      }`}
                    >
                      <div className="group max-sm:max-w-sm max-sm:mx-auto transition-all duration-1000 ">
                        <div>
                          <img
                            src={testimonia.img}
                            alt={testimonia.name}
                            className=" bg-cover h-60"
                            layout="responsive"
                            // width={400}
                            // height={300}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continuous scrolling arrows */}
                <button
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full"
                  onClick={goToPrevious}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full"
                  onClick={goToNext}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhotoGallery;
