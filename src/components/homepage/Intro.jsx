import React from "react";
import Wave from "./assets/wave.svg";
import TearDrop from "./teardrop/TearDrop";
import HomeButton from "./HomeButton";

import { RiLeafFill } from "react-icons/ri";
import { Fade } from "react-awesome-reveal";
import Footer from "./Footer";

const Intro = () => {
  return (
    <>
      <div className="relative">
        <div className="max-w-7xl mx-auto pt-32 text-neutral-50 px-6 relative items-center">
          <Fade triggerOnce={"true"}>
            <p className="text-5xl md:text-7xl mb-4 fancy flex justify-center md:justify-start">
              Planties
              <RiLeafFill className="flex text-4xl md:text-6xl text-green-600" />
            </p>
            <p className="text-xl md:text-3xl box-border my-8 text-green-600 fancy text-center md:text-start">
              Where plant lovers connect!
            </p>

            <div className="flex flex-col text-xl mt-14 text-center md:text-start">
              <p className="text-neutral-400 max-w-md m-auto md:ml-0">
                Our green community for plant lovers. Share tips, connect with
                others, and grow your collection!
              </p>
            </div>

            <div className="mt-20 mb-14 space-x-6 md:mt-32 text-center md:text-start">
              <HomeButton />
            </div>
          </Fade>
          <div className="hidden lg:block">
            <TearDrop />
          </div>
          
        </div>
      </div>
      <div className="w-full relative pt-14">
        <img src={Wave} className="text-green-700 hidden md:block object-cover" />
      </div>
      <Footer />
    </>
  );
};

export default Intro;
