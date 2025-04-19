import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import Firestore config
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore methods
import ReactQuill from "react-quill"; // For rich text editor
import "react-quill/dist/quill.snow.css"; // ReactQuill styling
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage methods

const EditInternship = () => {
  const { id } = useParams(); // Get the internship ID from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // Store the title of the internship
  const [Internship, setInternship] = useState("");
  const [months, setmonths] = useState("");
  const [description, setDescription] = useState(""); // Store the description of the internship
  const [bio, setBio] = useState(""); // Store the bio of the internship
  const [shortDescription, setShortDescription] = useState(""); // Store the short description
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // Store the thumbnail image URL
  const [loading, setLoading] = useState(true); // Loading state to show loading spinner while fetching data
  const [thumbnail, setThumbnail] = useState(null); // Store thumbnail file if it's being changed

  // Fetch the internship data from Firestore when the component mounts
  useEffect(() => {
    const fetchInternshipData = async () => {
      try {
        const docRef = doc(db, "newinternship", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setInternship(data.Internship);
          setmonths(data.months);
          setDescription(data.description);
          setBio(data.bio); // Set the bio from Firestore
          setShortDescription(data.shortDescription || ""); // Set the short description from Firestore
          setThumbnailUrl(data.thumbnailUrl);
        } else {
          console.log("Internship not found!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching internship:", error);
        setLoading(false);
      }
    };

    fetchInternshipData();
  }, [id]);

  // Handle thumbnail file input change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  // Handle form submission (update internship in Firestore)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedInternship = {
        title,
        Internship,
        months,
        description,
        bio, // Add bio to the updated internship object
        shortDescription, // Add short description to the updated internship object
        thumbnailUrl, // Keep the old thumbnailUrl if no new image is uploaded
      };

      if (thumbnail) {
        // Upload the thumbnail to Firebase Storage
        const storage = getStorage();
        const thumbnailRef = ref(
          storage,
          `internships/thumbnails/${thumbnail.name}`
        );

        // Upload the file
        await uploadBytes(thumbnailRef, thumbnail);

        // Get the download URL for the uploaded file
        const newThumbnailUrl = await getDownloadURL(thumbnailRef);

        // Update the internship object with the new thumbnail URL
        updatedInternship.thumbnailUrl = newThumbnailUrl;

        console.log("New thumbnail uploaded:", thumbnail.name);
      }

      // Update the internship document in Firestore
      const docRef = doc(db, "newinternship", id);
      await updateDoc(docRef, updatedInternship);

      setLoading(false);
      navigate("/admin/allInternship"); // Redirect to the list page after saving changes
    } catch (error) {
      console.error("Error updating internship:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div><Loader/></div>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Internship</h1>
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
          />
        </div>

        {/* Bio input using ReactQuill */}
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
          />
        </div>

        {/* Display current thumbnail (if exists) */}
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

        {/* Thumbnail input */}
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

        {/* Submit Button */}
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

export default EditInternship;
