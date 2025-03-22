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
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div
              ref={popupRef}
              className="bg-secondaryblue relative rounded-xl max-w-xl w-full"
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-1 bg-secondaryblue rounded-full px-3 py-1 right-2 text-white text-lg"
              >
                x
              </button>
              <img
                src={latestBanner.imageUrl}
                alt="Banner"
                className="w-full object-cover rounded-t-xl mb-4"
              />
              <div className="p-6">
                <p className="text-lg font-medium mb-4 text-primary">
                  {latestBanner.description}
                </p>
                <ul className="list-disc text-white pl-5 mb-4">
                  {latestBanner.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <a
                  href={latestBanner.buttonLink}
                  className="inline-block py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-indigo-700"
                >
                  Go to Contact Form
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
