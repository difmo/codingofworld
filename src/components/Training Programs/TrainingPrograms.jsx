import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; 
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const TrainingPrograms = () => {
  const [programs, setPrograms] = useState([]); 
  useEffect(() => {
    const fetchPrograms = async () => {
      const querySnapshot = await getDocs(collection(db, "trainingPrograms"));
      const programsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPrograms(programsData); // Set the fetched data to state
    };

    fetchPrograms();
  }, []);

  return (
    <section className="container-fluid newSection py-16 bg-gray-100">
      <div className="text-center mb-8">
        <h3 className="sectionTitle text-4xl font-semibold text-gray-800">
          Comprehensive Training Solutions
        </h3>
        <p className="sectionContent text-lg text-gray-600 max-w-3xl mx-auto">
          We are much appreciated in the field of Training as well. Coding of World offers you the best development training via experienced consultants.
        </p>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
              <i className={`fa ${program.icon} text-4xl text-primary mb-4`}></i>
              <h4 className="text-xl font-semibold text-gray-800">
                <a href={program.link} className="hover:text-primary">{program.title}</a>
              </h4>
              <p className="text-gray-600 mb-4">
                {program.description}
              </p>
              <p className="text-gray-800 font-bold mb-4">Course Price: ₹{program.price}</p>
              <a href={program.link} className="knowMoreBtn divBtn text-white bg-primary px-6 py-2 rounded-full text-sm">
                Know More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingPrograms;
