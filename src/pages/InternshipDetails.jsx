import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";

const InternshipDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const docRef = doc(db, "newinternship", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInternship(docSnap.data());
        } else {
          setError("Internship not found!");
        }
      } catch (err) {
        console.error("Error fetching internship:", err);
        setError("Failed to load internship.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-xl text-center text-red-500">{error}</div>;
  }

  if (!internship) {
    return <p className="text-xl text-center">Internship not found!</p>;
  }

  return (
    <div className="px-4 top-0 relative z-10">
      {/* Thumbnail Section */}
      <div className="w-full">
        <img
          src={internship.thumbnailUrl}
          alt={internship.title}
          className="bg-cover w-full h-auto"
        />
      </div>

      {/* Description Section */}
      <div className="mt-12 content-container flex flex-col sm:flex-row sm:justify-between sm:px-8 lg:px-12 xl:px-12">
        <div className="w-full sm:w-4/5">
          <p
            className="text-lg leading-relaxed text-gray-700 font-anek_telugu"
            dangerouslySetInnerHTML={{ __html: internship.description }}
          />
        </div>
        <div className="w-full p-6 sm:w-full sm:p-0 sm:mt-6">
          <div className="mb-6 content-containermd:px-18 lg:px-24">
            <p
              className="text-lg leading-relaxed text-gray-700 font-anek_telugu"
              dangerouslySetInnerHTML={{ __html: internship.bio }}
            />
          </div>
          <div className="text-center sm:px-18 lg:px-24">
            <button
              onClick={() => navigate("/internshipform")}
              className="px-6 py-3 text-white transition-all duration-300 transform rounded-lg shadow-md bg-primary hover:bg-primary/80 hover:scale-105"
            >
              ENROLL NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
