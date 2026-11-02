import { Link } from "react-router-dom";

const Trending = ({ posts }) => {
  const counts = new Map();
  posts.forEach(({ species }) => {
    if (!species) return;
    const entry = counts.get(species.slug) ?? { ...species, count: 0 };
    entry.count++;
    counts.set(species.slug, entry);
  });
  const sorted = [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 8);

  return (
    <div>
      <h2 className="mb-3 text-2xl fancy text-green-500">Trendies</h2>
      {sorted.length === 0 && <p className="text-neutral-400">Nothing trending yet.</p>}
      {sorted.map((item) => (
        <Link
          key={item.slug}
          to={`/plants/${item.slug}`}
          className="block w-full bg-neutral-800/60 rounded-md mb-3 p-3 text-neutral-100 shadow-lg shadow-neutral-950 hover:bg-green-500/50 transition ease-in-out duration-300"
        >
          {item.common_name}
          <span className="text-neutral-400 text-sm float-right">{item.count}</span>
        </Link>
      ))}
    </div>
  );
};

export default Trending;
