import "./ServicesPartner.css";

import React from 'react'
import ServiceT from "./../../../Assets/ServicesPartner.png";
import YearE from "./../../../Assets/Year_Experience.png";
import dooted from "./../../../Assets/dotted.png"
import girl from "./../../../Assets/girl.webp"
import yearexp from "./../../../Assets/yearexp.webp"
import laptop from "./../../../Assets/laptop.webp"


function ServicesPartner() {
  return (
    <div className="SR-layout1">
      <div className="SR-layout2">
        <div className="SR-layout3">
          <img src={dooted} alt="Year Experience" className="dooted_style"/>
          <img src={girl} alt="Year Experience" className="girl_style"/>
          <img src={laptop} alt="Year Experience" className="laptop_style"/>
          <img src={yearexp} alt="Year Experience" className="yearexp_style"/>
        </div>
        <div className="SR-layout4">
          <div className="SR-layout41">
            <p className="sr-content1">:::GET TO KNOW US</p>
          </div>
          <div className="SR-layout42">
            <p className="sr-content2">
              <span>YOUR BEST DIGITAL SOLUTION </span>
              <span className="sr-content3">SERVICE </span>
              <span>PARTNER</span>
            </p>
          </div>
          <div className="SR-layout43">
            <p className="sr-content4">
              Web designing in a powerful way of just not an only professions,
              however, in a passion for our Company. We have to a tendency to
              believe the idea that smart looking of any website is the first
              impression on visitors.
            </p>
          </div>
          <div className="SR-layout44">
            <div className="sr-layout-row">
              <div className="sr-layoutW">
                <img src={ServiceT} alt="tick" className="srt-content" />
                <p className="sr-contentW">The business applications</p>
              </div>
              <div className="sr-layoutW">
                <img src={ServiceT} alt="tick" className="srt-content" />
                <p className="sr-contentW"> The business applications</p>
              </div>
            </div>

            <div className="sr-layout-row">
              <div className="sr-layoutW">
                <img src={ServiceT} alt="tick" className="srt-content" />
                <p className="sr-contentW">Revolutionary catalysts chang</p>
              </div>
              <div className="sr-layoutW">
                <img src={ServiceT} alt="tick" className="srt-content" />
                <p className="sr-contentW">Revolutionary catalysts chang</p>
              </div>
            </div>
            <div className="sr-layout-row">
              <div className="sr-layoutW">
                <img src={ServiceT} alt="tick" className="srt-content" />
                <p className="sr-contentW"> Catalysts for chang seamlessly</p>
              </div>
              <div className="sr-layoutW">
                <img src={ServiceT} alt="tick" className="srt-content" />
                <p className="sr-contentW"> Catalysts for chang seamlessly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPartner
