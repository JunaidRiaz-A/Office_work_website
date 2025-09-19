import "./EstimateProject.css";
import EstimateBoy from "./../../../Assets/EstimateBoy.png";
import EstimateP from "./../../../Assets/EstimateP.png";
import estimatePhone from "./../../../Assets/estimatePhone.png";
import React from "react";

function EstimateProject({ scrollToAppointment }) {
  return (
    <div className="Es-layout1">
      <img src={EstimateP} alt="background" className="Es-layout" loading="lazy" />
      <div className="Es-container">
        <img src={EstimateBoy} alt="background" className="Es-layout2" loading="lazy" />
        <div className="Es-layout3">
          <img src={estimatePhone} alt="Phone" className="Es-layout4 estimate-image" loading="lazy" />
          <h3 className="Es-content2">+1(203) 948 3308</h3>
          <p className="Es-content3">
            Have any idea or project for in your mind? Call us or schedule an
            appointment. Our representative will reply to you shortly.
          </p>
          <button
            type="button"
            className="Es-button"
            onClick={scrollToAppointment}
          >
            Estimate your Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstimateProject;