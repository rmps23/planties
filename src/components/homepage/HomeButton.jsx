import { useRef } from "react";
import { FaAngleRight, FaGithub } from "react-icons/fa";
import Login from "./forms/Login";
import Signup from "./forms/Signup";

const dialogClass =
  "md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-neutral-900 rounded-md p-10 md:w-max w-full";
const buttonClass =
  "transition ease-in-out duration-500 inline-flex items-center h-16 px-2 md:px-6 pt-1 text-md hover:opacity-60 rounded-sm shadow-lg shadow-green-600/20";

const HomeButton = () => {
  const dialogSignup = useRef(null);
  const dialogLogin = useRef(null);

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
      <button type="button" className={`${buttonClass} bg-green-600`} onClick={() => dialogSignup.current.showModal()}>
        <span className="ml-3 font-bold">JOIN US</span>
        <span className="ml-4 mb-1" aria-hidden="true"><FaAngleRight /></span>
      </button>
      <button type="button" className={`${buttonClass} bg-neutral-800`} onClick={() => dialogLogin.current.showModal()}>
        <span className="ml-3 font-bold">LOG IN</span>
        <span className="ml-4 mb-1" aria-hidden="true"><FaAngleRight /></span>
      </button>
      <a
        href="https://github.com/rmps23/planties"
        target="_blank"
        rel="noreferrer"
        className={`${buttonClass} bg-neutral-800`}
      >
        <span className="ml-3 font-bold">ABOUT</span>
        <span className="ml-4 mb-1" aria-hidden="true"><FaGithub /></span>
      </a>

      <dialog ref={dialogSignup} aria-label="Sign up" className={dialogClass}>
        <Signup handleCloseClick={handleCloseClick} changeToLogin={changeToLogin} />
      </dialog>

      <dialog ref={dialogLogin} aria-label="Log in" className={dialogClass}>
        <Login handleCloseClick={handleCloseClick} />
      </dialog>
    </>
  );
};

export default HomeButton;
