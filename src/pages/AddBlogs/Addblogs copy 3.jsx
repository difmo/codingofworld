import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AddBlogs = () => {
    const navigate = useNavigate();

    // State for blog details
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);

    // State for dynamically added sections (headings, descriptions, links)
    const [fields, setFields] = useState([
        { type: "heading", value: "" },
        { type: "description", value: "" },
        { type: "link", value: "" },
    ]);

    // Handle adding a new field (heading, description, or link)
    const addField = (type) => {
        setFields([
            ...fields,
            { type, value: "" }, // Add new field with an empty value
        ]);
    };

    // Handle input changes for dynamically added fields
    const handleFieldChange = (index, value) => {
        const updatedFields = [...fields];
        updatedFields[index].value = value;
        setFields(updatedFields);
    };

    // Handle removing a field
    const removeField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    // Handle drag-and-drop reordering
    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return; // Dropped outside the list

        // Reorder the fields array
        const reorderedFields = Array.from(fields);
        const [removed] = reorderedFields.splice(source.index, 1);  // Remove the dragged item
        reorderedFields.splice(destination.index, 0, removed); // Insert it at the new position

        // Update state with the new order
        setFields(reorderedFields);
    };

    // Handle publish
    const handlePublish = () => {
        console.log("Blog Published!", { title, content, link, image, fields });
        navigate("/home"); // Redirect to home or wherever you want
    };

    return (
        <div className="max-w-4xl p-6 py-12 mx-auto bg-white rounded-lg">
            {/* Publish Button */}
            <button
                onClick={handlePublish}
                className="px-6 py-2 mb-4 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
            >
                Publish
            </button>

            <h1 className="mb-6 text-3xl font-semibold text-center">Create a New Blog Post</h1>

            {/* Title Field */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Blog Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter the title of your blog"
                />
            </div>

            {/* Content Field */}
            <div className="mb-4">
                <label htmlFor="content" className="block text-lg font-semibold text-gray-700">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                    rows="8"
                    placeholder="Write the content of your blog"
                />
            </div>

            {/* Drag and Drop Fields */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="fields" direction="vertical">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="mb-4"
                        >
                            <h2 className="mb-4 text-lg font-semibold text-gray-700">Dynamic Fields (Headings, Descriptions, Links)</h2>

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
                                                    <label className="block text-lg font-semibold text-gray-700">Heading {index + 1}</label>
                                                    <input
                                                        type="text"
                                                        value={field.value}
                                                        onChange={(e) => handleFieldChange(index, e.target.value)}
                                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                                        placeholder="Enter heading"
                                                    />
                                                </div>
                                            )}

                                            {field.type === "description" && (
                                                <div>
                                                    <label className="block text-lg font-semibold text-gray-700">Description {index + 1}</label>
                                                    <textarea
                                                        value={field.value}
                                                        onChange={(e) => handleFieldChange(index, e.target.value)}
                                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                                        placeholder="Enter description"
                                                        rows="4"
                                                    />
                                                </div>
                                            )}

                                            {field.type === "link" && (
                                                <div>
                                                    <label className="block text-lg font-semibold text-gray-700">Link {index + 1}</label>
                                                    <input
                                                        type="url"
                                                        value={field.value}
                                                        onChange={(e) => handleFieldChange(index, e.target.value)}
                                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                                        placeholder="Enter link"
                                                    />
                                                </div>
                                            )}

                                            {/* Remove Field Button */}
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

            {/* Add Buttons for each field type */}
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
            </div>
        </div>
    );
};

export default AddBlogs;
