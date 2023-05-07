import React from "react";
import { useRef } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FaAngleRight, FaInfoCircle } from "react-icons/fa";
import Login from "./forms/Login";
import Signup from "./forms/Signup";

const HomeButton = ({}) => {
  const dialogSignup = useRef(null);
  const dialogLogin = useRef(null);

  const handleLinkClick = (event) => {
    event.preventDefault();
    dialogSignup.current.showModal();
  };

  const handleCloseClick = (event) => {
    event.preventDefault();
    dialogSignup.current.close();
    dialogLogin.current.close();
  };

  const changeToLogin = (event) => {
    event.preventDefault();
    dialogSignup.current.close();
    dialogLogin.current.showModal();
  };

  return (
    <>
      
      <Router>
        <Link
          className="transition ease-in-out duration-500 inline-flex items-center h-16 px-6 pt-1 bg-green-600 text-md hover:opacity-60 rounded-sm shadow-lg shadow-green-600/20"
          onClick={handleLinkClick}
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

      <dialog
        ref={dialogSignup}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 bg-neutral-900 rounded-md p-10 z-0"
      >
        <Signup
          handleCloseClick={handleCloseClick}
          changeToLogin={changeToLogin}
          dialogLogin={dialogLogin}
        />
      </dialog>

      <dialog
        ref={dialogLogin}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 bg-neutral-900 rounded-md p-10"
      >
        <Login handleCloseClick={handleCloseClick} />
      </dialog>
    </>
  );
};

export default HomeButton;
