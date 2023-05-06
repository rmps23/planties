import React from "react";
import Wave from "./wave.svg";
import TearDrop from "./TearDrop";
import HomeButton from "./HomeButton";

import { RiLeafFill } from "react-icons/ri";
import { Fade } from "react-awesome-reveal";
import Footer from "./Footer";

const Intro = () => {
  return (
    <>
      <div className="relative">
        <div className="max-w-7xl mx-auto pt-32 text-neutral-50 px-6 relative">
          <Fade triggerOnce={"true"}>
            <p className="text-7xl mb-4 fancy flex">
              Planties
              <RiLeafFill className="flex text-6xl text-green-600" />
            </p>
            <p className="text-3xl box-border my-8 text-green-600 fancy">
              Where plant lovers connect!
            </p>

            <div className="flex flex-col text-xl mt-14">
              <p className="text-neutral-400 max-w-md">
                Our green community for plant lovers. Share tips, connect with
                others, and grow your collection!
              </p>
            </div>

            <div className="mt-32 space-x-6">
              <HomeButton />
            </div>
          </Fade>
          {/* ANIMATION */}
          <TearDrop />
        </div>
      </div>
      <div className="w-full relative pt-14">
        <img src={Wave} className="text-green-700" />
      </div>
      <Footer />
    </>
  );
};

export default Intro;
