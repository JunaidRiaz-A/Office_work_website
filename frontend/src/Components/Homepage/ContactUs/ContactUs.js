import "./ContactUs.css";

import React from 'react'
import blackB from "./../../../Assets/blackBackground.png";
import phoneContact from "./../../../Assets/contact.png";

function ContactUs() {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <img src={blackB} alt="background" className="backgroundB" />
          
            <div className="contact-layout1">
              <img
                src={phoneContact}
                alt="background"
                className="phoneContact"
              />
              <p className="call-info">Call For More Info</p>
              <p className="number-info">+123 8989 444</p>
              <div className="whiteC-contact"></div>
            </div>
            <div className="contact-layout2">
              <p className="contact-content">
                Let’s Request a Schedule For Free Consultation
              </p>
            </div>

            <button className="contact-button">Contact Us</button>
          </div>
        
      </div>
    </div>
  );
}

export default ContactUs
