import "./DigitalSolution.css";

import React from 'react'
import Tick from "./../../../Assets/Tick Symbol.png";
import YearE from "./../../../Assets/Year_Experience.png";

function DigitalSolution() {
  return (
    <div row>
      <div className="main-layout">
        <div className="col-lg-5 col-md-12 col-sm-12 col-12">
          <img src={YearE} alt="Year Experience" className="year-content" />

          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="layout-E">
              <p className="get-know">:::get to know us</p>

              <div className="digital-layout">
                <p className="digital-content">
                  <span>Your Best </span>
                  <span>digital </span>
                  <span>Solution </span>
                  <span className="t1-text">Service </span>
                  <span>Partner</span>
                </p>
              </div>

              <div className="web-layout">
                <p className="web-content">
                  Web designing in a powerful way of just not an only
                  professions, however, in a passion for our Company. We have to
                  a tendency to believe the idea that smart looking of any
                  website is the first impression on visitors.
                </p>
              </div>

              <div className="web-layout1">
                <div className="web-layout-row">
                  <div className="web-layoutW">
                    <img src={Tick} alt="tick" className="tick-content" />
                    <p className="web-contentW">The business applications</p>
                  </div>
                  <div className="web-layoutW">
                    <img src={Tick} alt="tick" className="tick-content" />
                    <p className="web-contentW"> The business applications</p>
                  </div>
                </div>

                <div className="web-layout-row">
                  <div className="web-layoutW">
                    <img src={Tick} alt="tick" className="tick-content" />
                    <p className="web-contentW">Revolutionary catalysts chang</p>
                  </div>
                  <div className="web-layoutW">
                    <img src={Tick} alt="tick" className="tick-content" />
                    <p className="web-contentW">Revolutionary catalysts chang</p>
                  </div>
                </div>
                <div className="web-layout-row">
                  <div className="web-layoutW">
                    <img src={Tick} alt="tick" className="tick-content" />
                    <p className="web-contentW"> Catalysts for chang seamlessly</p>
                  </div>
                  <div className="web-layoutW">
                    <img src={Tick} alt="tick" className="tick-content" />
                    <p className="web-contentW"> Catalysts for chang seamlessly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalSolution
