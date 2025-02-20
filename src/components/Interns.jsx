import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "./Loader";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newinternship"));
        const internshipsArray = [];
        querySnapshot.forEach((doc) => {
          internshipsArray.push({ ...doc.data(), id: doc.id });
        });
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
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 text-xl text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#FFF] py-8">
        <div className="md:py-16 py-10 heading  md:px-24 px-3 ">
          <h1 className="text-3xl font-semibold text-black md:text-4xl">
            Unlock Your Potential with Industry- Leading Courses Empower your
            <br /> career with hands-on training and certifications from
            <span className="text-primary">Difmo Technologies</span>
          </h1>
          <span className="block mt-2 text-sm md:text-base">
            {" "}
            Whether you're a beginner or an experienced professional, our
            expert-led courses help you gain in-demand skills and advance in
            your field.
          </span>
        </div>
        {/* Display internships in a responsive grid */}
        <ul className="container grid grid-cols-1 gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {internships.map((internship) => (
            <li
              key={internship.id}
              className="relative flex flex-col justify-between overflow-hidden transition-all transform bg-white border border-gray-300  cursor-pointer rounded-xl hover:scale-105  hover:bg-[#f7f7f7]"
              onClick={() => navigate(`/internship/${internship.id}`)}
            >
              <div className="transition-opacity duration-300 ">
                <img
                  className="bg-cover w-full h-60 rounded-t-xl" // Only top corners rounded
                  src={internship.thumbnailUrl}
                  alt={internship.title}
                  loading="lazy"
                />
                <div className="flex justify-between px-4 py-2 ">
                  <p className="bg-red-100 p-2 rounded text-red-600">
                    {" "}
                    {internship.Internship}
                  </p>
                  <p className="p-2"> {internship.months}</p>
                </div>
                <h3 className="px-4 py-4 text-2xl font-semibold text-black">
                  {internship.title}
                </h3>
              </div>

              <p
                className="px-4 py-2 font-serif text-base text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: internship.shortDescription,
                }}
              />

              {/* Internship details (Duration and Level) */}
              <div className="flex items-center justify-between px-4 text-xs text-gray-500 md:text-sm">
                <span className="font-medium">{internship.duration}</span>
                <span className="font-medium">{internship.level}</span>
              </div>
              {/* Action Button bg-gradient-to-t from-black/60 to-transparent rounded-b-xl*/}
              <div className="left-0 w-full p-4 bottom-10 ">
                <button
                  className="w-full px-4 py-2 text-lg text-white transition-all bg-primary rounded-xl hover:bg-primary/90"
                  onClick={() => navigate(`/internship/${internship.id}`)}
                >
                  Explore Internship
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Internships;
