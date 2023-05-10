import React from "react";

const Trending = ({ posts }) => {
  const plantTypeCounts = posts.reduce((acc, post) => {
    const plantType = post.plantType;
    if (plantType in acc) {
      acc[plantType]++;
    } else {
      acc[plantType] = 1;
    }
    return acc;
  }, {});

  const sortedPlantTypeCounts = Object.entries(plantTypeCounts)
    .map(([plantType, count]) => ({ plantType, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div>
        <p className="mb-3 text-2xl fancy text-green-500">Trendies</p>
      {sortedPlantTypeCounts.map((item, index) => (
        <p key={index} className="w-full bg-neutral-800/60 rounded-md mb-3 p-3 text-neutral-100 shadow-lg shadow-neutral-950 hover:bg-green-500/50 transition ease-in-out duration-300">
          {item.plantType}
        </p>
      ))}
    </div>
  );
};

export default Trending;