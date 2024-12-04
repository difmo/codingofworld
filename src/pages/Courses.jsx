import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";

export const Courses = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]); // Store course data
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state for fetching courses
  const [navigating, setNavigating] = useState(false); // Loading state for navigation

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newcourse"));
        const fetchedCourse = [];
        querySnapshot.forEach((doc) => {
          fetchedCourse.push({ ...doc.data(), id: doc.id });
        });
        setCourse(fetchedCourse);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Course:", error);
        setError("Failed to load Course.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  const handleNavigation = (id) => {
    setNavigating(true); // Show loader
    setTimeout(() => {
      navigate(`/details/${id}`);
      setNavigating(false); // Hide loader after navigation
    }, 500); // Optional delay for smooth UX
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (navigating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="courses bg-[#F3F4F8] pt-4">
      <div className="w-4/5 m-auto">
        <div className="py-16 heading">
          <h1 className="text-3xl font-semibold text-black">
            Find The Right <br />
            Online Course For You With Certificates by{" "}
            <span className="text-primary">Diffmo Technologies</span>
          </h1>
          <span className="block mt-2 text-sm">
            You don't have to struggle alone, you've got our assistance and
            help.
          </span>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {course.map((item) => (
            <div
              onClick={() => handleNavigation(item.id)}
              key={item.id}
              className="relative bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-95 hover:shadow-2xl cursor-pointer"
            >
              <div className="relative w-full overflow-hidden rounded-t-lg images hover:bg-red-600">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="object-cover w-full h-full transition duration-300 ease-in-out delay-150 rounded-t-lg"
                />
              </div>
              <p
                className="px-2 py-2 text-xl text-gray-600 font-serif"
                dangerouslySetInnerHTML={{ __html: item.shortDescription }}
              />
              <div className="flex items-center justify-between p-3 border-t border-gray-200">
                <span className="text-sm text-primary">Free</span>
                <span className="text-[14px] ml-2 flex items-center">
                  Know Details <HiOutlineArrowNarrowRight />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
