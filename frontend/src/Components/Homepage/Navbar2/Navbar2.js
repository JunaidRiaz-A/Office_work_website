import "./Navbar2.css";

import React from "react";
import location from "./../../../Assets/location.png";
import mail from "./../../../Assets/mail.png";
import phone from "./../../../Assets/phone.png";
import time from "./../../../Assets/clock.png";

function Navbar2() {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-3 col-sm-3 col-3"></div>
      <div className="col-lg-9 col-md-9 col-sm-9 col-9">
        <div className="nav-line">
          <div className="nav-layout1">
            <img src={time} className="time_style_icon" alt="Time" />
            <p className="para_time_style">Mon - Fri: 09.00am - 10.00 pm</p>

            <img
              src={location}
              className="location_style_icon"
              alt="Location"
            />
            <p className="para_location_style">11A Commercial, D Block Valencia, Lahore, 54000</p>

            <img src={mail} className="mail_style_icon" alt="Mail" />
            <p className="para_mail_style">info@360synergytech.com</p>
          </div>

          <div className="nav-layout2">
            <img src={phone} className="phone_style_icon" alt="Phone" />
            <p className="para_phone_style">
              <span>Make a Call </span>
              <span className="call1-text">0324 9925737</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar2;