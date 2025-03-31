import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";

const ShowLatestBanner = () => {
  const [latestBanner, setLatestBanner] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const popupRef = useRef(null);

  useEffect(() => {
    const fetchLatestBanner = async () => {
      try {
        const bannerRef = collection(db, "banners");

        const q = query(
          bannerRef,
          where("isActive", "==", true), // Fetch only active banners
          limit(1) // Limit to the most recent banner
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const banner = querySnapshot.docs[0].data();
          setLatestBanner({
            id: querySnapshot.docs[0].id,
            ...banner,
          });
          setIsPopupVisible(true); // Automatically show the popup when the banner is fetched
        }
      } catch (error) {
        console.error("Error fetching latest banner: ", error);
      }
    };

    fetchLatestBanner();
  }, []);

  // Close the popup
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  // Close the popup if clicked outside
  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPopupVisible]);

  // Render the popup if the banner is fetched and active
  return (
    latestBanner && (
      <>
        {isPopupVisible && (
          <div className="fixed  inset-0 flex  bg-black pr-4 bg-opacity-70 z-50 transition-all duration-300 ease-in-out">
            <div
              ref={popupRef}
              className=" relative top-30
              md:top-0 md:left-80 rounded-xl w-[800px] h-[400px] mx-4  sm:mx-6 shadow-lg transform transition-all duration-300 ease-in-out scale-95 "
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-1 right-2 z-50   bg-secondaryblue  text-white rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none"
              >
                x
              </button>
              <div className="relative overflow-hidden rounded-xl ">
                <img
                  src={latestBanner.imageUrl}
                  alt="Banner"
                  className=" bg-cover transition-all duration-500 ease-in-out transform hover:scale-105"
                />
              </div>
              {/* <div className="p-4 sm:p-6 lg:p-8  ml-4 mr-5">
                <p className="text-lg sm:text-md lg:text-xl font-semibold text-primary mb-4">
                  {latestBanner.description}
                </p>
                <ul className="list-none pl-0 mb-6 space-y-2 text-gray-700 text-sm sm:text-lg">
                  {latestBanner.bulletPoints.map((point, index) => (
                    <li
                      key={index}
                      className="relative pl-6 text-base sm:text-lg"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={latestBanner.buttonLink}
                  className="inline-block px-4 py-1 sm:px-6 sm:py-3 bg-secondaryblue text-white rounded-full text-base sm:text-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
                >
                  Register Now
                </a>
              </div> */}
            </div>
          </div>
        )}
      </>
    )
  );
};

export default ShowLatestBanner;
