import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Posts from "../posts/Posts";
import { fetchPosts, fetchSpeciesBySlug } from "../../../lib/api";

const SpeciesDetail = () => {
  const { slug } = useParams();
  const [species, setSpecies] = useState(undefined);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setSpecies(undefined);
    setPosts(null);
    fetchSpeciesBySlug(slug).then(setSpecies).catch((err) => toast.error(err.message));
  }, [slug]);

  const speciesId = species?.id;
  const load = useCallback(() => {
    if (speciesId) fetchPosts({ speciesId }).then(setPosts).catch((err) => toast.error(err.message));
  }, [speciesId]);
  useEffect(load, [load]);

  if (species === undefined) return <p className="text-neutral-400">Loading…</p>;
  if (species === null) return <p>Plant not found. <Link to="/plants" className="underline">Back to plants</Link></p>;

  return (
    <>
      <section className="bg-neutral-800/60 rounded-md p-4 mb-6 shadow-lg shadow-neutral-950">
        <h1 className="fancy text-3xl text-green-500">{species.common_name}</h1>
        <p className="italic text-neutral-400">{species.scientific_name}</p>
        <p className="mt-3">{species.description}</p>
        <dl className="grid grid-cols-3 gap-2 mt-4 text-sm">
          <div><dt className="text-green-500">Light</dt><dd>{species.light}</dd></div>
          <div><dt className="text-green-500">Water</dt><dd>{species.water}</dd></div>
          <div><dt className="text-green-500">Difficulty</dt><dd className="capitalize">{species.difficulty}</dd></div>
        </dl>
      </section>
      <h2 className="fancy text-2xl text-green-500 mb-3">Posts about {species.common_name}</h2>
      <Posts posts={posts} onChange={load} />
    </>
  );
};

export default SpeciesDetail;
