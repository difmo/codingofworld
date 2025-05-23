import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase";
import { collection, addDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { slugify } from "@/Utils/slugify";

const CreatenewCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const validateForm = () => {
    if (!title || title.length < 5) {
      setMessage("Title must be at least 5 characters.");
      return false;
    }
    if (!shortDescription || shortDescription.length < 40) {
      setMessage("Short description must be at least 40 characters.");
      return false;
    }
    if (!description) {
      setMessage("Please provide a detailed description.");
      return false;
    }
    if (!bio) {
      setMessage("Please provide a bio.");
      return false;
    }
    if (!thumbnail) {
      setMessage("Please upload a thumbnail image.");
      return false;
    }
    setMessage("");
    return true;
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);

  try {
    const slug = slugify(title);

    // Check if course with this slug already exists
    const courseDocRef = doc(db, "newcourse", slug);
    const courseDocSnap = await getDoc(courseDocRef);

    if (courseDocSnap.exists()) {
      setMessage("A course with this title already exists. Please choose a different title.");
      setLoading(false);
      return;
    }

    if (thumbnail) {
      const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
          setMessage("Error uploading thumbnail image.");
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const courseData = {
            title,
            shortDescription,
            description,
            bio,
            thumbnailUrl: downloadURL,
            createdAt: new Date(),
          };

          // Save with slugified title as doc id
          await setDoc(courseDocRef, courseData);

          setLoading(false);
          setMessage("Course created successfully!");
          setTimeout(() => navigate("/admin/allcourse"), 2000);
        }
      );
    }
  } catch (error) {
    console.error("Error saving course:", error);
    setMessage("An error occurred while saving the course.");
    setLoading(false);
  }
};



  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-white mt-4">Submitting...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Course
          </h1>

          {message && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
              {message}
            </p>
          )}

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Short Description
            </label>
            <textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a short description (40-100 characters)"
              rows={1}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <ReactQuill
              id="description"
              value={description}
              onChange={setDescription}
              className="mt-2"
              placeholder="Enter course description"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <ReactQuill
              id="bio"
              value={bio}
              onChange={setBio}
              className="mt-2"
              placeholder="Enter course bio"
            />
          </div>

          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail Image
            </label>
            <input
              type="file"
              id="thumbnail"
              onChange={handleThumbnailChange}
              className="mt-2 w-full text-sm text-gray-500"
              accept="image/*"
            />
            {thumbnail && (
              <p className="mt-2 text-sm text-gray-500">
                {thumbnail.name} - {Math.round(thumbnail.size / 1024)} KB
              </p>
            )}
          </div>

          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatenewCourse;
