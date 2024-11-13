import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MonacoEditor from "@monaco-editor/react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddBlogs = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null); // For storing image data
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blogId) {
      setLoading(true);
      const fetchBlogData = async () => {
        const blogDoc = await getDoc(doc(db, "blogs", blogId));
        if (blogDoc.exists()) {
          const blogData = blogDoc.data();
          setTitle(blogData.title);
          setContent(blogData.content);
          setLink(blogData.link);
          setImage(blogData.image); // Preset image if exists
          setFields(blogData.fields || []);
        }
        setLoading(false);
      };

      fetchBlogData();
    }
  }, [blogId]);

  const addField = (type) => {
    setFields([...fields, { type, value: "", language: "javascript" }]);
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
  };

  const handleLanguageChange = (index, language) => {
    const updatedFields = [...fields];
    updatedFields[index].language = language;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(source.index, 1);
    reorderedFields.splice(destination.index, 0, removed);

    setFields(reorderedFields);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    const storage = getStorage();
    const imageRef = ref(storage, `images/${file.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optionally show upload progress here
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handlePublish = async () => {
    const userId = auth.currentUser.uid;

    setLoading(true);

    try {
      let imageUrl = image;
      if (image instanceof File) {
        imageUrl = await handleImageUpload(image);
      }

      const blogData = {
        title,
        content,
        link,
        image: imageUrl,
        fields,
        userId,
        createdAt: new Date(),
      };

      if (blogId) {
        const blogRef = doc(db, "blogs", blogId);
        await updateDoc(blogRef, blogData);
        console.log("Blog updated successfully!");
      } else {
        const newBlogId = uuidv4();
        const blogRef = doc(db, "blogs", newBlogId);
        await setDoc(blogRef, blogData);
        console.log("Blog created successfully!");
      }

    } catch (error) {
      console.error("Error publishing blog: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 py-12 mx-auto text-white bg-black border border-gray-500 rounded-lg">
      <button
        onClick={handlePublish}
        className="px-6 py-2 mb-4 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>

      <h1 className="mb-6 text-3xl font-semibold text-center">
        {blogId ? "Edit Blog Post" : "Create a New Blog Post"}
      </h1>

      {/* Blog Title */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-lg font-semibold text-gray-700"
        >
          Blog Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mt-2 bg-black border border-gray-300 rounded-lg"
          placeholder="Enter the title of your blog"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-lg font-semibold text-gray-700"
        >
          Content
        </label>
        <ReactQuill
          id="content"
          value={content}
          onChange={setContent}
          className="w-full"
          placeholder="Write the content of your blog"
        />
      </div>

      {/* Drag and Drop Dynamic Fields */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mb-4"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Dynamic Fields (Headings, Descriptions, Links, Images, Code)
              </h2>

              {fields.map((field, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="p-4 mb-4 border border-gray-300 rounded-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Heading Field */}
                      {field.type === "heading" && (
                        <div>
                          <label className="block text-lg font-semibold text-gray-700">
                            Heading {index + 1}
                          </label>
                          <ReactQuill
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, value)}
                            className="w-full"
                            placeholder="Enter heading"
                          />
                        </div>
                      )}

                      {/* Description Field */}
                      {field.type === "description" && (
                        <div>
                          <label className="block text-lg font-semibold text-gray-700">
                            Description {index + 1}
                          </label>
                          <ReactQuill
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, value)}
                            className="w-full"
                            placeholder="Enter description"
                          />
                        </div>
                      )}

                      {/* Link Field */}
                      {field.type === "link" && (
                        <div>
                          <label className="block text-lg font-semibold text-gray-700">
                            Link {index + 1}
                          </label>
                          <input
                            type="url"
                            value={field.value}
                            onChange={(e) => handleFieldChange(index, e.target.value)}
                            className="w-full px-4 py-2 mt-2 bg-black border border-gray-300 rounded-lg"
                            placeholder="Enter link"
                          />
                        </div>
                      )}

                      {/* Image Field */}
                      {field.type === "image" && (
                        <div>
                          <label className="block text-lg font-semibold text-gray-700">
                            Image {index + 1}
                          </label>
                          <input
                            type="file"
                            onChange={async (e) => {
                              const uploadedImage = e.target.files[0];
                              const imageUrl = await handleImageUpload(uploadedImage);
                              handleFieldChange(index, imageUrl);
                            }}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                          />
                          {field.value && (
                            <div className="mt-2">
                              <img
                                src={field.value}
                                alt="Uploaded"
                                className="object-cover w-32 h-32"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Code Field */}
                      {field.type === "code" && (
                        <div>
                          <label className="block text-lg font-semibold text-gray-700">
                            Code Block {index + 1}
                          </label>

                          {/* Language Selector */}
                          <select
                            value={field.language}
                            onChange={(e) => handleLanguageChange(index, e.target.value)}
                            className="w-full px-4 py-2 mt-2 bg-black border border-gray-300 rounded-lg"
                          >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                          </select>

                          <MonacoEditor
                            height="200px"
                            language={field.language}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, value)}
                            theme="vs-dark"
                            options={{
                              selectOnLineNumbers: true,
                              automaticLayout: true,
                            }}
                          />
                        </div>
                      )}

                      <button
                        onClick={() => removeField(index)}
                        className="px-4 py-1 mt-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Buttons to Add Different Fields */}
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-6">
        <button
          onClick={() => addField("heading")}
          className="w-full px-6 py-2 mb-4 text-white bg-green-500 rounded-lg hover:bg-green-600 lg:w-auto"
        >
          Add Heading
        </button>
        <button
          onClick={() => addField("description")}
          className="w-full px-6 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 lg:w-auto"
        >
          Add Description
        </button>
        <button
          onClick={() => addField("link")}
          className="w-full px-6 py-2 mb-4 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 lg:w-auto"
        >
          Add Link
        </button>
        <button
          onClick={() => addField("image")}
          className="w-full px-6 py-2 mb-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600 lg:w-auto"
        >
          Add Image
        </button>
        <button
          onClick={() => addField("code")}
          className="w-full px-6 py-2 mb-4 text-white bg-teal-500 rounded-lg hover:bg-teal-600 lg:w-auto"
        >
          Add Code Block
        </button>
      </div>
    </div>
  );
};

export default AddBlogs;
