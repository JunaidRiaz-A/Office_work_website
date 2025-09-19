import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./../AboutusNavbar/AboutusNavbar.css";

function AboutusNavbar() {
  return (
    <div className="main_div_aboutusnavbar">
      <p className="Heading_navbar">ABOUT US</p>
      <div className="d-flex justify-content-center breadcrumb-container">
        <Link to="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-separator">
          <MdOutlineKeyboardArrowRight />
        </span>
        <span className="breadcrumb-current">About</span>
      </div>
    </div>
  );
}

export default AboutusNavbar;
