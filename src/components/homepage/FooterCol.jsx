import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const FooterCol = ({ title, text, link }) => {

  const splitLinks = text.split("•");
  const splitRefs = link.split("•");
  const mergedArray = splitLinks.map((item, index) => [item, splitRefs[index]]);

  return (
    <div className="text-center mb-10 md:text-left md:mb-0">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {mergedArray.map((item, index) => {
        return (
          <p key={index} className="text-lg">
            <Router>
              <Link to={item[1]} target={item[1] === '/' ? '/' : "_blank"} className="hover:opacity-60 transition ease-in-out">
                {item[0]}
              </Link>
            </Router>
          </p>
        );
      })}
    </div>
  );
};

export default FooterCol;
