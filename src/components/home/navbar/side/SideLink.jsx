import React from "react";

const SideLink = ({ title, icon }) => {
  return (
    <>
      <a className="w-full h-12 mb-2 flex items-center bg-neutral-800 rounded-md border-l-2 border-neutral-500 px-4 cursor-pointer hover:bg-neutral-700 ml-0 hover:translate-x-1 transition ease-in-out duration-300 hover:border-green-500">
        <div className="h-full flex items-center mr-4">
          <span className="text-2xl text-green-500">{icon}</span>
        </div>
        <div className="h-7 flex items-end">
          <p className="text-neutral-100 text-md">{title}</p>
        </div>
      </a>
    </>
  );
};

export default SideLink;
