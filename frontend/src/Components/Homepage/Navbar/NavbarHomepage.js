import "./NavbarHomepage.css";

import React, { useState } from "react";

import logo from "./../../../Assets/synergy-logo-3 1.png";

function NavbarHomepage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main_div_navbar">
      <nav className="navbar navbar-expand-lg m-0 p-0">
        <a className="navbar-brand" href="/logo">
          <img src={logo} className="logo_style_360" alt="Logo" />
        </a>

        <button
          className={`navbar-toggler ${isOpen ? "active" : ""}`}
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarText"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav_link_navbar" href=" ">
                HOME <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav_link_navbar" href=" ">
                OTHER
              </a>
            </li>

            <li className="nav-item">
              <a className="nav_link_navbar" href=" ">
                SERVICES
              </a>
            </li>

            <li className="nav-item">
              <a className="nav_link_navbar" href=" ">
                BLOGS
              </a>
            </li>

            <li className="nav-item">
              <a className="nav_link_navbar" href=" ">
                NEWS
              </a>
            </li>

            <li className="nav-item">
              <a className="nav_link_navbar" href=" ">
                CONTACT
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            <button className="btn_request_a_quote">Request a quote</button>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default NavbarHomepage;
