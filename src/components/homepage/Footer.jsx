import React from "react";
import FooterCol from "./FooterCol";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";

const Footer = () => {
  return (
    <div className="w-full bg-green-500 block text-neutral-900 pb-32 pt-16">
      <Fade triggerOnce={"true"}>
        <div className="max-w-7xl m-auto flex gap-40">
          <FooterCol
            title="PLANTIES"
            links="Terms of Service / Privacy Policy / "
          />

          <FooterCol title="SOCIALS" links="GitHub / LinkedIn / " />

          <div className="text-xl flex-1 text-right">
            Copyright © 2023. All rights are reserved
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Footer;
