import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";
import ShowAllCoursesPage from "./ShowCourses/Pages/ShowAllCoursesPage";

const Courses = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);

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
        setError("Sorry, we encountered an issue while loading the courses.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  const handleNavigation = (id) => {
    setNavigating(true);
    setTimeout(() => {
      navigate(`/details/${id}`);
      setNavigating(false);
    }, 500);
  };

  if (loading || navigating) {
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
  //kjcnevdshv8y dvhdiv w9
  return (
    <section className="courses bg-[#F3F4F8] pt-4 pb-40">
      <div className="w-full max-w-screen-xl px-4 m-auto">
        <div className="py-16 heading">
          <h1 className="text-3xl font-semibold text-black md:text-4xl">
            Discover the Perfect Online Course <br />
            with Certificates from{" "}
            <span className="text-primary">Difmo Technologies</span>
          </h1>
          <span className="block mt-2 text-sm md:text-base">
            With our expert guidance, you don't have to navigate your learning
            journey alone. Get the support you need to succeed.
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-300 rounded md:w-1/3 md:mb-0"
            placeholder="Search for courses..."
          />
          <select className="w-full p-2 border border-gray-300 rounded md:w-1/3">
            <option>Sort by: Popularity</option>
            <option>Newest</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {course.map((item) => (
            <div
              onClick={() => handleNavigation(item.id)}
              key={item.id}
              className="relative overflow-hidden transition-transform transform bg-white rounded-lg shadow-xl cursor-pointer hover:scale-95 hover:shadow-2xl"
            >
              <div className="relative w-full overflow-hidden rounded-t-lg images hover:bg-red-600">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="object-cover w-full h-full transition duration-300 ease-in-out delay-150 rounded-t-lg"
                />
              </div>
              <p
                className="px-2 py-2 font-serif text-xl text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: item.shortDescription
                    ? item.shortDescription.split(" ").slice(0, 12).join(" ") +
                      "..."
                    : "",
                }}
              />

              <div className="flex items-center justify-between p-3 border-t border-gray-200">
                <span className="text-sm text-primary">Free</span>
                <span className="text-[14px] ml-2 flex items-center">
                  View Details <HiOutlineArrowNarrowRight />
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* <h1 className="mt-8">Want to contribut to make courses</h1> */}
        <ShowAllCoursesPage />
      </div>
    </section>
  );
};

export default Courses;