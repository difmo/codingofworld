import React from "react";
import { useNavigate } from "react-router-dom";

const internships = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Join our dynamic marketing team to help promote our latest products. This internship offers hands-on experience in digital marketing strategies and social media management.",
    link: "Mern Stack",
    image:
      "https://img.freepik.com/premium-photo/blue-technology-background-abstract-digital-tech-circlecopy-space-isolated-with-white_660230-166389.jpg",
  },
  {
    id: 2,
    title: "Java Development",
    description:
      "Work with our data analytics team to gather insights and support decision-making processes. This role involves analyzing data trends and preparing reports for stakeholders.",
    link: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaPcs0BFfc4yvzXRgMPeBHO9AHvgS49Qtoqw&s",
  },
  {
    id: 3,
    title: "Flutter Development",
    description:
      "Collaborate with our product management team to assist in developing and launching new products. You’ll gain experience in project management and cross-functional teamwork.",
    link: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7z93pM3W1Qz6vnY1X5DqFsHWAywd2rNPoLQ&s  0",
  },
  {
    id: 4,
    title: "Python Development",
    description:
      "Assist our HR team in various tasks including recruitment, onboarding, and employee engagement initiatives. This is a great opportunity to learn about HR practices in a corporate setting.",
    link: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxV508rIJPKb66gQHUc_QDs-N4y-XjhuuzmQ&s",
  },
  {
    id: 5,
    title: "Php Development",
    description:
      "Gain experience in financial analysis and reporting by joining our finance team. You will assist in budget preparation and financial forecasting for upcoming projects.",
    link: "",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE0Mnx8ZmluYW5jZSUyMGxhbmd1YWdlfGVufDB8fHx8MTYzNzk5NTI5NA&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 6,
    title: "Android Development",
    description:
      "Gain experience in financial analysis and reporting by joining our finance team. You will assist in budget preparation and financial forecasting for upcoming projects.",
    link: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXo9CFWAhcBujk6qgTff4Wb87Ubh0mO91arQ&s",
  },
];

const Internships = () => {
  const navigate = useNavigate(); 

  return (
    <section className="p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center">Our internships</h2>
      <p className="relative mb-6 text-center">
        The internships below are not exhaustive, and may or may not be
        currently available, but provide a taste of the various internships
        Coding of world offers.
      </p>

      <ul className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {internships.map((internship) => (
          <li
            key={internship.id}
            className="relative cursor-pointer flex flex-col p-10 overflow-hidden transition-transform transform rounded-lg shadow-lg justify-evenly hover:scale-105 group bg-gradient-to-r from-primary/30 to-white"

            onClick={() => navigate(`/internship/${internship.id}`)}
          >
            <h3 className="text-2xl  text-black bg-white text-center">{internship.title}</h3>
            <div className="transition-opacity duration-300">
              <img
                className="object-cover w-full my-2 h-28"
                src={internship.image}
                alt={internship.title}
                loading="lazy"
              />
            </div>
            <p className="absolute inset-0 z-10 flex items-center justify-center m-5 text-center transition-opacity duration-300 bg-white opacity-0">
              {internship.description}
            </p>
            <div
              className="p-2 text-center rounded-md bg-primary/70 cursor-pointer"
             
            >
              <span className="text-white">Learn more</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Internships;
