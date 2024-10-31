import React from 'react';

const internships = [
  {
    title: 'Marketing Intern',
    description: 'Join our dynamic marketing team to help promote our latest products. This internship offers hands-on experience in digital marketing strategies and social media management.',
    link: '',
      image: 'https://img.freepik.com/premium-photo/blue-technology-background-abstract-digital-tech-circlecopy-space-isolated-with-white_660230-166389.jpg',
  },
  {
    title: 'Data Analysis Intern',
    description: 'Work with our data analytics team to gather insights and support decision-making processes. This role involves analyzing data trends and preparing reports for stakeholders.',
    link: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaPcs0BFfc4yvzXRgMPeBHO9AHvgS49Qtoqw&s',
  },
  {
    title: 'Product Management Intern',
    description: 'Collaborate with our product management team to assist in developing and launching new products. You’ll gain experience in project management and cross-functional teamwork.',
    link: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7z93pM3W1Qz6vnY1X5DqFsHWAywd2rNPoLQ&s  0',
  },
  {
    title: 'Human Resources Intern',
    description: 'Assist our HR team in various tasks including recruitment, onboarding, and employee engagement initiatives. This is a great opportunity to learn about HR practices in a corporate setting.',
    link: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxV508rIJPKb66gQHUc_QDs-N4y-XjhuuzmQ&s',
  },
  {
    title: 'Finance Intern',
    description: 'Gain experience in financial analysis and reporting by joining our finance team. You will assist in budget preparation and financial forecasting for upcoming projects.',
    link: '',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE0Mnx8ZmluYW5jZSUyMGxhbmd1YWdlfGVufDB8fHx8MTYzNzk5NTI5NA&ixlib=rb-1.2.1&q=80&w=400',
  },
  {
    title: 'MERN Intern',
    description: 'Gain experience in financial analysis and reporting by joining our finance team. You will assist in budget preparation and financial forecasting for upcoming projects.',
    link: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXo9CFWAhcBujk6qgTff4Wb87Ubh0mO91arQ&s',
  },
];


const Internships = () => {
  return (
    <section className=" mx-auto p-6 ">
      <h2 className="text-2xl font-bold text-center">Browse our internships</h2>
      <p className="text-center mb-6 relative  ">The internships below are not exhaustive, and may or may not be currently available, but provide a taste of the various internships Google offers.</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  container    ">
        {internships.map((internship, index) => (
          <div key={index} className="relative flex flex-col justify-evenly border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 group p-9 h-96">
                <h3 className="text-3   xl font-semibold text-center">{internship.title}</h3>
            <a href={internship.link} target="_blank" rel="noopener noreferrer" className="block p-4">
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <img className="w-full h-24 object-cover my-2" src={internship.image} alt={internship.title} loading="lazy" />
              </div>
              <p className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center bg-white z-10 m-5">
                {internship.description}
              </p>
            </a>
            <div className="bg-primary text-center rounded-md p-2">
              <span className="text-white">Learn more</span>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Internships;
