import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import * as Icons from "lucide-react"; // Import all Lucide icons

const TrainingPrograms = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const querySnapshot = await getDocs(collection(db, "trainingPrograms"));
      const programsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPrograms(programsData);
    };

    fetchPrograms();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-700 ease-in-out overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl -z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-secondaryblue dark:text-white tracking-tight">
            Comprehensive Training Solutions
          </h3>
          <p className="mt-4 text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover world-class development training crafted by experienced consultants at Coding of World, designed to elevate your skills with elegance and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            const LucideIcon = Icons[program.icon] || Icons["GraduationCap"]; // fallback icon

            return (
              <div
                key={program.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center"
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                <LucideIcon className="w-12 h-12 text-primary dark:text-blue-400 mb-6 transition-transform duration-300 group-hover:scale-110" />

                <h4 className="text-xl  font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                  <a href={program.link} className="hover:underline">
                    {program.title}
                  </a>
                </h4>

                <p className="text-gray-600 dark:text-gray-300 text-center mb-4 leading-relaxed">
                  {program.description}
                </p>  

                <p className="bg-secondaryblue absolute top-0 left-0 group-hover:-top-4 group-hover:-left-4 rounded-tl-lg group-hover:bg-primary transition-all duration-300 rounded-br-lg text-lg group-hover:text-white font-bold text-white px-2 py-2 dark:text-blue-300">
                  Price: ₹{program.price}
                </p>

                <a
                  href={program.link}
                  className="relative inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 dark:hover:bg-secondaryblue transition-all duration-300 group"
                >
                  <span className="relative z-10">Know More</span>
                  <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrainingPrograms;
