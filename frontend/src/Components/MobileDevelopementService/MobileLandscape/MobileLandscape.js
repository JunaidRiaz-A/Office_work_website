import React from "react";
import mobile from "./../../../Assets/mobile.png";
import agility from "./../../../Assets/agility.png";
import beoynd from "./../../../Assets/beyond.png";
import uiux from "./../../../Assets/ui ux.png";
import webapp from "./../../../Assets/web app.png";
import saaswebapp from "./../../../Assets/saas web app.png";
import frontend from "./../../../Assets/frontend.png";
import backend from "./../../../Assets/backend.png";
import customapp from "./../../../Assets/custom web app.png";
import moderntech from "./../../../Assets/modern stak.png";
import usablity from "./../../../Assets/usability.png";
function MobileLandscape() {
  return (
    <div className="main_div_WebPageExperience">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="heading_webexp">
            We Craft Powerful Web App Experiences
          </p>
          <div className="d-flex justify-content-center">
            <div className="hr_line_blue_web" />
          </div>
          <div className="row m-0 p-0">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={mobile} />
                <p className="Scalability_heading">Android & iOS Savvy</p>
                <p className="Scalability_para">
                  Our developers conquer complexities of both Android & iOS.
                  They ensure your app shines on any device, budget-friendly or
                  high-end.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={agility} />
                <p className="Scalability_heading">Cross-Platform Agility</p>
                <p className="Scalability_para">
                  Build mobile apps faster with our cross- platform approach. We
                  deliver a seamless user experience while maximizing native
                  features and sharing code across devices.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={beoynd} />
                <p className="Scalability_heading">Build Beyond Platforms</p>
                <p className="Scalability_para">
                  Build mobile apps faster with our cross- platform approach. We
                  deliver a seamless user experience while maximizing native
                  features and sharing code across devices.
                </p>
              </div>
            </div>
          
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default MobileLandscape;
