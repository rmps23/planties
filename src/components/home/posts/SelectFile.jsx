import React, { useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const SelectFile = ({setHasPhoto}) => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFilePreview, setSelectedFilePreview] = useState("");

  const handleLabelClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile.name);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setSelectedFilePreview(reader.result);
    };
    setHasPhoto(selectedFile.name)
    // do something with the selected file
  };

  const handleClearButtonClick = () => {
    setSelectedFileName("");
    setSelectedFilePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setHasPhoto(null);
  };


  return (
    <>
      {selectedFilePreview && (
        <div className="flex">
          {" "}
          <button onClick={handleClearButtonClick} className="mx-2 text-xl bg-red-500 hover:opacity-70 transition ease-in-out duration-300 border border-red-500 px-1 rounded-sm">
            <span><IoIosCloseCircle/></span>
          </button>{" "}
          <img
            className="h-8 rounded-sm border border-neutral-300 shadow-md shadow-green-500/20"
            src={selectedFilePreview}
            alt={selectedFileName}
          />
        </div>
      )}
      {!selectedFileName && (
        <span
          onClick={handleLabelClick}
          className="text-sm bg-green-500 text-neutral-800 px-4 pt-1 rounded-sm flex items-center cursor-pointer hover:opacity-80 transition ease-in-out duration-300"
        >
          {/* {selectedFileName && (
                    <p className="text-green-600">{selectedFileName}</p>
                  )} */}
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-neautral-600 hover:underline flex"
          >
            <FaPhotoVideo />
          </label>
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept=".jpeg, .jpg, .png"
          />
        </span>
      )}
    </>
  );
};

export default SelectFile;
