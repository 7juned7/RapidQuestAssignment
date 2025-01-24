import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RenderLayout = ({ download, handlePreview }) => {
    const [layout, setLayout] = useState(null);
    const [error, setError] = useState(null);

    // Fetch layout data on mount
    useEffect(() => {
        const fetchLayout = async () => {
            try {
                const response = await axios.get("https://rapidquestassignment.onrender.com/getLayout");
                setLayout(response.data); // Set the fetched layout data

            } catch (err) {
                setError("Error fetching layout: " + err.message); // Handle error and display message
            }
        };

        fetchLayout(); // Call fetchLayout on component mount
    }, []); // Empty array ensures this runs only once when the component mounts

    // If an error occurs during data fetching
    if (error) {
        return (
            <div className="text-red-500 p-5">
                {error} {/* Display the error message */}
            </div>
        );
    }

    // Return loading state until layout is fetched
    if (!layout) {
        return (
            <div className="text-gray-500 p-5">
                Loading layout...
            </div>
        );
    }

    return (
        <>
            {/* Button to go back to previous view */}
            <div onClick={handlePreview} className="absolute bg-green-400 py-2 px-5 right-5 top-2 cursor-pointer">
                Back
            </div>

            {/* Render the layout content when download is true */}
            {download ? (
                <div className="w-full p-10 justify-center bg-slate-300 min-h-[100vh] pb-0">


                    <div className='text-black text-center'>
                        to see current changes please download first
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: layout.html }} /> {/* Render the fetched HTML */}
                </div>
            ) : (
                <div>Nothing to show</div> // Message when download is false
            )}
        </>
    );
};

export default RenderLayout;
