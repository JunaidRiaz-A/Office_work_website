import "./CompanyWork.css";

import React from 'react'
import backgroundC from "./../../../Assets/background1.png";
import icon1 from "./../../../Assets/icon1.png";
import icon2 from "./../../../Assets/icon2.png";
import icon3 from "./../../../Assets/icon3.png";
import icon4 from "./../../../Assets/icon4.png";
import icon5 from "./../../../Assets/icon5.png";
import icon6 from "./../../../Assets/icon6.png";

function CompanyWork() {
  return (
    <div row>
      <img src={backgroundC} alt="Background" className="background-imageC" />
      <div className="col-lg-2 col-md-2 col-sm-12 col-12"></div>
      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
        <div className="layout-company">
          <p className="content-c1">:::Services we’re offering</p>
          <div className="layout-c1">
            <p className="c1-content">
              <span>we’re Dedicated to Serve you</span>

              <span className="c1-text">All Time </span>
            </p>
          </div>
          <div className="layout-wh1">
            <img src={icon1} alt="logo" className="icon-orange" />
            <p className="icon-text1">
              <span>Staff</span>
              <br />
              <span>Augmentation</span>
            </p>
          </div>
          <div className="layout-wh2">
            <img src={icon2} alt="logo" className="icon-orange" />
            <p className="icon-text1">Web & Mobile App Development</p>
          </div>
          <div className="layout-wh3">
            <img src={icon3} alt="logo" className="icon-orange" />
            <p className="icon-text1">AMAZON RDS,S3 DYNAMODB </p>
          </div>
          <div className="layout-wh4">
            <img src={icon4} alt="logo" className="icon-orange" />
            <p className="icon-text1">ML AI & Cloud Computing</p>
          </div>
          <div className="layout-wh5">
            <img src={icon5} alt="logo" className="icon-orange" />
            <p className="icon-text1">Support & Maintenance</p>
          </div>
          <div className="layout-wh6">
            <img src={icon6} alt="logo" className="icon-orange" />
            <p className="icon-text1">UI/UX Design</p>
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-md-2 col-sm-12 col-12"></div>
    </div>
  );
}

export default CompanyWork
