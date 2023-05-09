import React from "react";
import TopNavbar from "./navbar/top/TopNavbar";
import SideNavbar from "./navbar/side/SideNavbar";

const Home = () => {
  return (
    <>
      <TopNavbar />
      <div className="max-w-7xl mx-auto p-4 py-8 flex">
        <SideNavbar />
        <div className="h-96 w-full mt-16 ml-52 m-40 rounded-md">
          <div className="w-full h-96 bg-neutral-800 rounded-md border-t-2 border-green-600 mb-10">
            <p>text</p>
          </div>
          <div className="w-full h-96 bg-neutral-800 rounded-md border-t-2 border-green-600 mb-10">
            <p>text</p>
          </div>
          <div className="w-full h-96 bg-neutral-800 rounded-md border-t-2 border-green-600 mb-10">
            <p>text</p>
          </div>
          <div className="w-full h-96 bg-neutral-800 rounded-md border-t-2 border-green-600 mb-10">
            <p>text</p>
          </div>
          <div className="w-full h-96 bg-neutral-800 rounded-md border-t-2 border-green-506000 mb-10">
            <p>text</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
