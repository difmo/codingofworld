import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Gallery Component
const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryCollection = collection(db, "gallery");

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const data = await getDocs(galleryCollection);
        setGalleryItems(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error fetching gallery items: ", error);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    initialSlide: galleryItems.findIndex(
      (item) => item.imageUrl === selectedImage
    ),
  };

  return (
    <div className="min-h-screen py-10">
      <h1 className="text-5xl font-bold text-center text-gray-800 pb-8">
        Gallery
      </h1>
      <div className="container mx-auto px-4">
        {/* Responsive Grid for gallery items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="w-full  border-2 border-gray-300 relative group rounded-lg shadow-lg overflow-hidden transform hover:scale-95 transition-all duration-500"
            >
              <div className="bg-cover h-80">
                <img
                  src={item.imageUrl}
                  alt={item.title || "Gallery Item"}
                  className="w-full h-full object-cover cursor-pointer group-hover:opacity-80 transition-opacity duration-300"
                  onClick={() => handleImageClick(item.imageUrl)}
                />
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 w-full bg-red-500 bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size image with React Slick slider */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-14 md:top-12 right-10 md:right-20 p-3 text-red-600 hover:text-white transition-colors duration-300"
          >
            Close
          </button>
          <div className="relative w-full max-w-4xl mt-16 md:mt-0">
            <Slider {...sliderSettings}>
              {galleryItems.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.imageUrl}
                    alt="Full-size"
                    className="w-full h-auto max-h-[80vh] object-contain mt-4"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
