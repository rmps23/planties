import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import SelectFile from "./SelectFile";
import { useAuth } from "../../../context/AuthContext";
import { createPost, fetchSpecies } from "../../../lib/api";

const NewPost = ({ onPublished }) => {
  const { user, profile } = useAuth();
  const [species, setSpecies] = useState([]);
  const [speciesId, setSpeciesId] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchSpecies().then(setSpecies).catch(() => {});
  }, []);

  const handlePublish = async (event) => {
    event.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    try {
      await createPost({ userId: user.id, body: body.trim(), speciesId: speciesId || null, file });
      setBody("");
      setFile(null);
      setSpeciesId("");
      toast.success("Posted!");
      onPublished();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handlePublish} className="w-full bg-neutral-800/60 rounded-md mb-6 p-4 text-neutral-100 shadow-lg shadow-neutral-950">
      <div className="flex justify-between">
        <span className="text-sm bg-green-500 text-neutral-800 px-4 py-1 rounded-sm flex items-center">
          <FaUserAlt className="text-neutral-800 mr-2" aria-hidden="true" />
          <span className="pt-1">{profile?.username}</span>
        </span>
        <div className="flex gap-2">
          <SelectFile file={file} setFile={setFile} />
          <select
            aria-label="Plant species"
            value={speciesId}
            onChange={(e) => setSpeciesId(e.target.value)}
            className="bg-green-500 text-neutral-800 text-sm px-3 cursor-pointer"
          >
            <option value="">Any plant</option>
            {species.map((s) => (
              <option key={s.id} value={s.id}>{s.common_name}</option>
            ))}
          </select>
        </div>
      </div>

      <textarea
        aria-label="What's growing?"
        placeholder="What's growing?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={2000}
        className="block w-full h-24 bg-neutral-900 rounded-md focus:outline-none mt-4 border border-green-900 focus:border-green-500 transition ease-in-out duration-300 p-2"
        required
      />

      <div className="flex flex-row-reverse mt-4">
        <button
          type="submit"
          disabled={busy || !body.trim()}
          className="bg-green-500 text-neutral-800 px-2 pt-1 rounded-sm hover:opacity-80 disabled:opacity-50 transition ease-in-out duration-300"
        >
          {busy ? "Publishing…" : "Publish"}
        </button>
      </div>
    </form>
  );
};

export default NewPost;
