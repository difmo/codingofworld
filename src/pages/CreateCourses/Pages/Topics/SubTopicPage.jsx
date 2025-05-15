import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SubtopicDetailsPage = () => {
  const { courseId, topicId, subtopicId } = useParams();
  const [subtopic, setSubtopic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubtopic = async () => {
      try {
        const subtopicRef = doc(
          db,
          "courses",
          courseId,
          "topics",
          topicId,
          "subtopics",
          subtopicId
        );
        const subtopicSnap = await getDoc(subtopicRef);
        if (subtopicSnap.exists()) {
          const data = subtopicSnap.data();
          setSubtopic(data);
          setFormData({
            title: data.title || "",
            content: data.content || "",
          });
        } else {
          setError("Subtopic not found.");
        }
      } catch (err) {
        console.error("Error fetching subtopic:", err);
        setError("Failed to fetch subtopic.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubtopic();
  }, [courseId, topicId, subtopicId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const subtopicRef = doc(
        db,
        "courses",
        courseId,
        "topics",
        topicId,
        "subtopics",
        subtopicId
      );
      await updateDoc(subtopicRef, {
        title: formData.title,
        content: formData.content,
      });
      setSubtopic({ ...subtopic, ...formData });
      setEditMode(false);
    } catch (err) {
      console.error("Error saving subtopic:", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 text-white">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 text-white bg-[#1a1a1a] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {editMode ? "Edit Subtopic" : subtopic.title}
        </h1>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>

      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 text-black rounded bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              theme="snow"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData({
                  title: subtopic.title,
                  content: subtopic.content,
                });
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: subtopic.content || "<p>No content available.</p>" }}
        />
      )}
    </div>
  );
};

export default SubtopicDetailsPage;
