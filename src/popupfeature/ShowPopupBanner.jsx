import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";
import FormattedContent from "@/utils/FormattedContent";
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
          where("isActive", "==", true),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const banner = querySnapshot.docs[0].data();
          setLatestBanner({ id: querySnapshot.docs[0].id, ...banner });
          setIsPopupVisible(true);
        }
      } catch (error) {
        console.error("Error fetching latest banner: ", error);
      }
    };
    fetchLatestBanner();
  }, []);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

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
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPopupVisible]);

  return (
    latestBanner && isPopupVisible && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 transition-all duration-300 ease-in-out">
        <div
          ref={popupRef}
          className="relative rounded-lg bg-white dark:bg-slate-900 text-black dark:text-white mx-4 sm:mx-6 shadow-xl transform transition-all duration-300 ease-in-out scale-95 max-w-lg w-full"
        >
          <button
            onClick={handleClosePopup}
            className="absolute top-3 right-3 z-50 bg-secondaryblue hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none transition-colors"
          >
            &times;
          </button>

          <div className="p-5 sm:p-6 lg:p-8 relative z-20">
            <h1 className="text-2xl font-bold mb-3 text-secondaryblue dark:text-primary">
              {latestBanner.title}
            </h1>
            <FormattedContent html={latestBanner.description} />

            <a
              href={RouteConstants.MAINROUTE.CONTACTUS}
              className="inline-block px-5 py-2 mt-5 bg-secondaryblue dark:bg-primary text-white rounded-full text-sm hover:bg-green-600 dark:hover:bg-green-700 transition-all duration-300"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    )
  );
};

export default ShowLatestBanner;
