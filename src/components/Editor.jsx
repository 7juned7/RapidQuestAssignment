import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Editor = ({ title, content, onHandleChange, handleType, type, contentStyle, textStyle, handleStyle, selectedImage, setSelectedImage, handlePreview, handleColor }) => {
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const [titleDOM, setTitleDOM] = useState("");
    const [contentDOM, setContentDOM] = useState("");



    const imageChange = (event) => {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
        console.log(selectedImage)
    };

    useEffect(() => {
        // Whenever textStyle or contentStyle changes, you could re-render the content
        // or perform any other necessary effect
    }, [textStyle, contentStyle]);

    return (
        <div className="border p-5 max-w-[350px] bg-white sm:h-[100vh]">
            {/* Type Selector */}
            <div className="flex gap-2 justify-around mb-2 text-gray-600">
                <div className={`cursor-pointer ${type === "Title" ? "font-bold" : ""}`} onClick={handleType}>Title</div>
                <div className={`cursor-pointer ${type === "Content" ? "font-bold" : ""}`} onClick={handleType}>Content</div>
                <div className={`cursor-pointer ${type === "Image" ? "font-bold" : ""}`} onClick={handleType}>Image</div>
            </div>

            {/* Style Buttons */}
            <div className="flex gap-4 flex-wrap mb-2 text-gray-600">
                {["H1", "H2", "H3", "H4", "H5", "H6", "Bold", "Italic", "Underline", "Monospace"].map((style) => (
                    <button key={style} className="hover:text-black" onClick={handleStyle}>{style}</button>
                ))}
            </div>

            {/* Color Buttons */}
            <div className="flex gap-2 mb-2">
                {["red", "green", "yellow", "pink"].map((color) => (
                    <button key={color} onClick={() => handleColor(color)}>
                        <div className={`w-[20px] h-[20px] bg-${color}-500`}></div>
                    </button>
                ))}
            </div>

            {/* Editor */}
            {type === "Title" ? (
                <textarea
                    id="title"
                    name="title"
                    ref={titleRef}
                    value={title}
                    onChange={onHandleChange}
                    className={`w-full bg-transparent h-20 resize-none focus:outline-none p-2 ${textStyle}`}
                    placeholder="Edit Title"
                />
            ) : type === "Content" ? (
                <textarea
                    id="content"
                    ref={contentRef}
                    name="content"
                    value={content}
                    onChange={onHandleChange}
                    className={`w-full bg-transparent  text-black  h-20 resize-none focus:outline-none p-2 ${contentStyle}`}
                    placeholder="Edit Content"
                />
            ) : type === "Image" ? (
                <>
                    <input type="file" accept="image/*" name="image" onChange={imageChange} className="w-full border p-2" />
                    {selectedImage && (
                        <div>
                            <img src={selectedImage} alt="Selected" className="w-full h-auto" />
                        </div>
                    )}
                </>
            ) : null}

            <button onClick={handlePreview} className="bg-green-400 w-full rounded p-2">Preview</button>
        </div>
    );
};

export default Editor;
