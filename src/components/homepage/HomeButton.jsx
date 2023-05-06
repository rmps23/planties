import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FaAngleRight, FaInfoCircle } from "react-icons/fa";

const HomeButton = ({}) => {
  return (
    <Router>
      <Link
        to="/signup"
        className="transition ease-in-out duration-500 inline-flex items-center h-16 px-6 pt-1 bg-green-600 text-md hover:opacity-60 rounded-sm shadow-lg shadow-green-600/20"
      >
        <span className="ml-3 font-bold">JOIN US</span>
        <span className="ml-4 mb-1">
          <FaAngleRight />
        </span>
      </Link>
      <Link
        to="/about"
        className="transition ease-in-out duration-500 inline-flex items-center h-16 px-6 pt-1 bg-neutral-800 text-md hover:opacity-60 rounded-sm shadow-lg shadow-green-600/10"
      >
        <span className="ml-3 font-bold">ABOUT</span>
        <span className="ml-4 mb-1">
          <FaInfoCircle />
        </span>
      </Link>
    </Router>
  );
};

export default HomeButton;
