import React from "react";
import FooterCol from "./FooterCol";
import { Fade } from "react-awesome-reveal";

const Footer = () => {
  return (
    <div className="w-full bg-green-500 block text-neutral-900 pb-32 pt-16 border-0">
      <Fade triggerOnce={"true"}>
        <div className="max-w-7xl m-auto md:flex gap-10 md:gap-40 px-4">
          <FooterCol
            title="PLANTIES"
            text="Terms of Service•Privacy Policy"
            link="/•/"
          />
          <FooterCol title="SOCIALS" text="GitHub•LinkedIn" link="https://github.com/rmps23•https://www.linkedin.com/in/ruben-sousa-1a6bb1177/"/>

          <div className="text-xl w-full md:text-right text-center">
            Plantright © 2023. All plants are reserved
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Footer;
