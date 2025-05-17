import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import RouteConstants from "@/constants/routeConstants/RouteConstants";
import FormattedContent from "@/Utils/FormattedContent";

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

  if (loading) return <Loader />;
  if (error) return <div className="text-xl text-center text-red-500 mt-10">{error}</div>;
  if (!internship) return <p className="text-xl text-center mt-10">Internship not found!</p>;

  return (
  <div className="flex justify-center px-4 py-8 dark:bg-dark dark:text-white min-h-screen">
    <div className="w-full max-w-6xl">
      {/* Internship Banner */}
      <div className="relative rounded-xl overflow-hidden shadow-xl">
        <img
          src={internship.thumbnailUrl}
          alt={internship.title}
          className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h1 className="text-3xl font-bold">{internship.title}</h1>
        </div>
      </div>

      {/* Internship Content */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Description */}
        <div className="md:col-span-2 bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-primary">About the Internship</h2>
          <div className="prose dark:prose-invert max-w-none">
            <FormattedContent html={internship.description} />
          </div>
        </div>

        {/* Sidebar */}
<div className="bg-white h-fit dark:bg-neutral-900 rounded-xl p-6 shadow-lg flex flex-col justify-between sticky top-20">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4">Company Bio</h2>
            <div className="prose dark:prose-invert max-w-none">
              <FormattedContent html={internship.bio} />
            </div>
          </div>

          <button
            onClick={() => navigate(RouteConstants.MAINROUTE.INTERNSHIPFORM)}
            className="mt-8 w-full px-6 py-3 bg-primary text-white font-semibold text-lg rounded-md shadow-md transition-all duration-300 hover:bg-primary/90 hover:scale-[1.03]"
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
