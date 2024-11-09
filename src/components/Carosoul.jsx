import React, { useState } from "react";

const CarouselContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //sdsamdw polfz saflpq;wmf x kl
  const slides = [
    {
      src: "https://t4.ftcdn.net/jpg/03/14/81/65/240_F_314816591_yBAWvMvnpTW05AP0q4DCs5B6y2gnL9xA.jpg",
      alt: "Google intern wearing a hat on a hike",
      content: "AI that helps people do what they care about most",
    },
    {
      src: "https://t4.ftcdn.net/jpg/03/23/82/99/240_F_323829966_H32wLhoouiPinJ66KyggCvqQ2dFPuuQ1.jpg",
      alt: "Google intern and her dog",
      content: "A lovely day out with my furry friend!",
    },
    {
      src: "https://t4.ftcdn.net/jpg/03/08/69/75/240_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpghttps://t4.ftcdn.net/jpg/03/08/69/75/240_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg",
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
    <div className="flex flex-col items-center justify-center  my-10 ">
      <div></div>
      <div className="flex w-full max-w-4xl mx-auto">
        <div className="flex-shrink-0 w-1/2 h-64">
          <img
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 h-64 flex items-center justify-center bg-white p-4 shadow-2xl">
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
