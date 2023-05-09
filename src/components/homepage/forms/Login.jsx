import React from "react";
import { useState, useEffect, useRef } from "react";

const Login = ({ handleCloseClick }) => {
  const [data, setData] = useState([]);
  const [emailSt, setEmail] = useState();
  const [pwSt, setpwSt] = useState();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPw, setIsValidPw] = useState(true);


  const email = useRef(null);
  const pw = useRef(null);

  function handleLogin(event) {
    event.preventDefault();
    const fetchData = async () => {
      const response = await fetch("data/user.json");
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }

  function handleError(event) {
    const value = event.target.value;

    if (value) {
      let classStr = event.target.className;
      classStr = classStr.replace("border border-red-500 focus:shadow-red-500/20", "");
      event.target.className = classStr;
      if (event.target.name === "email") {
        setIsValidEmail(true)
      }else if (event.target.name === "pw") {
        setIsValidPw(true)
      }
      
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      const emailValue = email.current.value;
      const pwValue = pw.current.value;
      
      if (emailValue === "") {
        email.current.className = email.current.className + " border border-red-500 focus:shadow-red-500/20";
        setIsValidEmail(false)
      }

      if (pwValue === "") {
        pw.current.className = pw.current.className + " border border-red-500 focus:shadow-red-500/20";
        setIsValidPw(false)
      }

      window.location.href = 'main';
    }
  }, [data]);

  return (
    <>
      <button
        onClick={handleCloseClick}
        className="absolute right-10 top-10 text-neutral-50 text-sm hover:bg-neutral-800 transition ease-in-out duration-300 w-10 h-10 align-middle rounded-full"
      >
        &#10006;
      </button>
      <div className="w-full md:w-96 text-left">
        <form>
          <p className="text-neutral-50 w-96 text-lg mb-6 mt-1">Login</p>
          <div className="my-4">
            <p className="text-sm mb-1 text-green-500">Email</p>
            <input
              ref={email}
              name="email"
              value={emailSt}
              onChange={(event) => handleError(event)}
              type="email"
              className="w-full p-2 rounded-sm bg-neutral-950 text-neutral-50 focus:outline-none border-neutral-950 focus:ring-1 focus:ring-green-500 transition ease-in-out duration-300 shadow-md focus:shadow-green-500/20 mb-1"
            />
            {!isValidEmail && <p className="text-red-500">Invalid email</p>}
          </div>
          <div className="my-4">
            <p className="text-sm mb-1 text-green-500">Password</p>
            <input
              ref={pw}
              name="pw"
              value={pwSt}
              onChange={(event) => handleError(event)}
              type="password"
              className="w-full p-2 rounded-sm bg-neutral-950 text-neutral-50 focus:outline-none border-neutral-950 focus:ring-1 focus:ring-green-500 transition ease-in-out duration-300 shadow-md focus:shadow-green-500/20 mb-1"
            />
            {!isValidPw && <p className="text-red-500">Invalid password</p>}
          </div>
          <div className="my-4 font-thin">
            <p className="text-sm text-neutral-50">
              <span className="w-1/4 inline-block">Email:</span>{" "}
              test@planties.com
            </p>
            <p className="text-sm text-neutral-50">
              <span className="w-1/4 inline-block">Password:</span> test
            </p>
          </div>
          <div className="my-6">
            <button
              className="bg-green-500 w-full h-8 hover:opacity-70 transition ease-in-out duration-300 rounded-sm"
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
