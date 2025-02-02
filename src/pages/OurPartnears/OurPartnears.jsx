import React from "react";
import SectionTitle from "../Pricing/SectionTitle";

const brandsData = [
  {
    id: 1,
    name: "Brand 1",
    href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s", // Dummy image URL
  },
  {
    id: 2,
    name: "Brand 2",
    href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s",  // Dummy image URL
  },
  {
    id: 3,
    name: "Brand 3",
    href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s",  // Dummy image URL
  },
  {
    id: 4,
    name: "Brand 4",
    href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s",  // Dummy image URL
  },
];

const Brands = () => {
  return (
    <section className="py-16 pb-24">
      <SectionTitle
          title="What Our Users Say"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />
      <div className="container border">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp bg-gray-light dark:bg-gray-dark flex flex-wrap items-center justify-center rounded-sm px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
              data-wow-delay=".1s"
            >
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SingleBrand = ({ brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="mx-3 flex w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-10 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <img
          src={image}
          alt={name}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
        />
      </a>
    </div>
  );
};

export default Brands;
