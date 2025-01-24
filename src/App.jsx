import React, { useState } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import RenderLayout from './components/RenderLayout';

function App() {
  const [title, setTitle] = useState(""); // State for title content
  const [content, setContent] = useState(""); // State for content
  const [type, setType] = useState("Title"); // Determines active section: Title, Content, or Image
  const [textStyle, setTextStyle] = useState(""); // Style for title
  const [contentStyle, setContentStyle] = useState(""); // Style for content
  const [selectedImage, setSelectedImage] = useState("");

  const [download, setDownload] = useState(false)
  const handleType = (e) => {
    setType(e.target.innerHTML);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (type === "Title") {
      setTitle(newValue);

    }
    if (type === "Content") {
      setContent(newValue);

    }
  };

  // Handle styling for Title and Content

  const handleStyle = (e) => {
    const style = e.target.innerHTML;

    // Helper function to apply styles dynamically
    const applyStyle = (prevStyle, newStyle, removeGroup = null) => {
      let styles = prevStyle.split(" ");

      // Filter out the specific group of classes (e.g., text sizes)
      if (removeGroup) {
        styles = styles.filter(
          (style) => !style.startsWith(removeGroup) || style.endsWith("-500") // Keep color classes intact
        );
      }

      // Add the new style if it's not already included
      if (!styles.includes(newStyle)) {
        styles.push(newStyle);
      }

      return styles.join(" ").trim();
    };

    const styleMapping = {
      H1: "text-[3rem]",
      H2: "text-[2.25rem]",
      H3: "text-[1.875rem]",
      H4: "text-[1.5rem]",
      H5: "text-[1.25rem]",
      H6: "text-[1.125rem]",
      Bold: "font-bold",
      Italic: "italic",
      Underline: "underline",
      Monospace: "font-mono",
    };

    if (type === "Title") {
      setTextStyle((prev) =>
        applyStyle(prev, styleMapping[style], style.startsWith("H") ? "text-" : null)
      );
    }

    if (type === "Content") {
      setContentStyle((prev) =>
        applyStyle(prev, styleMapping[style], style.startsWith("H") ? "text-" : null)
      );
    }
  };


  const handleColor = (color) => {
    const colorClass = `text-${color}-500`;

    if (type === "Title") {
      setTextStyle((prev) => {
        // Remove existing color class if any
        const updatedStyle = prev.split(' ').filter(className => !className.endsWith('-500')).join(' ');

        // Add the new color class
        return `${updatedStyle} ${colorClass}`.trim();
      });
    }

    if (type === "Content") {
      setContentStyle((prev) => {
        // Remove existing color class if any
        const updatedStyle = prev.split(' ').filter(className => !className.endsWith('-500')).join(' ');

        // Add the new color class
        return `${updatedStyle} ${colorClass}`.trim();
      });
    }
    console.log(textStyle)
  };


  const handlePreview = () => {
    setDownload((prev) => !prev)
    console.log(download)
  }


  return (
    <div className="App flex flex-col sm:flex-row items-center sm:items-stretch">
      {
        download ? (
          <>
            <RenderLayout
              download={download}
              handlePreview={handlePreview} />
          </>
        ) : (<>
          <Editor
            title={title}
            content={content}
            onHandleChange={handleChange}
            handleType={handleType}
            type={type}
            handleStyle={handleStyle}
            textStyle={textStyle}
            contentStyle={contentStyle}
            handlePreview={handlePreview}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleColor={handleColor}
          />
          <Preview
            title={title}
            content={content}
            textStyle={textStyle}
            contentStyle={contentStyle}
            selectedImage={selectedImage}
            download={download}

          />
        </>)
      }


    </div>
  );
}

export default App;
