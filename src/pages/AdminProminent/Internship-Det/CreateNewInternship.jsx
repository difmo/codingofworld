import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase"; // Import Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage methods

const CreateNewInternship = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // To store title input
  const [Internship, setInternship] = useState("");
  const [months, setmonths] = useState("");
  const [shortDescription, setShortDescription] = useState(""); // To store short description
  const [description, setDescription] = useState(""); // To store description (ReactQuill)
  const [bio, setBio] = useState(""); // To store bio
  const [thumbnail, setThumbnail] = useState(null); // To store thumbnail image
  const [loading, setLoading] = useState(false);

  // Handle file input change for thumbnail image
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file); // Store the selected file
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload thumbnail image to Firebase Storage
      if (thumbnail) {
        const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
        const uploadTask = uploadBytesResumable(storageRef, thumbnail);

        // Wait for upload completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Error uploading image:", error);
            setLoading(false);
          },
          async () => {
            // Get the download URL of the uploaded thumbnail
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Now store internship data in Firestore
            const internshipData = {
              title,
              Internship,
              months,
              shortDescription, // Save the short description
              description,
              bio,
              thumbnailUrl: downloadURL,
              createdAt: new Date(),
            };

            // Save the data to Firestore
            const docRef = await addDoc(
              collection(db, "newinternship"),
              internshipData
            );
            console.log("Document written with ID: ", docRef.id);

            setLoading(false);
            navigate("/admin/allInternship"); // Redirect after successful save
          }
        );
      }
    } catch (error) {
      console.error("Error saving internship:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title input */}
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
              placeholder="Enter internship title"
            />
          </div>
          {/* Internship */}
          <div className="flex justify-between">
            <div>
              <label
                htmlFor="Internship"
                className="block text-sm font-medium text-gray-700"
              >
                Internship
              </label>
              <input
                type="text"
                id="Internship"
                value={Internship}
                onChange={(e) => setInternship(e.target.value)}
                required
                className="mt-2 p-2 w-full border border-gray-300 rounded"
                placeholder="Enter internship Internship"
              />
            </div>
            <div>
              <label
                htmlFor=" months"
                className="block text-sm font-medium text-gray-700"
              >
                Months
              </label>
              <input
                type="text"
                id=" months"
                value={months}
                onChange={(e) => setmonths(e.target.value)}
                required
                className="mt-2 p-2 w-full border border-gray-300 rounded"
                placeholder="Enter internship  months"
              />
            </div>
          </div>
          {/* Short Description input */}
          <div>
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Short Description
            </label>
            <ReactQuill
              type="text"
              id="shortDescription"
              value={shortDescription}
              onChange={setShortDescription}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter a short description"
            />
          </div>

          {/* Description input using ReactQuill */}
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
              placeholder="Enter internship description"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }],
                  [{ font: [] }],
                  [{ size: ["small", "normal", "large", "huge"] }],
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["blockquote", "code-block"],
                  ["image"],
                  ["clean"],
                ],
              }}
            />
          </div>

          {/* Bio input */}
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
              placeholder="Enter internship bio"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }],
                  [{ font: [] }],
                  [{ size: ["small", "normal", "large", "huge"] }],
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["blockquote", "code-block"],
                  ["image"],
                  ["clean"],
                ],
              }}
            />
          </div>

          {/* Thumbnail input */}
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
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              accept="image/*"
            />
            {thumbnail && (
              <p className="mt-2 text-sm text-gray-500">
                {thumbnail.name} - {Math.round(thumbnail.size / 1024)} KB
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={
              loading ||
              !title ||
              !shortDescription ||
              !description ||
              !bio ||
              !thumbnail
            }
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateNewInternship;
