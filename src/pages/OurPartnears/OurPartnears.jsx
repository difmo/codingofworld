import React from "react";
import SectionTitle from "../Pricing/SectionTitle";
import { motion } from "framer-motion";
import sap from "../../assets/saptrishi.jpg";
const brandsData = [
  {
    id: 1,
    name: "Brand 1",
    href: "https://www.difmo.com/",
    image: "https://www.difmo.com/_next/static/media/blacklogo1.04b5fc10.svg", // Dummy image URL
  },
  {
    id: 2,
    name: "Brand 2",
    href: "https://saptrishi.net/",
    image: sap, // Dummy image URL
  },
  {
    id: 3,
    name: "Brand 3",
    href: "https://www.techonpixel.com/",
    image:
      "https://www.techonpixel.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flight_full_logo.1b318c3c.png&w=1080&q=75 ",
    // Dummy image URL
  },
  {
    id: 4,
    name: "Brand 4",
    href: "https://zonvoir.com/",
    image: "https://zonvoir.com/build/assets/default_dark-6448a0da.svg", // Dummy image URL
  },
];

const Brands = () => {
  return (
    <section className="py-16 pb-24">
      <SectionTitle
  title="Where For Opportunity"
        // paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
        center
      />
      <div className="container mx-auto px-4">
        <div className="mx-auto flex flex-wrap py-4">
          <div className="w-full px-4">
            <motion.div
              className="my-3 gap-7 dark:bg-gray-dark flex flex-wrap items-center justify-center rounded-sm px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
              data-wow-delay=".1s"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SingleBrand = ({ brand }) => {
  const { href, image, name } = brand;

  return (
    <motion.div
      className="flex w-full max-w-[180px] items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10"
      initial={{ opacity: 0, y: 50 }} // Fade in & slide up
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }} // Slight scale on hover
    >
      <a
        href={href}
        className="relative h-full w-full max-w-[160px] transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full bg-cover py-5 bg-gray-600 px-2 rounded-2xl"
          whileHover={{ rotate: 3 }} // Slight tilt on hover
        />
      </a>
    </motion.div>
  );
};

export default Brands;
