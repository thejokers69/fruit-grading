// FRUIT-GRADING/src/components/Header.js
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img
        src={`${process.env.PUBLIC_URL}/mascir.jpeg`}
        alt="Mascir Logo"
        className="logo"
      />
      <nav className="nav">
        <ul>
          <li>
            {" "}
            <a href="#dashboard"> Dashboard </a>
          </li>
          <li>
            {" "}
            <a href="#charts"> Charts </a>
          </li>
          <li>
            {" "}
            <a href="#table"> Table </a>
          </li>
          <li>
            {" "}
            <a href="#map"> Map </a>
          </li>
          <li>
            {" "}
            <a href="#profile"> Profile </a>
          </li>
        </ul>{" "}
      </nav>{" "}
    </header>
  );
};

export default Header;
