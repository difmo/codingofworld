import React from "react";

// Training program data in JSON format
const trainingPrograms = [
  {
    id: 1,
    name: "Summer Training",
    icon: "fa-arrow-up-short-wide",
  },
  {
    id: 2,
    name: "Apprenticeship Program",
    icon: "fa-arrow-up-short-wide",
  },
  {
    id: 3,
    name: "Winter Training",
    icon: "fa-arrow-up-short-wide",
  },
  {
    id: 4,
    name: "Industrial Training",
    icon: "fa-arrow-up-short-wide",
  },
  {
    id: 5,
    name: "Corporate Training",
    icon: "fa-arrow-up-short-wide",
  },
  {
    id: 6,
    name: "Faculty Development Program",
    icon: "fa-arrow-up-short-wide",
  },
  {
    id: 7,
    name: "Vocational Training",
    icon: "fa-arrow-up-short-wide",
  },
  {
    id: 8,
    name: "Syllabus Training",
    icon: "fa-arrow-up-short-wide",
  },
];

const TrainingSection = () => {
  return (
    <section className="container-fluid bg-white dark:bg-dark transition-all duration-700 ease-in-out newSection bg-gray-100 py-10">
      <div className="text-center mb-8">
        <h3 className="sectionTitle text-4xl font-semibold text-gray-800 dark:text-white">
          <span className="themeText text-primary">Training</span> at Coding of World
        </h3>
        <p className="sectionContent text-lg text-gray-600">
          Join as learners, leave as experts.
        </p>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Loop through the trainingPrograms array */}
          {trainingPrograms.map((program) => (
            <div
              key={program.id}
              className="text-center bg-white dark:bg-dark dark:border  shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <h5 className="text-xl dark:text-white font-semibold text-gray-800">
                {program.name}{" "}
                <i className={`fa-solid ${program.icon}`}></i>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
