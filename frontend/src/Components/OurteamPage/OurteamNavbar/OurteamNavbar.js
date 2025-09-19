import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import "./../../AboutusPage/AboutusNavbar/AboutusNavbar.css";

function OurteamNavbar() {
  return (
    <div className="main_div_aboutusnavbar">
      <p className="Heading_navbar">OUR TEAM</p>
      <div className="d-flex justify-content-center align-items-center gap-1">
        <Link to="/" className="para_aboutus_navbar_white text-decoration-none">
          Home
        </Link>
        <span className="para_aboutus_navbar_white">
          <MdOutlineKeyboardArrowRight />
        </span>
        <span className="para_aboutus_navbar_orange">Team</span>
      </div>
    </div>
  );
}

export default OurteamNavbar;
