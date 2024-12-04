import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import Firestore config
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore methods
import ReactQuill from "react-quill"; // For rich text editor
import "react-quill/dist/quill.snow.css"; // ReactQuill styling
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage methods

const EditCourse = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // Store the title
  const [description, setDescription] = useState(""); // Store the description
  const [bio, setBio] = useState(""); // Store the bio
  const [shortDescription, setShortDescription] = useState(""); // Store the short description
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // Store the thumbnail image URL
  const [loading, setLoading] = useState(true); // Loading state
  const [thumbnail, setThumbnail] = useState(null); // Store thumbnail file if being changed

  // Fetch course data from Firestore
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const docRef = doc(db, "newcourse", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setBio(data.bio);
          setShortDescription(data.shortDescription || "");
          setThumbnailUrl(data.thumbnailUrl);
        } else {
          console.error("Course not found!");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedCourse = {
        title,
        description,
        bio,
        shortDescription,
        thumbnailUrl,
      };

      if (thumbnail) {
        // Upload new thumbnail to Firebase Storage
        const storage = getStorage();
        const thumbnailRef = ref(
          storage,
          `course/thumbnails/${thumbnail.name}`
        );
        await uploadBytes(thumbnailRef, thumbnail);
        const newThumbnailUrl = await getDownloadURL(thumbnailRef);
        updatedCourse.thumbnailUrl = newThumbnailUrl;
      }

      // Update Firestore document
      const docRef = doc(db, "newcourse", id);
      await updateDoc(docRef, updatedCourse);

      navigate("./admin/allcourse");
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            placeholder="Enter course title"
          />
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            placeholder="Enter a short description"
          />
        </div>

        {/* Description */}
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
            className="w-full mt-2 mb-4"
            placeholder="Enter course description"
          />
        </div>

        {/* Bio */}
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
            className="w-full mt-2 mb-4"
            placeholder="Enter course bio"
          />
        </div>

        {/* Thumbnail */}
        {thumbnailUrl && (
          <div className="mb-4">
            <img
              src={thumbnailUrl}
              alt="Current Thumbnail"
              className="w-32 h-32 object-cover"
            />
            <p className="text-sm text-gray-500">Current Thumbnail</p>
          </div>
        )}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleThumbnailChange}
            className="mt-2 p-2 w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
