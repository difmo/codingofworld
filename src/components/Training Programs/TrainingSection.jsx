import React from "react";

const TrainingSection = () => {
  return (
    <section className="container-fluid newSection bg-gray-100 py-10">
      <div className="text-center mb-8">
        <h3 className="sectionTitle text-4xl font-semibold text-gray-800">
          <span className="themeText text-primary">Training</span> at Coding of World
        </h3>
        <p className="sectionContent text-lg text-gray-600">
          Enter as trainees, exit as professionals.
        </p>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Summer Training */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Summer Training <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>

          {/* Apprenticeship Program */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Apprenticeship Program <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>

          {/* Winter Training */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Winter Training <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>

          {/* Industrial Training */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Industrial Training <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>

          {/* Corporate Training */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Corporate Training <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>

          {/* Faculty Development Program */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Faculty Development Program{" "}
              <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>

          {/* Vocational Training */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Vocational Training <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>

          {/* Syllabus Training */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              Syllabus Training <i className="fa-solid fa-arrow-up-short-wide"></i>
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
