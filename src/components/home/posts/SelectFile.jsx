import { useEffect, useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";

const MAX_BYTES = 5 * 1024 * 1024;

const SelectFile = ({ file, setFile }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (event) => {
    const selected = event.target.files[0];
    if (!selected) return;
    if (selected.size > MAX_BYTES) {
      toast.error("Image must be under 5 MB.");
      event.target.value = "";
      return;
    }
    setFile(selected);
  };

  const clear = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      {file && (
        <div className="flex">
          <button
            type="button"
            onClick={clear}
            aria-label="Remove image"
            className="mx-2 text-xl bg-red-500 hover:opacity-70 transition ease-in-out duration-300 border border-red-500 px-1 rounded-sm"
          >
            <IoIosCloseCircle aria-hidden="true" />
          </button>
          <img className="h-8 rounded-sm border border-neutral-300 shadow-md shadow-green-500/20" src={preview} alt="Selected upload preview" />
        </div>
      )}
      {!file && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            aria-label="Add a photo"
            className="text-sm bg-green-500 text-neutral-800 px-4 pt-1 rounded-sm flex items-center cursor-pointer hover:opacity-80 transition ease-in-out duration-300"
          >
            <FaPhotoVideo aria-hidden="true" />
          </button>
          <input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            tabIndex={-1}
          />
        </>
      )}
    </>
  );
};

export default SelectFile;
