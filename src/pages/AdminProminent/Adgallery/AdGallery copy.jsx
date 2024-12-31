import React, { useState, useEffect } from "react";
import { db, storage } from "../../../firebase"; // Import Firebase configuration and storage
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", imageFile: null });
  const [editingItemId, setEditingItemId] = useState(null); // Track the item being edited

  const galleryCollection = collection(db, "gallery");

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const data = await getDocs(galleryCollection);
      setGalleryItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchGalleryItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddImage = async () => {
    if (formData.title && formData.imageFile) {
      const imageRef = ref(storage, `gallery/${formData.imageFile.name}`);
      await uploadBytes(imageRef, formData.imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      if (editingItemId) {
        // Update existing item
        await updateDoc(doc(db, "gallery", editingItemId), {
          title: formData.title,
          imageUrl,
        });
        setGalleryItems((prev) =>
          prev.map((item) =>
            item.id === editingItemId
              ? { ...item, title: formData.title, imageUrl }
              : item
          )
        );
        setEditingItemId(null); // Reset editing state
      } else {
        // Add new item
        const docRef = await addDoc(galleryCollection, {
          title: formData.title,
          imageUrl,
        });

        setGalleryItems([
          ...galleryItems,
          { id: docRef.id, title: formData.title, imageUrl },
        ]);
      }

      setFormData({ title: "", imageFile: null });
    }
  };

  const handleDeleteImage = async (id) => {
    await deleteDoc(doc(db, "gallery", id));
    setGalleryItems(galleryItems.filter((item) => item.id !== id));
  };

  const handleEditImage = (item) => {
    setFormData({ title: item.title, imageFile: null });
    setEditingItemId(item.id);
  };

  return (
    <div className="min-h-screen py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin Gallery
      </h1>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editingItemId ? "Edit Image" : "Add New Image"}
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
              type="file"
              name="imageFile"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleAddImage}
            className={`mt-4 px-4 py-2 ${
              editingItemId ? "bg-yellow-500" : "bg-blue-500"
            } text-white rounded-lg hover:${
              editingItemId ? "bg-yellow-600" : "bg-blue-600"
            } transition`}
          >
            {editingItemId ? "Update Image" : "Add Image"}
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
                    onClick={() => handleEditImage(item)}
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
