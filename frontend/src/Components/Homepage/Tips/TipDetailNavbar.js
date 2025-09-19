import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function TipDetailNavbar() {
  return (
    <div className="main_div_aboutusnavbar">
      <p className="Heading_navbar">Tip Detail</p>
      <div className="d-flex justify-content-center">
        <>
          <p className="para_aboutus_navbar_white">Home </p>
          <p className="para_aboutus_navbar_white">
            {" "}
            <MdOutlineKeyboardArrowRight />{" "}
          </p>
          <p className="para_aboutus_navbar_orange">Tip Detail</p>
        </>
      </div>
    </div>
  );
}

export default TipDetailNavbar;