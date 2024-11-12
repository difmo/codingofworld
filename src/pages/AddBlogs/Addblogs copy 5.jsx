import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MonacoEditor from '@monaco-editor/react'; // Default import

const AddBlogs = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);

  const [fields, setFields] = useState([
    { type: "heading", value: "" },
    { type: "description", value: "" },
    { type: "link", value: "" },
    { type: "image", value: "" },
  ]);

  const addField = (type) => {
    setFields([
      ...fields,
      { type, value: "", language: "javascript" }, // default language as javascript
    ]);
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

  const handleImageChange = (index, e) => {
    const updatedFields = [...fields];
    updatedFields[index].value = e.target.files[0];
    setFields(updatedFields);
  };

  const handlePublish = () => {
    console.log("Blog Published!", { title, content, link, image, fields });
    navigate("/home");
  };

  return (
    <div className="p-6 py-12 mx-auto text-white bg-black border border-gray-500 rounded-lg ">
      <button
        onClick={handlePublish}
        className="px-6 py-2 mb-4 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Publish
      </button>

      <h1 className="mb-6 text-3xl font-semibold text-center">Create a New Blog Post</h1>

      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-semibold text-gray-700 ">
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
        <label htmlFor="content" className="block text-lg font-semibold text-gray-700">
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
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided) => (
                    <div
                      className="p-4 mb-4 border border-gray-300 rounded-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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

                      {field.type === "image" && (
                        <div>
                          <label className="block text-lg font-semibold text-gray-700">
                            Image {index + 1}
                          </label>
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(index, e)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                          />
                          {field.value && (
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(field.value)}
                                alt="Uploaded"
                                className="object-cover w-32 h-32"
                              />
                            </div>
                          )}
                        </div>
                      )}

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
                            {/* Add more languages here as needed */}
                          </select>

                          <MonacoEditor
                            height="200px"
                            language={field.language} // Dynamically change language based on the selection
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

      <div className="flex gap-4">
        <button
          onClick={() => addField("heading")}
          className="px-6 py-2 mb-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          Add Heading
        </button>
        <button
          onClick={() => addField("description")}
          className="px-6 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Add Description
        </button>
        <button
          onClick={() => addField("link")}
          className="px-6 py-2 mb-4 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
        >
          Add Link
        </button>
        <button
          onClick={() => addField("image")}
          className="px-6 py-2 mb-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          Add Image
        </button>
        <button
          onClick={() => addField("code")}
          className="px-6 py-2 mb-4 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          Add Code Block
        </button>
      </div>
    </div>
  );
};

export default AddBlogs;
