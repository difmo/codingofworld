import React, { useState } from "react";

const CarouselContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //sdsamdw polfz saflpq;wmf x kl
  const slides = [
    {
      src: "https://t4.ftcdn.net/jpg/03/14/81/65/240_F_314816591_yBAWvMvnpTW05AP0q4DCs5B6y2gnL9xA.jpg",
      alt: "Google intern wearing a hat on a hike",
      content:
        "Taking a break from coding to conquer the great outdoors! Exploring nature with a Google intern—because sometimes the best ideas come when you're on a hike!",
    },
    {
      src: "https://t4.ftcdn.net/jpg/04/78/95/73/360_F_478957385_zCuEGTXNJKPygVCxmxkY01oV7JFVUFDv.jpg",
      alt: "Google intern and her dog",
      content: "A lovely day out with my furry friend!",
    },
    {
      src: "https://thumbs.dreamstime.com/b/internet-information-technology-businessman-hand-showing-concept-75784736.jpg",
      alt: "Google interns making a G",
      content: "Team spirit is everything!",
    },
  ];

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
    <div className="flex flex-col items-center justify-center p-10">
      <div></div>
      <div className="flex w-full max-w-4xl mx-auto">
        <div className="flex-shrink-0 w-1/2 h-64">
          <img
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 h-64 flex items-center justify-center bg-white p-4 shadow-md">
          <p className="text-lg text-gray-800">
            {slides[currentIndex].content}
          </p>
        </div>
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
