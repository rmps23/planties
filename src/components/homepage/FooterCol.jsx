import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const FooterCol = ({ title, links }) => {
  const splitLinks = links.split("/");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {splitLinks.map((link, index) => {
        return (
          <p key={index} className="text-lg">
            <Router>
              <Link className="hover:opacity-60 transition ease-in-out">
                {link}
              </Link>
            </Router>
          </p>
        );
      })}
    </div>
  );
};

export default FooterCol;
