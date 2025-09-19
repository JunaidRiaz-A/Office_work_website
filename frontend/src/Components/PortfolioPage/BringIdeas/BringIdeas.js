import React from "react";
import "./../BringIdeas/BringIdeas.css";
import girl from "./../../../Assets/gril image.png";
import { IoIosCall } from "react-icons/io";

function BringIdeas({ scrollToAppointment }) {
  return (
    <div className="main_div_bringideas">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
              <img src={girl} className="girl_image_style" alt="girl" />
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6 col-12">
              <div className="d-flex justify-content-center">
                <button className="btn_call_style">
                  <IoIosCall />
                </button>
              </div>
              <p className="call_us_style">CALL US 24/7</p>
              <p className="phone_style">+1(203) 948 3308</p>
              <p className="bring_to_life_style">BRING IDEAS TO LIFE</p>
              <p className="talkabout_style">LET'S TALK ABOUT YOUR PROJECT</p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn_esti_style"
                  onClick={scrollToAppointment}
                >
                  Estimate your Project
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default BringIdeas;