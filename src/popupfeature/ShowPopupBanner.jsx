import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";
import FormattedContent from "@/Utils/FormattedContent";
import RouteConstants from "@/constants/routeConstants/RouteConstants";

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

  return (
    latestBanner && (
      <>
        {isPopupVisible && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 transition-all  duration-300 ease-in-out">
            <div
              ref={popupRef}
              className="relative rounded-md bg-white  mx-4 sm:mx-6 shadow-lg transform transition-all duration-300 ease-in-out scale-95"
            >
              {/* <div className="w-60 h-60 rounded-full  blur-xl bg-primary top-0   absolute -right-10"></div> */}

              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 z-50 bg-secondaryblue text-white rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none"
              >
                x
              </button>

              {/* Banner content */}


              <div className="p-4 relative z-20 sm:p-6 lg:p-8 ml-4 mr-5">
                <h1 className="text-2xl font-bold mb-2 text-secondaryblue">{latestBanner.title}</h1>
                <FormattedContent html={latestBanner.description} />

                <a
                  href={RouteConstants.MAINROUTE.CONTACTUS}
                  className="inline-block px-4 py-1 mt-4   sm:px-6 sm:py-3 bg-secondaryblue text-white rounded-full text-base sm:text-sm cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out"
                >
                  Register Now
                </a>

              </div>


              
            </div>
          </div>
        )}
      </>
    )
  );
};

export default ShowLatestBanner;
