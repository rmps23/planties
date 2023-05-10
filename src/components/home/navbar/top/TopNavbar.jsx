import React from "react";
import { RiLeafFill } from "react-icons/ri";
import { BsGear } from "react-icons/bs";

const TopNavbar = () => {
  return (
    <nav className="w-full h-16 bg-neutral-900 shadow-sm shadow-green-600/60 fixed z-10 bg-opacity-50 backdrop-filter backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full p-4">
        <div className="w-full flex justify-between items-center h-full">
          <div className="flex">
            <p className="fancy text-2xl text-green-500 flex">
              Planties <RiLeafFill className="text-2xl text-green-500" />
            </p>
          </div>
          <div className="flex flex-row-reverse">
            <BsGear className="text-neutral-50 bg-neutral-800 w-8 h-8 p-2 rounded-full cursor-pointer hover:opacity-90 transition ease-in-out duration-300" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
