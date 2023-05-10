const Signup = ({ handleCloseClick, changeToLogin }) => {
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
          <p className="text-neutral-50 text-lg mb-6 mt-1">Sign Up</p>
          <div className="my-4">
            <p className="text-md mb-1 text-neutral-50">
              Advance this step, this is a preview click:
              <a
                href="main"
                className="text-green-500 cursor-pointer"
              >
                {" "}
                Advance
              </a>
            </p>
          </div>
          <div className="my-4">
            <p className="text-sm mb-1 text-green-500">Name</p>
            <input
              type="text"
              className="w-full p-2 rounded-sFm bg-neutral-950 text-neutral-50 focus:outline-none border-neutral-950 focus:ring-1 focus:ring-green-500 transition ease-in-out duration-300 shadow-md focus:shadow-green-500/20 mb-1"
            />
          </div>
          <div className="my-4">
            <p className="text-sm mb-1 text-green-500">Email</p>
            <input
              type="email"
              className="w-full p-2 rounded-sm bg-neutral-950 text-neutral-50 focus:outline-none border-neutral-950 focus:ring-1 focus:ring-green-500 transition ease-in-out duration-300 shadow-md focus:shadow-green-500/20 mb-1"
            />
          </div>
          <div className="my-4">
            <p className="text-sm mb-1 text-green-500">Password</p>
            <input
              type="password"
              className="w-full p-2 rounded-sm bg-neutral-950 text-neutral-50 focus:outline-none border-neutral-950 focus:ring-1 focus:ring-green-500 transition ease-in-out duration-300 shadow-md focus:shadow-green-500/20 mb-1"
            />
          </div>
          <div className="my-4">
            <p className="text-sm mb-1 text-neutral-50">
              If you already have an account,
              <span
                onClick={changeToLogin}
                className="text-green-500 cursor-pointer"
              >
                {" "}
                Login
              </span>
            </p>
          </div>

          <div className="my-8">
            <button className="bg-green-500 w-full h-8 hover:opacity-70 transition ease-in-out duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
