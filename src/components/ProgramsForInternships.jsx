import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "./Loader";

const ProgramsForInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newinternship"));
        const internshipsArray = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setInternships(internshipsArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching internships:", err);
        setError("Failed to load internships. Please try again later.");
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-dark py-12 px-4">
      <div className="max-w-screen-xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Master In-Demand Skills
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
          Hands-on training & certifications from <span className="text-primary font-semibold">Difmo Technologies</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {internships.map(internship => (
          <div
            key={internship.id}
            className="group bg-white dark:bg-dark rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div
              className="relative"
              onClick={() => navigate(`/courses/internship/${internship.id}`)}
            >
              <img
                src={internship.thumbnailUrl}
                alt={internship.title}
                loading="lazy"
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              {/* Left Badge: Internship Type */}
              <div className="absolute bottom-0 left-0 rounded-tr-xl bg-secondaryblue text-white px-3 py-1 text-md font-semibold overflow-hidden transition-all duration-500 group-hover:bg-primary">
                <span className="block group-hover:hidden">
                  {internship.Internship.toUpperCase()}
                </span>
                <span className="hidden group-hover:block">
                  Explore
                </span>
              </div>

              {/* Right Badge: Duration + Price */}
              <div className="absolute bottom-0 right-0 rounded-tl-xl bg-secondaryblue text-white px-3 py-1 text-md font-semibold overflow-hidden transition-all duration-500 group-hover:bg-primary">
                <span className="block group-hover:hidden">
                  {internship.months}
                </span>
                <span className="hidden group-hover:block">
                  Limited Offer
                </span>
              </div>

            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                {internship.title}
              </h3>
              <div
                className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: internship.shortDescription,
                }}
              />

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                <span>{internship.duration}</span>
                <span>{internship.level}</span>
              </div>

              <button
                className="mt-6 w-full py-2 text-sm font-medium text-white bg-primary rounded-xl transition duration-200 hover:bg-primary/90"
              onClick={() => navigate(`/courses/internship/${internship.id}`)}
              >
                Explore Internship
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramsForInternships;
