import React from "react";
import { useParams } from "react-router-dom";

const InternshipDetails = () => {
  const { id } = useParams(); // Get the internship id from the URL params

  const internship = internships.find((intern) => intern.id === parseInt(id));

  if (!internship) {
    return <p>Internship not found!</p>; // If internship is not found
  }

  return (
    <div className="p-6 mx-auto max-w-2xl">
      <h2 className="text-4xl font-bold text-center">{internship.title}</h2>
      <img
        src={internship.image}
        alt={internship.title}
        className="my-4 w-full h-64 object-cover rounded-md"
      />
      <p className="text-lg text-gray-700">{internship.description}</p>
      <div className="mt-6 text-center">
        <a
          href={internship.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-white bg-primary rounded-md hover:bg-primary/40"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default InternshipDetails;




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