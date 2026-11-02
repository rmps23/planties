import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchSpecies } from "../../../lib/api";

const SpeciesList = () => {
  const [species, setSpecies] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchSpecies().then(setSpecies).catch((err) => toast.error(err.message));
  }, []);

  const q = query.trim().toLowerCase();
  const visible = (species ?? []).filter(
    (s) => s.common_name.toLowerCase().includes(q) || s.scientific_name.toLowerCase().includes(q)
  );

  return (
    <>
      <h1 className="fancy text-3xl text-green-500 mb-4">Plants</h1>
      <input
        type="search"
        aria-label="Search plants"
        placeholder="Search by name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-neutral-900 rounded-md p-2 mb-6 border border-green-900 focus:border-green-500 focus:outline-none"
      />
      {species === null && <p className="text-neutral-400">Loading…</p>}
      <ul className="grid sm:grid-cols-2 gap-4">
        {visible.map((s) => (
          <li key={s.id}>
            <Link to={`/plants/${s.slug}`} className="block h-full bg-neutral-800/60 rounded-md p-4 shadow-lg shadow-neutral-950 hover:bg-green-500/30 transition">
              <p className="text-lg">{s.common_name}</p>
              <p className="text-sm italic text-neutral-400">{s.scientific_name}</p>
              <p className="text-sm text-green-500 mt-2 capitalize">{s.difficulty}</p>
            </Link>
          </li>
        ))}
      </ul>
      {species && visible.length === 0 && <p className="text-neutral-400">No plants match.</p>}
    </>
  );
};

export default SpeciesList;
