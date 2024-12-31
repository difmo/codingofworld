// Importing required libraries
import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", imageUrl: "" });

  const galleryCollection = collection(db, "gallery");

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const data = await getDocs(galleryCollection);
      setGalleryItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchGalleryItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddImage = async () => {
    if (formData.title && formData.imageUrl) {
      const docRef = await addDoc(galleryCollection, formData);
      setGalleryItems([...galleryItems, { ...formData, id: docRef.id }]);
      setFormData({ title: "", imageUrl: "" });
    }
  };

  const handleDeleteImage = async (id) => {
    await deleteDoc(doc(db, "gallery", id));
    setGalleryItems(galleryItems.filter((item) => item.id !== id));
  };

  const handleEditImage = async (id) => {
    const itemToEdit = galleryItems.find((item) => item.id === id);
    setFormData(itemToEdit);
    await deleteDoc(doc(db, "gallery", id));
    setGalleryItems(galleryItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin Gallery
      </h1>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Image
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Image Title"
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="fil"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleAddImage}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Image
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditImage(item.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteImage(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
