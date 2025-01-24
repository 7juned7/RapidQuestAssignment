import React, { useEffect, useRef } from "react";
import axios from "axios";
import download from "../assets/images/arrow-bottom-icon.svg"
const Preview = ({ title, textStyle, content, contentStyle, selectedImage }) => {

    console.log(title)
    // Function to generate the HTML with embedded state
    const generateHTML = () => {
        return `
          <div id="layout" style="background-color: #64748b; padding: 20px;">
                <div className="flex justify-center p-5 mb-5">
                    <div className="${textStyle}">${title}</div>
                </div>
                <div className="flex align-center justify-center m-auto mb-5 p-5 w-[80%]">
                    <div className="${contentStyle}">${content}</div>
                </div>
                <div className="w-full flex justify-center py-5 min-h-[200px] max-h-[350px]">
                    ${selectedImage ? `<img src="${selectedImage}" alt="Selected" className="object-contain" />` : '<p>No image selected</p>'}
                </div>
            </div>
        `;
    };

    const handleSendToBackend = async () => {
        try {
            // Generate the HTML string with embedded state
            const htmlContent = generateHTML();

            // Sending the request to the backend
            const response = await axios.post("/api/save-layout", { html: htmlContent });

            // Log success response
            console.log("Success:", response.data);
            alert("layout sended to backend to see the preview click on Preview")
        } catch (error) {
            // Log error details
            alert("error in sending layout to backend")

            console.error("Error sending layout to backend:", error.response?.data || error.message);
        }
    };


    return (
        <div


            className="w-full p-10 justify-center bg-slate-300  pb-0"
        >

            {/* Dynamically render the title */}
            <div className="flex justify-center p-5 mb-5 text-black">
                <div className={textStyle}>{!title ? ("Title") : (<>{title}</>)}</div>
            </div>

            {/* Dynamically render the content */}
            <div className="flex align-center justify-center m-auto mb-5 p-5 w-[80%] text-black">
                <div className={contentStyle}>{!content ? ("Content") : (<>{content}</>)}</div>
            </div>

            {/* Display image (conditionally if valid) */}
            <div className="w-full flex justify-center py-5 min-h-[200px] max-h-[350px] text-black">
                {selectedImage ? (
                    <img
                        className="object-contain"
                        src={selectedImage}
                        alt="Selected"
                    />
                ) : (
                    <p>No image selected</p>
                )}
            </div>

            <button onClick={handleSendToBackend} className="bg-green-400 p-2 w-12 rounded-full sm:absolute bottom-5 right-5">
                <img src={download} alt="download.icon" />
            </button>
        </div>
    );
};

export default Preview;
