import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import difmo from './partners/difmo.svg'
import nita from './partners/nita.svg'
import techon from './partners/techon.png'
import saptrishi from './partners/saptrishi.jpg'

const partners = [
  { image: difmo, name: "difmo", link: "https://www.difmo.com" },
  { image: nita, name: "nita", link: "https://nitainfotech.com/" },
  { image: techon, name: "techon", link: "https://www.techonpixel.com/" },
  { image: saptrishi, name: "saptrishi", link: "https://saptrishi.net/" },
];

export default function NewsletterFooter() {
  return (
    <div className="relative -top-20 z-10 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg px-4 md:px-8 py-12 md:py-16 mx-4 md:mx-auto max-w-7xl transition-all duration-300 text-black dark:text-white">
      {/* Heading */}
      <h2 className="text-xl md:text-4xl  font-semibold text-center mb-8 text-primary">
        Out Placement Partner's 
      </h2>

      {/* Swiper Section */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {partners.slice(0, 4).map((partner, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center p-4"
              title={partner.name}
            >
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="h-12 md:h-24 lg:h-28 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
