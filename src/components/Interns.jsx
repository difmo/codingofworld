import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // Fetch the internships from Firestore
        const querySnapshot = await getDocs(collection(db, "newinternship"));
        const internshipsArray = [];
        querySnapshot.forEach((doc) => {
          internshipsArray.push({ ...doc.data(), id: doc.id });
        });
        setInternships(internshipsArray);
        setLoading(false); // Stop loading
      } catch (err) {
        console.error("Error fetching internships:", err);
        setError("Failed to load internships.");
        setLoading(false); // Stop loading
      }
    };

    fetchInternships(); // Call the function to fetch data
  }, []);

  if (loading) {
    return <div>Loading internships...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {" "}
      <section className="p-6 mx-auto">
        <h2 className="py-3 text-6xl font-bold text-center">Our Internships</h2>
        <p className="relative py-3 mb-6 text-xl text-center">
          The internships below are not exhaustive, and may or may not be
          currently available, but provide a taste of the various internships
          Coding of World offers.
        </p>

        {/* Displaying the internships in a grid */}
        <ul className="container grid grid-cols-1 gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {internships.map((internship) => (
            <li
              key={internship.id}
              className="relative flex flex-col justify-between py-4 overflow-hidden transition-all transform bg-white border-gray-300 shadow-md cursor-pointer rounded-xl hover:scale-105 hover:shadow-xl"
              onClick={() => navigate(`/internship/${internship.id}`)}
            >
              <div className="my-2 transition-opacity duration-300">
                <img
                  className="object-cover w-full h-60 rounded-xl"
                  src={internship.thumbnailUrl}
                  alt={internship.title}
                  loading="lazy"
                />
                <h3 className="px-2 py-4 text-3xl font-bold text-black content-container md:h-12">
                  {internship.title}
                </h3>
              </div>

              <p className="absolute inset-0 z-10 flex items-center justify-center m-5 text-center transition-opacity duration-300 bg-white opacity-0">
                {internship.description}
              </p>

              {/* Short bio description */}
              <p
                className="px-2 py-2 font-serif text-xl text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: internship.shortDescription,
                }}
              />

              <div className="flex justify-center">
                <div className="p-2 text-center rounded-xl bg-primary/70 cursor-pointer md:w-[80%] w-full sm:w-[80%]   ">
                  <span className="text-white">Explore now</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Internships;
