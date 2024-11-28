import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
const Internships = () => {
  const [internships, setInternships] = useState([]); // State to store internship data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // Fetch the internships from Firestore
        const querySnapshot = await getDocs(collection(db, "newinternship")); // Ensure your Firestore collection name is correct
        const internshipsArray = [];
        querySnapshot.forEach((doc) => {
          internshipsArray.push({ ...doc.data(), id: doc.id });
        });
        setInternships(internshipsArray); // Set the fetched internships
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
    return <div>Loading internships...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  console.log(internships, "querySnapshot");
  return (
    <section className="p-6 mx-auto">
      <h2 className="text-6xl py-3 font-bold text-center">Our Internships</h2>
      <p className="relative mb-6 py-3 text-xl text-center">
        The internships below are not exhaustive, and may or may not be
        currently available, but provide a taste of the various internships
        Coding of World offers.
      </p>

      {/* Displaying the internships in a grid */}
      <ul className="container grid grid-cols-1 gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {internships.map((internship) => (
          <li
            key={internship.id}
            className="relative cursor-pointer flex flex-col p-8 overflow-hidden transition-all transform rounded-xl shadow-md justify-between bg-white hover:scale-105 hover:shadow-xl border-2 border-gray-300"
            onClick={() => navigate(`/internship/${internship.id}`)}
          >
            <h3 className="text-3xl content-container text-black bg-white text-center md:h-12 item-center py-1">
              {internship.title}
            </h3>

            <div className="transition-opacity duration-300 my-2">
              <img
                className="object-cover w-full h-40"
                src={internship.thumbnailUrl}
                alt={internship.title}
                loading="lazy"
              />
            </div>

            <p className="absolute inset-0 z-10 flex items-center justify-center m-5 text-center transition-opacity duration-300 bg-white opacity-0">
              {internship.description}
            </p>

            <div className="p-2 text-center rounded-full bg-primary/70 cursor-pointer">
              <span className="text-white">Explore now</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Internships;
