import React from 'react';

const TrainingPrograms = () => {
  return (
    <section className="container-fluid newSection py-16 bg-gray-100">
      <div className="text-center mb-8">
        <h3 className="sectionTitle text-4xl font-semibold text-gray-800">
          Amazing <span className="themeText text-primary">Training</span> Programs
        </h3>
        <p className="sectionContent text-lg text-gray-600 max-w-3xl mx-auto">
          We are much appreciated in the field of Training as well. Coding of World offers you the best development training via experienced consultants.
        </p>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* Summer Training */}
          <div className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
            <i className="fa fa-laptop text-4xl text-primary mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800">
              <a href="/summer-training/" className="hover:text-primary">Summer Training (45-60 Days)</a>
            </h4>
            <p className="text-gray-600 mb-4">
              Coding of World offers you an appreciated training program with an objective to enhance the knowledge of the students on different cutting-edge technologies for the <b>B.Tech(CS/IT), BCA, MCA</b> students.
            </p>
            <p className="text-gray-800 font-bold mb-4">Course Price: ₹7,000</p>
            <a href="/summer-training/" className="knowMoreBtn divBtn text-white bg-primary px-6 py-2 rounded-full text-sm">Know More</a>
          </div>

          {/* Vocational Training */}
          <div className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
            <i className="fa fa-gavel text-4xl text-primary mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800">
              <a href="/winter-training/" className="hover:text-primary">Vocational Training (45-60 Days)</a>
            </h4>
            <p className="text-gray-600 mb-4">
              Coding of World offers an amazing Vocational Training program to make you an expert in your field, which is a live project-based training. Students related to the <b>Diploma(CS/IT), PGDCA</b> can join this program.
            </p>
            <p className="text-gray-800 font-bold mb-4">Course Price: ₹7,000</p>
            <a href="/winter-training/" className="knowMoreBtn divBtn text-white bg-primary px-6 py-2 rounded-full text-sm">Know More</a>
          </div>

          {/* Winter Training */}
          <div className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
            <i className="fa fa-code text-4xl text-primary mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800">
              <a href="/winter-training/" className="hover:text-primary">Winter Training (45 Days)</a>
            </h4>
            <p className="text-gray-600 mb-4">
              This Winter Training program is designed to Teach, Guide, and Enrich students to become ready for corporate. Students related to the <b>B.Tech(CS/IT), PGDCA, Diploma(CS/IT), BCA, MCA</b> can join this program.
            </p>
            <p className="text-gray-800 font-bold mb-4">Course Price: ₹7,000</p>
            <a href="/summer-training/" className="knowMoreBtn divBtn text-white bg-primary px-6 py-2 rounded-full text-sm">Know More</a>
          </div>

          {/* Apprenticeship Program */}
          <div className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
            <i className="fa fa-coffee text-4xl text-primary mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800">
              <a href="/apprenticeship-training/" className="hover:text-primary">Apprenticeship (6 Months)</a>
            </h4>
            <p className="text-gray-600 mb-4">
              Coding of World offers you an apprenticeship program with experienced consultants who will take a step with you towards your success and make you capable of working with a reputed organization. Offered for Pass-out Students of <b>B.Tech(CS/IT), PGDCA, Diploma(CS/IT), BCA & MCA</b>.
            </p>
            <p className="text-gray-800 font-bold mb-4">Course Price: ₹30,000</p>
            <a href="/apprenticeship-training/" className="knowMoreBtn divBtn text-white bg-primary px-6 py-2 rounded-full text-sm">Know More</a>
          </div>

          {/* Syllabus Training */}
          <div className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
            <i className="fa fa-mobile text-4xl text-primary mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800">
              <a href="/syllabus-training/" className="hover:text-primary">Syllabus Training (30 Days)</a>
            </h4>
            <p className="text-gray-600 mb-4">
              Coding of World helps you learn something more interesting about technical subjects in your syllabus, helping you grasp the practical and empirical meaning of the subjects. Students related to the <b>B.Tech(CS/IT), PGDCA, Diploma(CS/IT), BCA, MCA</b> can join this program.
            </p>
            <p className="text-gray-800 font-bold mb-4">Course Price: ₹5,000</p>
            <a href="/syllabus-training/" className="knowMoreBtn divBtn text-white bg-primary px-6 py-2 rounded-full text-sm">Know More</a>
          </div>

          {/* PD & Skills Development */}
          <div className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
            <i className="fa fa-adjust text-4xl text-primary mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800">
              <a href="#" className="hover:text-primary">PD & Skills Development (30 Days)</a>
            </h4>
            <p className="text-gray-600 mb-4">
              Coding of World offers a session on personality development to help you get a positive thought pattern, gain confidence, improve behavior, learn better communication, and develop a healthy physique. Interested candidates are most welcome to participate in the program.
            </p>
            <p className="text-gray-800 font-bold mb-4">Course Price: ₹5,000</p>
            <a href="#" className="knowMoreBtn divBtn text-white bg-primary px-6 py-2 rounded-full text-sm">Know More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingPrograms;
