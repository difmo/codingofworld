import React, { useEffect, useState } from "react";
import slid1 from "../assets/intershipSlider/1.png";
import slid2 from "../assets/intershipSlider/2.png";
import slid3 from "../assets/intershipSlider/3.png";

const CarouselContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      src: slid1,
      alt: "Google intern wearing a hat on a hike",
      content:
        "Master the fundamentals of coding with hands-on training. Learn from industry professionals and start building your tech career!",
    },
    {
      src: slid2,
      alt: "Google intern and her dog",
      content:
        "Gain real-world experience in full-stack development through our immersive coding bootcamps. Get ready for a high-demand career in tech!",
    },
    {
      src: slid3,
      alt: "Google interns making a G",
      content:
        " Join our interactive workshops and become proficient in the latest web technologies like React, Node.js, and more!",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      handlePrev();
    }, 2000); // 2000 ms = 2 seconds

    return () => clearInterval(intervalId);
  }, []); // Empty array means this effect runs only once when the component mounts

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : slides.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < slides.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 ">
      <div className="flex-col flex md:flex-row w-full max-w-4xl mx-auto">
        <div className="flex-shrink-0 w-full h-auto">
          <img
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            className="object-cover bg-cover w-full h-300px"
          />
        </div>
      </div>
      <div className=" w-full  flex items-center justify-center bg-white p-4 ">
        <p className="text-lg text-gray-800">{slides[currentIndex].content}</p>
      </div>
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              currentIndex === index ? "bg-primary" : "bg-gray-400"
            } hover:bg-gray-500`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselContent;
