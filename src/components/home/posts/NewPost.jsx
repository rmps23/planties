import React, { useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import SelectFile from "./SelectFile";

const NewPost = ({ data }) => {
  const text = useRef(null);
  const plantType = useRef(null);
  const [hasPhoto, setHasPhoto] = useState("");

  const handlePublish = () => {
    const textVal = text.current.value;
    const photoTF = hasPhoto ? true : false;
    const photoPath = hasPhoto ? "mem-img.png" : "";
    const plantTypeName = plantType.current.value;
    const dataToAdd = {
      user: "Test",
      text: textVal,
      hasPhoto: photoTF,
      photo: photoPath,
      plantType: plantTypeName,
    };

    
  };

  return (
    <div>
      <div className="w-full bg-neutral-800/60 rounded-md mb-6 p-4 text-neutral-100 shadow-lg shadow-neutral-950">
        {data.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <span className="text-sm bg-green-500 text-neutral-800 px-4 py-1 rounded-sm flex items-center">
              <FaUserAlt className="text-neutral-800 mr-2" />
              <span className="pt-1">{item.name}</span>
            </span>
            <div className="flex gap-2">
              <SelectFile setHasPhoto={setHasPhoto} />

              <select
                ref={plantType}
                className="bg-green-500 text-neutral-800 text-sm px-3 cursor-pointer"
              >
                <option value="Monstera">Monstera</option>
                <option value="Snake Plant">Snake Plant</option>
                <option value="Spider Plant">Spider Plant</option>
                <option value="Rubber Plant">Rubber Plant</option>
                <option value="Pothos">Pothos</option>
                <option value="ZZ Plant">ZZ Plant</option>
                <option value="Fiddle Leaf Fig">Fiddle Leaf Fig</option>
                <option value="Philodendron">Philodendron </option>
                <option value="Peace Lily">Peace Lily</option>
                <option value="English Ivy">English Ivy</option>
              </select>
            </div>
          </div>
        ))}

        <textarea
          ref={text}
          className="block w-full h-full bg-neutral-900 rounded-md focus:outline-none mt-4 border border-green-900 focus:border-green-500 transition ease-in-out duration-300 p-2"
          required
        ></textarea>

        <div className="flex flex-row-reverse mt-4">
          <div>
            <button
              className="bg-green-500 text-neutral-800 px-2 pt-1 rounded-sm hover:opacity-80 transition ease-in-out duration-300"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
